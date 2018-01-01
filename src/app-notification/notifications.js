import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'
import isAfter from 'date-fns/is_after'
import isSameDay from 'date-fns/is_same_day'

const QUIZ_COMPLETED_TIME = 'QUIZ_COMPLETED_TIME'
const NOTIFICATIONS_ENABLED = 'NOTIFICATIONS_ENABLED'

export function setNotificationTimestamp () {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
    Notifications.cancelAllScheduledNotificationsAsync()
    if (status === 'granted') {
      AsyncStorage.getItem(QUIZ_COMPLETED_TIME)
        .then(JSON.parse)
        .then(lastQuizCompleteDate => {
          isNotificationEnabled().then(enabled => {
            if (enabled) {
              Notifications.scheduleLocalNotificationAsync(
                localNotification(),
                schedulingOptions(lastQuizCompleteDate)
              )
            }
          })
        })
    }
  })
}

export function isNotificationEnabled () {
  return AsyncStorage.getItem(NOTIFICATIONS_ENABLED).then(JSON.parse)
}

export function enableNotifications (value) {
  return AsyncStorage.setItem(
    NOTIFICATIONS_ENABLED,
    JSON.stringify(value),
    () => setNotificationTimestamp()
  )
}

export function updateNotificationTimestamp () {
  AsyncStorage.setItem(
    QUIZ_COMPLETED_TIME,
    JSON.stringify(new Date()),
    () => setNotificationTimestamp()
  )
}

function localNotification () {
  return {
    title: `UdaciCards`,
    body: `👋 don't forget to complete your quiz today!`,
    ios: {sound: true},
    android: {sound: true, priority: 'high', sticky: false, vibrate: true}
  }
}

function schedulingOptions (lastQuizCompleteDate) {
  const today10am = (() => {
    const date = new Date()
    date.setHours(10)
    date.setMinutes(0)
    return date
  })()
  const tomorrow10am = (() => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(10)
    date.setMinutes(0)
    return date
  })()
  const now = new Date()
  const time =
    isAfter(now, today10am) || isSameDay(now, lastQuizCompleteDate)
      ? tomorrow10am
      : today10am
  return {time, repeat: 'day'}
}

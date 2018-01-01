import React from 'react'
import {View} from 'react-native'
import {Provider} from 'react-redux'
import AppNavigation from './components/navigation/Main'
import AppStatusBar from './components/StatusBar'
import store from './redux/store'
import {setNotificationTimestamp} from './app-notification/notifications'

class App extends React.Component {
  componentDidMount () {
    setNotificationTimestamp()
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar />
          <AppNavigation />
        </View>
      </Provider>
    )
  }
}

export default App

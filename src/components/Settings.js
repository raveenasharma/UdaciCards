import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Switch, View, Text} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import loadSampleDecks from '../redux/actions/loadSampleDecks'
import {PrimaryButton} from '../components/Buttons'
import {color} from '../style/colors'
import { isNotificationEnabled, enableNotifications } from '../app-notification/notifications'

class NewCard extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {notifications: true}

  componentDidMount () {
    isNotificationEnabled().then(enabled => {
      this.setState({notifications: enabled})
    })
  }

  loadSampleDecks = () => {
    this.props.loadSampleDecks()
    this.props.navigation.navigate('DeckList')
  }

  handleNotifications = enabled => {
    this.setState(
      state => ({notifications: enabled})
    )
    enableNotifications(enabled)
  }

  render () {
    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: color.blue}}
        contentContainerStyle={styles.container}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        
        <PrimaryButton
          onPress={this.loadSampleDecks}
          title='Load Sample Decks'
          
        />
        <View style={styles.notificationContainer}>
          <Text style={{color: color.lightGrey}}>Allow Notifications</Text>
          <Switch
            value={this.state.notifications}
            onValueChange={enabled => this.handleNotifications(enabled)}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(null, {loadSampleDecks})(
  NewCard
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

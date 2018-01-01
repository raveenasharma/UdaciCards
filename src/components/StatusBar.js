import React from 'react'
import {StatusBar, View} from 'react-native'
import {Constants} from 'expo'
import {color} from '../style/colors'

class AppStatusBar extends React.Component {
  render () {
    return (
      <View
        style={{
          backgroundColor: color.darkBlue,
          height: Constants.statusBarHeight
        }}
      >
        <StatusBar barStyle='light-content' />
      </View>
    )
  }
}

export default AppStatusBar

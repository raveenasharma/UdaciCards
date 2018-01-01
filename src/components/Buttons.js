import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {color} from '../style/colors'

export class PrimaryButton extends React.Component {
  static propTypes = buttonPropTypes
  render () {
    const {icon, title, onPress, ...props} = this.props
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <View style={[styles.button, styles.buttonPrimary]}>
          {icon != null && (
            <FontAwesome
              name={icon}
              size={24}
              style={styles.buttonPrimaryIcon}
            />
          )}
          <Text style={styles.buttonPrimaryText}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export class SecondaryButton extends React.Component {
  static propTypes = buttonPropTypes
  render () {
    const {icon, title, onPress, ...props} = this.props
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <View style={[styles.button, styles.buttonSecondary]}>
          {icon != null && (
            <FontAwesome
              name={icon}
              size={24}
              style={styles.buttonSecondaryIcon}
            />
          )}
          <Text style={styles.buttonSecondaryText}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const buttonPropTypes = {
  title: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  buttonPrimary: {
    backgroundColor: color.orange
  },
  buttonPrimaryIcon: {
    marginRight: 10,
    color: color.white
  },
  buttonPrimaryText: {
    color: color.white
  },
  buttonSecondary: {
    backgroundColor: 'transparent'
  },
  buttonSecondaryIcon: {
    marginTop: 10,
    marginRight: 10,
    color: color.orange
  },
  buttonSecondaryText: {
    color: color.white
  }
  
})

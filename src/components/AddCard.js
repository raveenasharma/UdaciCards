import React from 'react'
import PropTypes from 'prop-types'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {View, Text, TextInput, StyleSheet, Platform, Keyboard} from 'react-native'
import {PrimaryButton} from '../components/Buttons'
import {connect} from 'react-redux'
import addCardToDeck from '../redux/actions/addCardToDeck'

import {color} from '../style/colors'

class AddCard extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {question: '', answer: ''}

  addCard = () => {
    Keyboard.dismiss()
    const {question, answer} = this.state
    const deckName = this.props.navigation.state.params.title

    this.props.addCardToDeck({deckName, card: {question, answer}})
    this.props.navigation.goBack()
  }

  render () {
    const disabled = this.state.question === '' || this.state.answer === ''

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={question => this.setState({question})}
            value={this.state.question}
            multiline
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={answer => this.setState({answer})}
            value={this.state.answer}
            multiline
          />
        </View>

        <PrimaryButton
          onPress={this.addCard}
          title='Add Card'
          disabled={disabled}
        />
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(null, {addCardToDeck})(AddCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 24,
    paddingBottom: 10,
    color: color.lightGrey
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    color: color.darkGrey,
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
    borderBottomColor: Platform.OS === 'ios' ? color.lightGrey : 'transparent'
  }
})

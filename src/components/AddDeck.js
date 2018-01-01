import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Keyboard} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import createNewDeck from '../state/actions/decks/action.createNewDeck'
import {PrimaryButton} from '../components/Buttons'
import {color} from '../style/colors'

class AddDeck extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {name: ''}

  onSubmit = () => {
    Keyboard.dismiss()
    const {name} = this.state
    this.setState({name: ''}, () => {
      this.props.createNewDeck({name: name})
      this.props.navigation.navigate('Deck', {title: name})
    })
  }

  render () {
    const empty = this.state.name === ''
    const duplicateName = this.props.deckIds.includes(this.state.name)
    const disabled = empty || duplicateName

    return (
      <KeyboardAwareScrollView
        style={{backgroundColor: color.blue}}
        contentContainerStyle={styles.container}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Provide a name for you new deck!</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
            keyboardAppearance='dark'
            returnKeyType='done'
          />
        </View>
        {duplicateName && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Deck with this name already exists. Please choose another name!
            </Text>
          </View>
        )}
        <PrimaryButton
          onPress={this.onSubmit}
          title='Create Deck'
          disabled={disabled}
        />
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = ({decks}) => ({deckIds: Object.values(decks).map(deck => deck.title)})
export default connect(mapStateToProps, {createNewDeck})(AddDeck)

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
    color: color.grey
  },
  input: {
    fontSize: 20,
    borderRadius: 5,
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: color.darkGrey,
    color: color.grey
  },
  errorContainer: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: color.red
  }
})

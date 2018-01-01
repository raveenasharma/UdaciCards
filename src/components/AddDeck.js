import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TextInput, StyleSheet, Keyboard, Platform} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import {PrimaryButton} from '../components/Buttons'
import createNewDeck from '../redux/actions/createDeck'
import {color} from '../style/colors'

class AddDeck extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {name: ''}

  addCard = () => {
    const {name} = this.state
    Keyboard.dismiss()
    this.setState({name: ''}, () => {
      this.props.createNewDeck({name: name})
      this.props.navigation.navigate('Deck', {title: name})
    })
  }

  render () {
    const empty = this.state.name === ''
    const duplicateTitle = this.props.deckIds.includes(this.state.name)
    const disabled = empty || duplicateTitle

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Provide a name for you new deck!</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
            keyboardAppearance='dark'
            returnKeyType='done'
          />
        </View>
        {duplicateTitle && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Deck with this name already exists. Please choose another name!
            </Text>
          </View>
        )}
        <PrimaryButton
          onPress={this.addCard}
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
    color: color.lightGrey
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    color: color.darkGrey,
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
    borderBottomColor: Platform.OS === 'ios' ? color.lightGrey : 'transparent'
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

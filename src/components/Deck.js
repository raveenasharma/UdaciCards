import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {
  PrimaryButton,
  SecondaryButton
} from '../components/Buttons'
import deleteDeck from '../state/actions/decks/action.deleteAllDecks'
import {color} from '../style/colors'

class Deck extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = ({navigation, screenProps}) => {
    const {params = {}} = navigation.state
    return {
      headerRight: (
        <SecondaryButton
          title={''}
          icon={'trash-o'}
          onPress={() => params.deleteDeck()}
        />
      )
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({deleteDeck: this.deleteDeck})
  }

  renameDeck = () => {
    this.props.navigation.navigate('RenameDeck', {title: this.props.deck.title})
  }

  deleteDeck = () => {
    const {title} = this.props.deck
    this.props.deleteDeck({name: title})
    this.props.navigation.goBack()
  }

  render () {
    const {navigate} = this.props.navigation
    if (this.props.deck == null) return null
    const {title, questions} = this.props.deck
    const navigateToQuiz = () => navigate('Quiz', {title})
    const navigateToNewCard = () => navigate('NewCard', {title})
    const disabled = questions.length < 1

    return (
      <View style={styles.container}>
        <View style={styles.deckDetails}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.cardCountView}>
            <Text style={styles.cardCountText}>
              <Text style={styles.cardCountNumber}>
                {questions.length}
              </Text>{' '}
              <Text>Card{questions.length === 1 ? '' : 's'}</Text>
            </Text>
          </View>          
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={'Add Card'}
            onPress={navigateToNewCard}
            style={{marginBottom: 20}}
          />
          <PrimaryButton
            title={'Start Quiz'}
            icon={'question'}
            onPress={navigateToQuiz}
            disabled={disabled}
            style={{marginBottom: 20}}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({decks}, props) => {
  const title = props.navigation.state.params.title
  return {deck: decks[title]}
}
export default connect(mapStateToProps, {deleteDeck})(Deck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.blue,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  deckDetails: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleView: {
    marginBottom: 15
  },
  titleText: {
    fontSize: 32,
    color: color.grey
  },
  cardCountView: {
    marginBottom: 15
  },
  cardCountText: {
    fontSize: 18,
    color: color.grey
  },
  cardCountNumber: {
    fontSize: 20,
    fontWeight: '600'
  },
  buttonContainer: {
    flex: 3,
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignContent: 'space-between',
    marginHorizontal: 20
  }
})

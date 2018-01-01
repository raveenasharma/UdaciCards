import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet, Animated, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {color} from '../style/colors'
import {updateNotificationTimestamp} from '../app-notification/notifications'
import {PrimaryButton, SecondaryButton} from '../components/Buttons'

const defaultState = {
  currentCardIndex: 0,
  face: 'front',
  isQuizComplete: false,
  correctAnswers: 0
}

class Quiz extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {...defaultState}

  // Animation functions
  componentWillMount () {
    this.animatedValue = new Animated.Value(0)
    this.springValue = new Animated.Value(0.3)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  initialize () {   
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 100,
        duration: 0
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 100,
        duration: 0
      }).start()
    }
  }

  flipCard () {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }

  }

  // Animation for congratulatory text
  spring () {
    this.springValue.setValue(0.3)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1
      }
    ).start()
  }

  // END of Animation functions

  showAnswer = () => {
    this.flipCard()
    this.setState({face: 'back'})
  }

  showQuestion = () => {
    this.flipCard()
    this.setState({face: 'front'})
  }

  markCorrect = () => {
    this.setState(
      state => ({correctAnswers: state.correctAnswers + 1}),
      () => this.next()
    )
  }

  next = () => {
    const {questions} = this.props
    const nextCardIndex = this.state.currentCardIndex + 1
    
    if (nextCardIndex < questions.length) {
      this.initialize()
      this.setState({currentCardIndex: nextCardIndex, face: 'front'})
      
    } else {
      this.setState({isQuizComplete: true}, () =>
        updateNotificationTimestamp()        
      )
      this.spring()
    }
    
  }

  restart = () => {
    this.initialize()
    this.setState({...defaultState})
  }

  goToDeck = () => {
    this.props.navigation.goBack()
  }

  render () {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    const {currentCardIndex, face, isQuizComplete, correctAnswers} = this.state
    const {questions} = this.props
    const {question, answer} = questions[currentCardIndex]

    return (
      <View style={styles.container}>
        {isQuizComplete === false && (
          <View style={styles.questionsRemaining}>
            <Text style={styles.questionsRemainingText}>
              {currentCardIndex + 1}/{questions.length}
            </Text>
          </View>
        )}
        { isQuizComplete && (
          <View style={styles.section}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Quiz Complete</Text>
              </View>
              <Text style={styles.subtitle}>
                    You got {correctAnswers} out of {questions.length} questions
                    correct
              </Text>
              {correctAnswers === questions.length ? 
                (<Animated.Text style={[styles.successText, {transform: [{scale: this.springValue}]}]}>
                      Congratulations!</Animated.Text>) : <Text></Text>}
            </View>
            <View style={styles.buttonContainer}>
              <SecondaryButton onPress={this.restart} title='Start Over' />
              <PrimaryButton onPress={this.goToDeck} title='Go to Deck' />
            </View>
          </View>
        ) }
        { !isQuizComplete && face === 'front' && (
          <Animated.View style={[styles.section, frontAnimatedStyle]}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Question</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>{question}</Text>
              </View>
            </View>
            <PrimaryButton onPress={this.showAnswer} title='Show Answer' />
          </Animated.View>
        ) }
        { !isQuizComplete && face === 'back' && (
          <Animated.View style={[styles.section, backAnimatedStyle]}>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Answer</Text>
              </View>
              <ScrollView style={[styles.subtitleContainer, {height: 100, padding: 5}]}>
                <Text style={styles.subtitle}>{answer}</Text>
              </ScrollView>
              <SecondaryButton onPress={this.showQuestion} title='Show Question' />
            </View>
            <View style={styles.buttonContainer}>
              <SecondaryButton onPress={this.next} title='Incorrect' />
              <PrimaryButton onPress={this.markCorrect} title='Correct' />
            </View>
          </Animated.View>
        )
        }
      </View>
    )
  }
}

const mapStateToProps = ({decks}, props) => {
  const deckTitle = props.navigation.state.params.title
  return {questions: decks[deckTitle].questions}
}
export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionsRemaining: {
    position: 'absolute',
    top: 15,
    left: 15
  },
  questionsRemainingText: {
    color: color.orange,
    fontWeight: 'bold',
    fontSize: 18
  },
  section: {
    height: 430,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 30,
    backgroundColor: color.blue,
    width: 350,
    borderRadius: 8,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 10,
      height: 10
    },
    elevation: 3
  },
  titleContainer: {
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    color: color.orange,
    textAlign: 'center'
  },
  subtitleContainer: {
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18,
    color: color.darkGrey,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  successText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'green',
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
})

import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {color} from '../style/colors'

class DeckView extends React.Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    gotToDeck: PropTypes.func.isRequired
  }

  render () {
    const {deck, gotToDeck} = this.props
    const {title, questions} = deck
    return (
      <TouchableOpacity onPress={gotToDeck} style={styles.preview}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.cardCount}>
              {questions.length} Card{questions.length === 1 ? '' : 's'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default DeckView

const styles = StyleSheet.create({
  preview: {
    marginBottom: 15,
    borderRadius: 5,
    shadowRadius: 3,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 5,
      height: 5
    },
    elevation: 3
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: color.darkGrey,
    opacity: 0.9
  },
  title: {
    fontSize: 30,
    color: color.white,
    marginBottom: 5
  },
  cardCount: {
    color: color.orange,
    textAlign: 'center'
  },
  icon: {
    color: color.orange,
    fontSize: 28
  }
})

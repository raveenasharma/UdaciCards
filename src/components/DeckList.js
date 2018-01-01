import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import DeckView from '../components/DeckView'
import {color} from '../style/colors'

class DeckList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render () {
    const {decks, navigation} = this.props
    const {navigate} = navigation
    return (
      <View style={styles.container}>
        {!decks || decks.length === 0 && (
          <Text style ={{textAlign: 'center', color: 'white', fontSize: 22}} >No quiz decks ☹️ {'\n'}
          Add a new deck or load sample decks from the Settings Tab </Text>
        )}
        <FlatList
          data={decks}
          renderItem={({item}) => (
            <DeckView
              deck={item}
              gotToDeck={() => navigate('Deck', {title: item.title})}
            />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = ({decks}) => ({decks: Object.values(decks).map(deck => ({...deck, key: deck.title}))})
export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.blue,
    paddingVertical: 30,
    paddingHorizontal: 15
  }
})

import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import DeckPreview from '../components/DeckPreview'
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
          <Text>No quiz decks !</Text>
        )}
        <FlatList
          data={decks}
          renderItem={({item}) => (
            <DeckPreview
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

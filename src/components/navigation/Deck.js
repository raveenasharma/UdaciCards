import {StackNavigator} from 'react-navigation'
import {color} from '../../style/colors'
import DeckList from '../DeckList'
import Deck from '../Deck'
import AddCard from '../AddCard'
import Quiz from '../Quiz'

const DeckStackNavigator = StackNavigator(
  {
    DeckList: {
      screen: DeckList,
      path: 'decks',
      navigationOptions: () => ({
        title: `All Decks`
      })
    },
    Deck: {
      screen: Deck,
      path: 'decks/:title',
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.title}`
      })
    },
    NewCard: {
      screen: AddCard,
      path: 'decks/:title/new',
      navigationOptions: () => ({
        title: `Add Card`
      }),
      mode: 'modal'
    },
    Quiz: {
      screen: Quiz,
      path: 'decks/:title/quiz',
      navigationOptions: () => ({
        title: `Quiz`
      })
    }
  },
  {
    initialRouteName: 'DeckList',
    navigationOptions: {
      headerTintColor: color.orange,
      headerStyle: {
        backgroundColor: color.darkBlue
      }
    }
  }
)

export default DeckStackNavigator

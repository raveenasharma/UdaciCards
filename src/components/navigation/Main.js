import React from 'react'
import {TabNavigator} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'
import DeckStackNavigator from './Deck'
import AddDeck from '../AddDeck'
import Settings from '../Settings'
import {color} from '../../style/colors'

const IndexSection = TabNavigator(
  {
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: 'Add Deck',
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name='ios-create-outline' size={30} color={tintColor} />
        )
      }
    },
    DeckList: {
      screen: DeckStackNavigator,
      navigationOptions: {
        title: 'Decks',
        tabBarLabel: 'Decks',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name='ios-list-outline' size={30} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name='ios-settings' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    animationEnabled: true,
    initialRouteName: 'DeckList',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: color.orange,
      style: {
        height: 56,
        backgroundColor: color.darkBlue,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

export default IndexSection

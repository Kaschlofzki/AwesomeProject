/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Fragment} from 'react';

 import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,

} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Screens/HomeScreen';
import StartTraining from './Screens/StartTraining';
import UebungenAdd from './Screens/UebungenAdd';
import TrainingVerwalten from './Screens/TrainingVerwalten';
import UebungVerwalten from './Screens/UebungVerwalten';
import UebungVerwaltenEinheit from './Screens/UebungVerwaltenEinheit';
import Walk from './Screens/Walk';

class App extends React.Component {



render() {
  return <AppContainer />;
      
     
  }


}




const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Verwalten : {
      screen: TrainingVerwalten,
    },
    StartTraining: {
      screen: StartTraining,
    },
    UebungenAdd: {
      screen: UebungenAdd,
    },
    UebungVerwalten: {
      screen: UebungVerwalten,
    },
    UebungVerwaltenEinheit: {
      screen: UebungVerwaltenEinheit,
    },
    // Walk: {
    //   screen: Walk,
    // }
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode : 'none'
  }
);

const AppContainer = createAppContainer(RootStack);



export default App


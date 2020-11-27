import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Home from './src/Home.js';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FormPage from './src/screens/FormPage.js';
import HomePage from './src/screens/HomePage.js';
import GeneratePdf from './src/screens/GeneratePdf';
import {Provider} from 'react-redux';
import {createStore, combineReducer} from 'redux';

const init_store = {
  documents: [],
  endpoint: 'http://192.168.0.7:5000/'
}

const appReducer = (state = init_store, action) => {

  switch (action.type) {
    case 'INSERT_DOCUMENT':
      console.log(action.docuemnt)
        return {
          ...state,
          documents: [...state.documents, {data: action.document}]
        }
  }

  return state
}

const store = createStore(appReducer)


const AppNavigator = createStackNavigator({
  HomePage: {screen: HomePage, navigationOptions: { header: null }},
  FormPage: {screen: FormPage, navigationOptions: { header: null }},
  GeneratePdfPage: {screen: GeneratePdf, navigationOptions: { header: null }},


})

const AppContainer = createAppContainer(AppNavigator)


export default class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      isLoaded: false
    }
  }


  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isLoaded: true });
  }

  render(){
    if(this.state.isLoaded){
      return (
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
    }
    else return <AppLoading />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

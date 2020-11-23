import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Home from './src/Home.js';
import { Ionicons } from '@expo/vector-icons';




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
        <Home />
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

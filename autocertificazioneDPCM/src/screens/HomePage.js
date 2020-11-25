import React, { Component } from 'react';
import {View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  FooterTab,
  Content,
  Badge,
  Form,
  Item,
  Input,
  Label,
  CheckBox,
  Radio,

} from 'native-base';
import {ActivityIndicator} from 'react-native';
import moment from 'moment'
import Footer from '../components/Footer.js'

import {withNavigation} from 'react-navigation'
//import {connect} from 'react-redux'

const headerStyle = {
  backgroundColor: '#2C3539'
}


class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }


    render(){
      return(
        <Container>
          <Header style={headerStyle} />
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'flex-start', marginTop: 100}} scrollEnabled={true}>
            <ScrollView>

          </ScrollView>
        </Content>
        <Footer />
      </Container>
      )
    }
  }


export default withNavigation(HomePage)

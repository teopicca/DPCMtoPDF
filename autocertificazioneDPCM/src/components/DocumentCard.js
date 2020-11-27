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
  Card,
  CardItem,
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
import moment from 'moment';

import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'

const headerStyle = {
  backgroundColor: '#2C3539'
}

function mapStateToProps(state){
  return {
    endpoint: state.endpoint,
    documents: state.documents
  }
}




class DocumentCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id
    }
  }

  goToForm = () => {
    this.props.navigation.navigate('FormPage', {id: this.state.id})
  }


    render(){
      return(
          <TouchableOpacity onPress={this.goToForm}>
            <Card>
                <CardItem>
                  <Body>
                    <Text>
                       {this.props.title}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
      )
    }
  }


export default withNavigation(connect(mapStateToProps)(DocumentCard))

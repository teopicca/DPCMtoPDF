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
import moment from 'moment';

import DocumentCard from '../components/DocumentCard.js';
import Footer from '../components/Footer.js';

import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

const headerStyle = {
  backgroundColor: '#2C3539'
}

function mapStateToProps(state){
  return {
    endpoint: state.endpoint,
    documents: state.documents
  }
}




class HomePage extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }



    render(){
        if(this.props.documents.length !== 0){
          return(
            <Container>
              <Header style={headerStyle} />
              <Content contentContainerStyle={{ flex: 1, justifyContent: 'flex-start', marginTop: 50}} scrollEnabled={true}>
                <ScrollView>
                {this.props.documents.map(doc => (
                  <DocumentCard
                    id={doc.data.id}
                    title={doc.data.first_name + ' ' + doc.data.last_name}
                  />
                ))}

              </ScrollView>
            </Content>
            <Footer />
          </Container>
          )
        }
        else{
          return(
            <Container>
              <Header style={headerStyle} />
              <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems:'center', marginTop: 50}} scrollEnabled={true}>
                <ScrollView>
                  <Text style={{fontSize: 20, marginBottom: 20}}>  Non sono presenti autocertificazioni. </Text>
                  <Button style={{width: 200, backgroundColor: '#2C3539', justifyContent:'center', alignSelf:'center'}} onPress={() => this.props.navigation.navigate('FormPage', {id: null})} >
                    <Text> creane una </Text>
                  </Button>
              </ScrollView>
            </Content>
            <Footer />
          </Container>
          )
        }

      }
  }


export default withNavigation(connect(mapStateToProps)(HomePage))

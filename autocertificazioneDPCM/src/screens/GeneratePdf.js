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
  Spinner

} from 'native-base';
import {ActivityIndicator} from 'react-native';
import moment from 'moment'
import Footer from '../components/Footer.js'

import {withNavigation} from 'react-navigation'
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

class GeneratePdf extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      document: null,
      document_id: this.props.docuemnt_id,
      emailCheck: false,
      loading: false
    }
    const id = this.props.navigation.state.params.document_id
    const documents = this.props.documents
    console.log(id)

    for (var i = 0; i < documents.length; i++) {
      if(documents[i].id == id){
        this.state.document = documents[i]
      }
    }
  }

  email_check = (email) => {
    this.setState({email: email})
    const check = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.trim()))
    console.log(check)
    if (check){
      this.setState({emailCheck: true})
    }
    else{
      this.setState({emailCheck: false})
    }
  }

  generate_pdf(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: this.state.email, form_data: this.state.document})
      };

      this.setState({loading: true})

      fetch(this.props.endpoint + 'form_data', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.status == 200)
              console.log('success')
          });
  }



    render(){
      if(this.state.document !== null){
        return(
          <Container>
            <Header style={headerStyle} />
            <Content contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Item style={{width: '80%'}}>
                <Input regular placeholder="email" onChangeText={(event) => this.email_check(event)}/>
              </Item>
              <Item>
              <Button
              onPress={this.generate_pdf.bind(this)}
              active={this.state.emailCheck}
              style={{width: 200, backgroundColor: '#2C3539', marginTop: 50, justifyContent: 'center'}}>
                <Text> inzia pdf </Text>
              </Button>
              </Item>

          </Content>
          <Footer />
        </Container>
        )
      }
      else{
        <Container>
          <Header style={headerStyle} />
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'flex-start', marginTop: 100}} scrollEnabled={true}>
            <ScrollView>

          </ScrollView>
        </Content>
        <Footer />
      </Container>
      }

    }
  }


export default withNavigation(connect(mapStateToProps)(GeneratePdf))

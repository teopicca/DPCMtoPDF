import React, { Component } from 'react';
import {View, Alert, ScrollView} from 'react-native';
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
  Footer,
  FooterTab,
  Content,
  Badge,
  Form,
  Item,
  Input,
  Label,
  CheckBox,

} from 'native-base';
import {ActivityIndicator} from 'react-native';
import moment from 'moment'
//import {withNavigation} from 'react-navigation'
//import {connect} from 'react-redux'


const formItem = {

  marginTop: 100,
  width: '100%'

}




class Home extends Component {


  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      date: new Date(),
      birth_date: '',
      showBirthDatePicker: false,
      showDocumentDatePicker: false,
      birth_place: '',
      birth_province: '',
      first_home_address: '',
      first_home_province: '',
      second_home_address: '',
      second_home_province: '',
      document_type: '',
      document_number:'',
      document_publisher: '',
      document_date: '',
      checkSameHome: false,
      loading: false,
      endpoint: 'http://192.168.0.7:5000/'
    }
  }

  generate_pdf(){



      const form_data = {
        first_name:                   this.state.first_name,
        last_name:                    this.state.last_name,
        birth_date:                   {day: '03', month: '05', year:'1998'},
        birth_place:                  this.state.birth_place,
        birth_province:               this.state.birth_province.toUpperCase(),
        first_home_address:           this.state.first_home_address,
        first_home_province:          this.state.first_home_province.toUpperCase(),
        first_home_municipal:         this.state.first_home_municipal,
        second_home_province:         this.state.second_home_province.toUpperCase(),
        second_home_municipal:        this.state.second_home_municipal,
        second_home_address:          this.state.second_home_address,
        document_type:                this.state.document_type,
        document_number:              this.state.document_number,
        document_publisher:           this.state.document_publisher,
        identity_document_date:       {day: this.state.document_date.getDay(), month: this.state.document_date.getMonth(), year: this.state.document_date.getYear()}


      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({form_data: form_data})
      };

      this.setState({loading: true})

      fetch(this.state.endpoint + 'form_data', requestOptions)
          .then(response => response.json())
          .then(data => {
            if(data.status == 200)
              console.log('success')
          });
  }

  handleCheckboxSameHome = (event) => {
    this.setState({checkSameHome: !this.state.checkSameHome})
    if(!this.state.checkSameHome){
      this.setState({second_home_address:     this.state.first_home_address,
                     second_home_province:    this.state.first_home_province,
                     second_home_municipal:   this.state.first_home_municipal})
    }
  }




    render(){
      return(
        <Container>
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'flex-start', marginTop: 100}} scrollEnabled={true}>
            <ScrollView>
              <Item style={formItem}>
                <Input placeholder="nome" onChangeText={(event) => this.setState({first_name: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="cognome"
                  value={this.state.last_name}
                  onChangeText={(event) => this.setState({last_name: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="data di nascita"
                  onFocus={() => this.setState({showBirthDatePicker: true})}
                  value={this.state.birth_date !== '' ?  moment(this.state.birth_date).format('DD/MM/YYYY') : '' }
                  />
                {this.state.showBirthDatePicker &&
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.birth_date == '' ? new Date() : this.state.birth_date}
                    mode={'date'}
                    display="default"
                    onChange={(event, date) => date != null && this.setState({birth_date: date, showBirthDatePicker: false})}
                  />
                }

              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="luogo di nascita"
                  onChangeText={(event) => this.setState({birth_place: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="provincia"
                  onChangeText={(event) => this.setState({birth_province: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="residente in"
                  onChangeText={(event) => this.setState({first_home_municipal: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="provincia"
                  onChangeText={(event) => this.setState({first_home_province: event})}/>
              </Item>
              <Item style={formItem}>
                  <Input
                    placeholder="via"
                    onChangeText={(event) => this.setState({first_home_address: event})}/>
              </Item>
              <View style={{marginTop:20, marginBottom:20, flex:1, flexDirection: 'row'}}>
                <CheckBox checked={this.state.checkSameHome} onPress={this.handleCheckboxSameHome} />
                <View style={{marginLeft: 20}}>
                 <Text> usa lo stesso indirizzo </Text>
                 </View>
              </View>
              <Item style={formItem}>
                <Input
                  placeholder="e domiciliato in"
                  value={this.state.second_home_municipal}
                  onChangeText={(event) => this.setState({second_home_municipal: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  value={this.state.second_home_province}
                  placeholder="provincia"
                  onChangeText={(event) => this.setState({second_home_province: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  value={this.state.second_home_address}
                  placeholder="via"
                  onChangeText={(event) => this.setState({second_home_address: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  value={this.state.document_type}
                  placeholder="identificato a mezzo "
                  onChangeText={(event) => this.setState({document_type: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  value={this.state.document_number}
                  placeholder="numero"
                  onChangeText={(event) => this.setState({document_number: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  value={this.state.document_publisher}
                  placeholder="rilasciato da "
                  onChangeText={(event) => this.setState({document_publisher: event})}/>
              </Item>
              <Item style={formItem}>
                <Input
                  placeholder="in data"
                  onFocus={() => this.setState({showDocumentDatePicker: true})}
                  value={this.state.document_date !== '' ? moment(this.state.document_date).format('DD/MM/YYYY') : ''}
                  />
                {this.state.showDocumentDatePicker &&
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.document_date == '' ? new Date : this.state.document_date}
                    mode={'date'}
                    display="default"
                    onChange={(event, date) => date != null && this.setState({document_date: date, showDocumentDatePicker: false})}
                  />
                }

              </Item>

            <Button
              style={{marginTop: 50, width: '100%', justifyContent:'center', backgroundColor: 'white',}}
              onPress={this.generate_pdf.bind(this)}>
              <Text style={{color:'black'}}> Genera </Text>
          </Button>
          </ScrollView>
        </Content>
      </Container>
      )
    }
  }


export default Home

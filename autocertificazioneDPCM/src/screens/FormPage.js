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
import Footer from '../components/Footer.js';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';


const formItem = {

  marginTop: 50,
  width: '100%'

}

function mapStateToProps(state){
  return {
    endpoint: state.endpoint,
    documents: state.documents
  }
}

function mapDispatchToProps(dispatch){
  return{
    insert_document: (doc) => dispatch({type:'INSERT_DOCUMENT', document: doc })
  }
}


class FormPage extends Component {


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
      moving_reason: {},
      moving_reason_checkbox: false,
      moving_reason_checkbox1: false,
      moving_reason_checkbox2: false,
      checkSameHome: false,
      loading: false,
    }
  }


  createButton(){
    const form_data = {
      id:                           this.props.documents.length + 1,
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
      identity_document_date:       {day: this.state.document_date.getDay(), month: this.state.document_date.getMonth(), year: this.state.document_date.getYear()},
      moving_reason:                this.state.moving_reason

    }
    this.props.insert_document(form_data)
    this.props.navigation.navigate('GeneratePdfPage', {document_id: form_data.id})
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
          <Header style={{backgroundColor: '#2C3539'}}/>
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
              <Text style={{marginTop:50, fontSize: 20}}> Lo spostamento e' determinato da </Text>
              <Item style={formItem}>
                <TouchableOpacity style={{width: '100%'}} onPress={() =>
                  this.setState({
                    moving_reason: 0,
                    moving_reason_checkbox:true,
                    moving_reason_checkbox1:false,
                    moving_reason_checkbox2: false})}>
                <Left>
                  <Text style={{fontSize:18, width: '100%'}}>Esigenze lavorative</Text>
                </Left>
                <Right>
                  <Radio
                    selected={this.state.moving_reason_checkbox} />
                </Right>
                </TouchableOpacity>
                </Item>
                <Item style={formItem}>
                  <TouchableOpacity style={{width: '100%'}} onPress={() =>
                    this.setState({
                      moving_reason: 1,
                      moving_reason_checkbox: false,
                      moving_reason_checkbox1: true,
                      moving_reason_checkbox2: false})} >
                  <Left>
                    <Text style={{fontSize:18, width: '100%'}}>Motivi di Salute</Text>
                  </Left>
                  <Right>
                    <Radio
                      selected={this.state.moving_reason_checkbox1} />
                  </Right>
                  </TouchableOpacity>
                </Item>
                <Item style={formItem}>
                  <TouchableOpacity style={{width: '100%'}} onPress={() =>
                    this.setState({
                      moving_reason: 2,
                      moving_reason_checkbox: false,
                      moving_reason_checkbox1:false,
                      moving_reason_checkbox2: true})} >
                  <Left>
                    <Text style={{fontSize:18, width: '100%'}}>Altro</Text>
                  </Left>
                  <Right>
                    <Radio
                      selected={this.state.moving_reason_checkbox2}
 />
                  </Right>
                  </TouchableOpacity>
                </Item>

            <Button
              style={{marginTop: 50, width: '100%', justifyContent:'center', backgroundColor: 'white',}}
              onPress={this.createButton.bind(this)}>
              <Text style={{color:'black'}}> Salva </Text>
          </Button>
          </ScrollView>
        </Content>
        <Footer />
      </Container>
      )
    }
  }


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FormPage))

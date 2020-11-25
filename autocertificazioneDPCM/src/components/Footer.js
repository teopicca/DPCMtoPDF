import React, { Component } from 'react';
import { Container, Footer, FooterTab, Text, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {withNavigation} from 'react-navigation'

class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{backgroundColor:'#2C3539'}}>
        <Button vertical onPress={() => this.props.navigation.navigate('HomePage')}>
        <Icon type='AntDesign' name="home" style={{color: 'white'}} />

          <Text style={{color: 'white'}}>Home</Text>

        </Button>
          <Button vertical onPress={() => this.props.navigation.navigate('FormPage')}>
            <Icon type='Entypo' name="text-document" style={{color: 'white'}} />
            <Text style={{color: 'white'}}> crea </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(FooterComponent)

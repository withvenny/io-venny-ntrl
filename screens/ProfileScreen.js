import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

export default class ProfileScreen extends Component {

  static navigationOptions = {
    title: 'Profile',
  };

  render() {

    return (
      <View style={styles.MainContainer}>

        <Text style={styles.counterText}>Profile</Text>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  },
  counterText:{

    fontSize: 28,
    color: '#000'
  }
});
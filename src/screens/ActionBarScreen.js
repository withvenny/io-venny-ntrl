import React, { Component } from 'react';
 
import { StyleSheet, View, Text, Image } from 'react-native';
 
import { createStackNavigator } from 'react-navigation-stack';

class ActionBarImage extends Component {

  render() {

    return (

      <View style={{flexDirection: 'row'}}>

        <Image
          source={{uri : 'https://io-venny-api.imgix.net/images/38875080_1823993890995021_6807472642459697152_o.jpg'}}
          style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft: 15}}
        />

      </View>
    
    );
  
  
  }
}
 
class MainActivity extends Component {
 
static navigationOptions = {
      title: 'MainActivity',

      headerLeft : <ActionBarImage />,
 
      headerStyle: {
 
      backgroundColor: '#FF9800'
 
    },

    headerTintColor: '#fff',

   };
 
   render() {
      return(
 
         <View style = { styles.MainContainer }>
 
            <Text style={{fontSize: 23}}> Hello Friends </Text>
          
         </View>
      );
   }
}
 
export default ActivityProject = createStackNavigator(
{
  
  First: { screen: MainActivity }
 
});
 
const styles = StyleSheet.create({
 
  MainContainer :
  {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff'
  }
 
});
import React, { Component } from 'react';
 
import { StyleSheet, Platform, View, ActivityIndicator, FlatList, RefreshControl, Text, Image, Alert, YellowBox } from 'react-native';
 
export default class Project extends Component {
 
  static navigationOptions = {
    title:'Feed',
};

 constructor(props) {

   super(props);

   this.state = {

     isLoading: true,
     refreshing: false,
     isFetching: false,

   }

   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);

 }
 
GetItem (flower_name) {
  
 Alert.alert(flower_name);
 
 }
 
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

 //
 vennyRequest = () => {

  let vennyAPI_uri = 'https://io-venny-media-api.herokuapp.com/v2/assets?token=tok_thentrlco&app=app_thentrlco&type=image&status=active&profile=prf_adolphus';

  return fetch(vennyAPI_uri)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             dataSource: responseJson,
             isLoading: false,
             isFetching: false,
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });

 }

 componentDidMount(){

  this.vennyRequest();

 }


onRefresh() {
  this.setState({ isFetching: true }, function() { this.vennyRequest() });
}
 
 render() {

   if (this.state.isLoading) {
     return (

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

         <ActivityIndicator size="large" />

       </View>
       
     );

   }
 
   return (
 
     <View style={styles.MainContainer}>
 
       <FlatList
       
        data={ this.state.dataSource.data }
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        ItemSeparatorComponent = {this.FlatListItemSeparator}
        renderItem={({item}) => 
        
            <View style={{flex:1, flexDirection: 'row'}}>
    
              <Image source = {{ uri: "https://io-venny-api.imgix.net/images/"+item.filename }} style={styles.imageView} />
            
              <Text onPress={this.GetItem.bind(this, item.caption)} style={styles.textView} >{item.caption}</Text>

            </View>
        
        }

        keyExtractor={(item, index) => index.toString()}
        
        />
 
     </View>
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
imageView: {

    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
},
 
textView: {

    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
 
});
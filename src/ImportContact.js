/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {
    Image,
    StyleSheet,
    Text,
    Keyboard,
    TextInput,
    View,
    ScrollView,
    AsyncStorage,
    Platform,
    FlatList,
    TouchableOpacity,
    PermissionsAndroid
  } from "react-native";
import dimens, { sdp } from "./values/dimens";
import Session from './session';
import CheckBox from 'react-native-check-box';
import ButtonApp from "./uiComponents/ButtonApp";
import React, {Component} from 'react';
import { connect } from 'react-redux'; //Redux support
import { getPostsData,getContactList  } from './services/user';
import { Asset, Audio, Font, Video } from 'expo';
  import * as Common from './common_function';
var audioPlayer;

class ImportContact extends Component {

    constructor(props) {
      super(props);

    Audio.setIsEnabledAsync(true);
      this.state = {
          isNew:'0',
          isAll:false,
          isLoaded:false,
          contacts_1:null,
          contacts_2:null,
      }

      this.audioPlayer = new Audio.Sound();
       this.props.navigation.addListener(
          'didFocus',
          payload => {
            this.getContacts();
          }
        );
	}



    getContacts() {
        Keyboard.dismiss();

            this.setState({ isLoading: true });
            const url = "username="+this.props.userData.username;
            getContactList(url,(flag, response, msg) => {
                this.setState({ isLoading: false });
                if (flag) {

                        if(response.contacts.length != 0){
                            this.setState({contacts_1:response.contacts[0]})
                            if(response.contacts.length >= 2){
                                this.setState({contacts_2:response.contacts[1]})
                            }
                        }

                    }

            });

    }

    render() {

        console.log('isLoaded', this.state.contacts_1);
        console.log('isLoaded', this.state.contacts_2);

        return (
			<View style={{flex:1, flexDirection:'column'}}>
				<View style={{height:52, padding:5, flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#13B9B4', backgroundColor:'#fff'}}>
					<View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
						<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding:5}}>
							<Image source={require('./images/left-arrow.png')} style={{height:15, width:15}}/>
						</TouchableOpacity>

						<Text style={{alignSelf:'center', color:'#13B9B4'}} onPress={()=>this.props.navigation.goBack()}>Home</Text>
					</View>
					<Text style={{position:'absolute', left:'44%', color:'#13B9B4', fontWeight: 'bold'}}>Import Contact</Text>
				</View>
	            <View style={{flex:1, padding:20,  flexDirection:'column', justifyContent:'center', backgroundColor:'#fff',}}>

	                    <View >
                            {
                                this.state.contacts_1  ?
                                <TouchableOpacity style={{backgroundColor:'#13B9B4', padding:10, marginTop:10, justifyContent:'center'}} onPress={() => {

    	                            this.props.navigation.navigate('AddContact', this.state.contacts_1);
    	                            }
    	                          }>
    	                            <Text style={{color:'#fff', fontSize:14, alignSelf:'center'}}>{this.state.contacts_1.name}</Text>
    	                        </TouchableOpacity>
                            :
                                <TouchableOpacity style={{backgroundColor:'#13B9B4', padding:10, marginTop:10, justifyContent:'center'}} onPress={() => {

    	                            this.props.navigation.navigate('AddContact');
    	                            }
    	                          }>
    	                            <Text style={{color:'#fff', fontSize:14, alignSelf:'center'}}>Import Contact 1</Text>
    	                        </TouchableOpacity>
                            }

	                        {
                                this.state.contacts_2  ?
                                <TouchableOpacity style={{backgroundColor:'#13B9B4', padding:10, marginTop:10, justifyContent:'center'}} onPress={() => {

    	                            this.props.navigation.navigate('AddContact', this.state.contacts_2);
    	                            }
    	                          }>
    	                            <Text style={{color:'#fff', fontSize:14, alignSelf:'center'}}>{this.state.contacts_2.name}</Text>
    	                        </TouchableOpacity>
                            :
                                <TouchableOpacity style={{backgroundColor:'#13B9B4', padding:10, marginTop:10, justifyContent:'center'}} onPress={() => {

    	                            this.props.navigation.navigate('AddContact');
    	                            }
    	                          }>
    	                            <Text style={{color:'#fff', fontSize:14, alignSelf:'center'}}>Import Contact 2</Text>
    	                        </TouchableOpacity>
                            }

	                    </View>


	            </View>
			</View>

        )
    }


    playSound = async (item) => {
		console.log('player', item);
        if(this.state.player_post_id === item.id){
            await this.audioPlayer.pauseAsync();
            this.setState({player_post_id:null});
        }else{
            this.audioPlayer = new Audio.Sound();
            this.setState({player_post_id:item.id})

            try {
              await this.audioPlayer.unloadAsync()
              await this.audioPlayer.loadAsync({uri:item.path});
              await this.audioPlayer.playAsync();
            } catch (err) {
                Common.showAlertWithDefaultTitle(`Couldn't Play audio`);
            }

        }

    }



}





  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#ffffff',
      paddingLeft: 20,
      paddingTop: 20,
      paddingRight: 20,
    },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      color: '#13B9B4',
      margin: 10,
    },
    welcomeone: {
      fontSize: 20,
      textAlign: 'center',
      color: '#13B9B4',
    },
    instructions: {
      fontSize: 30,
      textAlign: 'center',
      color: '#D8D8D8',
      marginBottom: 5,
      marginTop: dimens.space_large,
    },
    instructionsrecord: {
      fontSize: 18,
      textAlign: 'center',
      color: '#D8D8D8',
      marginTop: dimens.space_large,
    },
    instructionsname: {
      fontSize: 30,
      textAlign: 'center',
      color: '#D8D8D8',
      marginBottom: 5,
    },
    login:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft:dimens.very_space_large,
      paddingRight:dimens.very_space_large
    },
    bgView: {
      width: "70%",
      borderColor: '#d8d8d8',
      borderRadius: dimens.buttonHightLarge / 5,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: dimens.space_small,
      paddingRight: dimens.space_small,
      height: dimens.buttonHightLarge
    },
    bottomView:{
        width:"100%",
        position: 'absolute',
        bottom: 0,
        marginLeft:20
      },
  });

  function mapStateToProps(state){
      return {
          isloggedIn: state.UserReducer.isloggedIn,
          userData: state.UserReducer.userData,
          sToken: state.UserReducer.sToken
      }
  }


  const mapDispatchToProps = (dispatch) => ({
      updateUserData: (user) => dispatch({type: 'UPDATE_USER_DATA', payload: user}),
  });


  export default connect(mapStateToProps, mapDispatchToProps)(ImportContact);

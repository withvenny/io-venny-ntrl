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
import { getPostsData } from './services/user';
import { Asset, Audio, Font, Video } from 'expo';
  import * as Common from './common_function';
var audioPlayer;

class OnBoarding extends Component {

    constructor(props) {
      super(props);

    Audio.setIsEnabledAsync(true);
      this.state = {
          isNew:'0',
          isAll:false,
          isLoaded:false
      }
      this.audioPlayer = new Audio.Sound();
	}

    async UNSAFE_componentWillMount(){

    	    //Get value of stoken from storage
        this.state.isNew =  await AsyncStorage.getItem('IS_NEW');


        if(this.state.isNew!=null && this.state.isNew !== '0'){

            this.props.navigation.navigate('Quotes');

        }
        this.setState({isLoaded:true});

  	};


    render() {
        console.log('isLoaded', this.state.isLoaded);
        console.log('isLoaded', this.state.isNew);

        return (

            <View style={{height:'100%',padding:20,  flexDirection:'column', justifyContent:'center', backgroundColor:'#fff',}}>
                {
                    (this.state.isLoaded && (this.state.isNew === '0' || this.state.isNew == null))?
                    <View >
                        <Text style={{fontSize:20, marginBottom:10, textAlign: 'center',alignSelf:'center',color:'#13B9B4'}}>Thank you for logging In for the first time. Now you'll be able to record audio for class and listen to previously recorded audio.</Text>
                        <CheckBox
            			    style={{padding: 10}}
            			    onClick={()=>{
            			      this.setState({
            			          isAll:!this.state.isAll
            			      })
                              if(this.state.isAll){

                                  Session.setQouteStatus('1');
                              }else{
                                  Session.setQouteStatus('0');
                              }
            			    }}
            			    isChecked={this.state.isAll}
            			    leftText={"Show me All Quotes"}
            			/>
                        <TouchableOpacity style={{backgroundColor:'#13B9B4', padding:10, marginTop:50, justifyContent:'center'}} onPress={() => {
                          Session.setUserStatus('1');
                            this.props.navigation.navigate('Quotes');
                            }
                          }>
                            <Text style={{color:'#fff', fontSize:14, alignSelf:'center'}}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                :
                    <View/>



                }


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


  export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);

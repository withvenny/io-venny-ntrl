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
 import * as Constant from './constant';
import React, {Component} from 'react';
import { connect } from 'react-redux'; //Redux support
import { addContacts,getContacts } from './services/user';
import { Asset, Audio, Font, Video } from 'expo';
  import * as Common from './common_function';
var audioPlayer;
 import mstyles from "./values/styles";
class AddContact extends Component {

    constructor(props) {
      super(props);
      console.log('1',this.props.navigation.state.params);

      this.state = {
          isNew:'0',
          isAll:false,
          isLoaded:false,
          name:this.props.navigation.state.params ? this.props.navigation.state.params.name : '',
          email:this.props.navigation.state.params ? this.props.navigation.state.params.email : '',
          number:this.props.navigation.state.params ? this.props.navigation.state.params.mobile : '',
          username:this.props.userData.username,
		  validate: () => {
              let message = '';
              const reg = Constant.EMAILREG;
              const preg = Constant.PASSWORDREG;
              if (this.state.name === '') {
                  message = 'Please enter name.';
              } else if (this.state.email === '') {
                  message = 'Please enter email.';
              } else if (this.state.number === '') {
                  message = 'Please enter number';
              }
               else if (this.state.username === '') {
                  message = 'Please enter user_name';
              }
               else if (!reg.test(this.state.email)) {
                  message = 'Please enter valid email';
              }
              if (message === '') {
                  return true;
              }

              Common.showAlertWithDefaultTitle(message);
              return false;
          }
      }
      this.audioPlayer = new Audio.Sound();
	}

    async UNSAFE_componentWillMount(){


  	};


    render() {
        console.log('isLoaded', this.state.isLoaded);
        console.log('isLoaded', this.state.isNew);

        return (
			<View style={{flex:1, flexDirection:'column'}}>
				<View style={{height:52, padding:5, flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#13B9B4', backgroundColor:'#fff'}}>
					<View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
						<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding:5}}>
							<Image source={require('./images/left-arrow.png')} style={{height:15, width:15}}/>
						</TouchableOpacity>

						<Text style={{alignSelf:'center', color:'#13B9B4'}} onPress={()=>this.props.navigation.navigate('Quotes')}>Home</Text>
					</View>
					<Text style={{position:'absolute', left:'44%', color:'#13B9B4', fontWeight: 'bold'}}>Add Contact</Text>
				</View>
	            <View style={{flex:1, padding:20,  flexDirection:'column', backgroundColor:'#fff',}}>

					<View style={styles.bgView}>
						<TextInput
						  onChangeText={name => this.setState({ name })}
                          value = {this.state.name}
						  underlineColorAndroid="transparent"
						  placeholder="Name"
						  style={[mstyles.etDark]}
						>
						</TextInput>
				  	</View>
					<View style={styles.bgView}>
						<TextInput
						  onChangeText={email => this.setState({ email })}
                          value = {this.state.email}
						  underlineColorAndroid="transparent"
						  placeholder="Email"
						  style={[mstyles.etDark]}
						>
						</TextInput>
				  	</View>
					<View style={styles.bgView}>
						<TextInput
						  onChangeText={number => this.setState({ number })}
                          value = {this.state.number}
						  underlineColorAndroid="transparent"
						  placeholder="Number"
						  style={[mstyles.etDark]}
						>
						</TextInput>
				  	</View>

                    <TouchableOpacity style={{backgroundColor:'#13B9B4', padding:10, marginTop:10, justifyContent:'center'}} onPress={() => this.addContact()}
                      >
                        <Text style={{color:'#fff', fontSize:14, alignSelf:'center'}}>Submit</Text>
                    </TouchableOpacity>


	            </View>
			</View>

        )
    }


	    addContact() {
	        Keyboard.dismiss();
	        if (this.state.validate()) {
	            this.setState({ isLoading: true });
	            const url = "username="+this.state.username+"&email="+this.state.email + "&name="+this.state.name+"&mobile="+this.state.number;
	            addContacts(url,{}, (flag, response, msg) => {
	                this.setState({ isLoading: false });
	                if (flag) {

								this.props.navigation.goBack();

	                    }

	            });
	        }
	    }
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
      width: "100%",
	  marginBottom:10,
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


  export default connect(mapStateToProps, mapDispatchToProps)(AddContact);

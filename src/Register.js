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
    TextInput,
    View,
    AsyncStorage,
    ScrollView,
    Keyboard,
    Platform,
    TouchableOpacity
  } from "react-native";
  import React, {Component} from 'react';
  import SplashScreen from 'react-native-splash-screen';
  import dimens, { sdp } from "src/values/dimens";
  import mstyles from "src/values/styles";
  import ButtonApp from "src/uiComponents/ButtonApp";
  import { Actions } from 'react-native-router-flux';
  import * as Constant from 'src/constant';
  import * as Common from 'src/common_function';
  import { userRegistration } from 'src/services/user';
  import * as Database from 'src/database';
  import SharedManager from 'src/sharedmanager';
  import CheckBox from 'react-native-check-box'
  import { connect } from 'react-redux'; //Redux support

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

  type Props = {};
class Register extends Component  {

    constructor(props) {
      super(props);
      _this = this;

      this.state = {
        firstname:  "",
        lastname:  "",
		isAdult :false,
        email:  "",
        username:  "",
        password:  "",
        validate: () => {
          let message = '';
          const reg = Constant.EMAILREG;
          const preg = Constant.PASSWORDREG;
          if (this.state.firstname === '') {
              message = 'Please enter firstname.';
          }else if (this.state.lastname === '') {
              message = 'Please enter lastname.';
          }else if (this.state.email === '') {
              message = 'Please enter email.';
          } else if (!reg.test(this.state.email)) {
              message = 'Please enter valid email.';
          }else if (this.state.username === '') {
              message = 'Please enter username.';
          } else if (this.state.password === '') {
              message = 'Please enter password.';
          } else if (!preg.test(this.state.password)) {
              message = 'Password does not allow space.';

          } else if (!this.state.isAdult) {
              message = 'You must be 18 year old to continue.';
          }
          if (message === '') {
              return true;
          }

          Common.showAlertWithDefaultTitle(message);
          return false;
      }
      };
    }
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.instructions}>NTRL</Text>

          <View style={{ flex : 1,
          paddingLeft:dimens.very_space_large,
          paddingRight:dimens.very_space_large,
          paddingTop:dimens.space_large}}>
          <ScrollView >
            <View style={styles.bgView}>
                <TextInput
                  onChangeText={firstname => this.setState({ firstname })}
                  underlineColorAndroid="transparent"
                  placeholder="First Name"
                  style={[mstyles.etDark]}
                >
                </TextInput>
              </View>
            <View style={styles.bgView}>
                <TextInput
                  onChangeText={lastname => this.setState({ lastname })}
                  underlineColorAndroid="transparent"
                  placeholder="Last Name"
                  style={[mstyles.etDark]}
                >
                </TextInput>
              </View>
            <View style={styles.bgView}>
                <TextInput
                  onChangeText={email => this.setState({ email })}
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  style={[mstyles.etDark]}
                >
                </TextInput>
              </View>
            <View style={styles.bgView}>
                <TextInput
                  onChangeText={username => this.setState({ username })}
                  underlineColorAndroid="transparent"
                  placeholder="Username"
                  style={[mstyles.etDark]}
                >
                </TextInput>
              </View>
              <View style={styles.bgView}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  style={[mstyles.etDark]}
                >
                </TextInput>
              </View>
			  <CheckBox
			    style={{flex: 1, padding: 10}}
			    onClick={()=>{
			      this.setState({
			          isAdult:!this.state.isAdult
			      })
			    }}
			    isChecked={this.state.isAdult}
			    leftText={"Are you 18 year old?"}
			/>

              <ButtonApp
                text="Register   "
                mstyle={{ width: "100%", marginTop: dimens.space_small }}
                onPress={ () => this.registerUser()}
              />

              <TouchableOpacity
                style={{ padding: 10 , justifyContent:"center", alignItems: "center"}}
                onPress={() => {
                  this.login();
                }}
              >
                <Text style={[mstyles.tvLargeBold, { color: '#13B9B4' }]}>
                  Login >
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

        </View>
      );
    }
    login(){
		this.props.navigation.navigate('Login');
    }

    registerUser() {
      Keyboard.dismiss();
      if (this.state.validate()) {
          this.setState({ isLoading: true });
          const url = "username="+this.state.username+"&password="+this.state.password+"&email="+this.state.email+"&fullname="+this.state.firstname+" "+this.state.lastname;
          userRegistration(url,{}, (flag, response, msg) => {
              this.setState({ isLoading: false });
              console.log("111--"+response);
              if (flag) {
                  if (response !== undefined) {
                      try {

						  this.props.updateUserData({isloggedIn: true, userData:  response, sToken: response.id});

						  								this.setState({isloggedIn:true});
                      } catch (error) {
                      }
                  }
              } else {
                  if (response !== undefined && response === 501) {
                      Common.showAlertwithAction(Constant.PROJECTNAME, msg, actions);
                  } else {
                      Common.showAlertWithDefaultTitle(msg);
                  }
              }
          });
      }
  }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      flexDirection: "column",
    },

    welcome: {
      fontSize: 20,
      textAlign: 'center',
      color: '#13B9B4',
      margin: 10,
    },
    instructions: {
      fontSize: 40,
      textAlign: 'center',
      color: '#13B9B4',
      marginBottom: 5,
    },
    login:{
      flex: 1,
      marginTop:100,
      flexDirection: "column",
      paddingLeft:dimens.very_space_large,
      paddingRight:dimens.very_space_large
    },
    bgView: {
      width: "100%",
      marginBottom: dimens.space_small,
      borderColor: '#d8d8d8',
      borderRadius: dimens.buttonHightLarge / 5,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: dimens.space_small,
      paddingRight: dimens.space_small,
      height: dimens.buttonHightLarge
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


export default connect(mapStateToProps, mapDispatchToProps)(Register);

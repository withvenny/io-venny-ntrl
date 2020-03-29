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
    AsyncStorage,
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
  import { userLogin } from 'src/services/user';
  import * as Database from 'src/database';
  import SharedManager from 'src/sharedmanager';
  import { connect } from 'react-redux'; //Redux support

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

  type Props = {};
class Login extends Component {

    constructor(props) {
      super(props);
      _this = this;

      this.state = {
        name:  "",
        password:  "",
        isLoading: false,
        validate: () => {
            let message = '';
            const reg = Constant.EMAILREG;
            const preg = Constant.PASSWORDREG;
            if (this.state.name === '') {
                message = 'Please enter username.';
            } else if (this.state.password === '') {
                message = 'Please enter password.';
            } else if (!preg.test(this.state.password)) {
                message = 'Password does not allow space.';
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
          {/* <Text style={styles.instructions}>{instructions}</Text> */}

          <View style = {styles.login}>
          <View style={styles.bgView}>
              <TextInput
                onChangeText={name => this.setState({ name })}
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

            <ButtonApp
              text="Login   "
              mstyle={{ width: "100%", marginTop: dimens.space_small }}
              onPress={() => this.loginUserAcount()}
            />

             <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                this.login();
              }}
            >
              <Text style={[mstyles.tvLargeBold, { color: '#13B9B4' }]}>
                Register >
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
    login(){
        this.props.navigation.navigate('Register');
    }


    loginUserAcount() {
        Keyboard.dismiss();
        if (this.state.validate()) {
            this.setState({ isLoading: true });
            const url = "username="+this.state.name+"&password="+this.state.password;
            userLogin(url,{}, (flag, response, msg) => {
                this.setState({ isLoading: false });
                if (flag) {
                  console.log("111--"+JSON.stringify(response));
                    if (response !== undefined) {
                        try {

								this.props.updateUserData({isloggedIn: true, userData:  response, sToken: response.id});

								this.setState({isloggedIn:true});
								console.log(this.props);

						} catch (error) {
                          console.log('userLogin', error);
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
      alignItems: "center",
      justifyContent: "center",
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


  export default connect(mapStateToProps, mapDispatchToProps)(Login);

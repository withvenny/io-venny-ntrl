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
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    PermissionsAndroid
  } from "react-native";

  import React, {Component} from 'react';
  import SplashScreen from 'react-native-splash-screen';
  import dimens, { sdp } from "./values/dimens";
  import mstyles from "./values/styles";
  import ButtonApp from "./uiComponents/ButtonApp";
  import { Actions } from 'react-native-router-flux';
  import * as Constant from './constant';
  import * as Common from './common_function';
  import { getQuotesData } from './services/user';
  import { getCommentsData } from './services/user';
  import { postQuotes, createNewPost } from './services/user';
  import yes from "./images/yes.png";
  import record from "./images/record.png";
  import stop_record from "./images/stop_record.png";
  import no from "./images/no.png";
  import * as Database from './database';
  import SharedManager from './sharedmanager';
  import Tooltip from 'react-native-walkthrough-tooltip';
  import { EventRegister } from 'react-native-event-listeners';
  import { connect } from 'react-redux'; //Redux support

  import {
    NetInfo
} from 'react-native';
import {
    postDataComment, postDataWithImage, getData
} from './services/index';

import Expo, { Asset, FileSystem, Font, Permissions, Location, Constants } from 'expo';
import { Audio } from 'expo-av';
import { RNS3 } from 'react-native-aws3';

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

  type Props = {};
  let audioRecorderPlayer;
    const RECORDING_OPTIONS_PRESET_LOW_QUALITY: RecordingOptions = {
      android: {
		  extension: '.m4a',
		   outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
		   audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
		   sampleRate: 44100,
		   numberOfChannels: 2,
		   bitRate: 128000,
      },
      ios: {
		 extension: '.m4a',
	     outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
	     audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
	     sampleRate: 44100,
	     numberOfChannels: 1,
	     bitRate: 96400,
	     linearPCMBitDepth: 16,
	     linearPCMIsBigEndian: false,
	     linearPCMIsFloat: false
      }
  };


class Quotes extends Component {

    constructor(props) {
      super(props);
      _this = this;

		this.recording = null;
		this.sound = null;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;

      	this.state = {
	      	user:{},
	        comment:  "",
			location:null,
			isNew:this.props.userData.isNew,
			show_record_button_tool_tip:false,
            processing:false,
	        isLoading: false,
	        data:[],
	        comments:[],
	        index:0,
	        isStart:true,
			currentTime: 0.0,
			recording: false,
            previewFinished:false,
			paused: false,
			stoppedRecording: false,
			finished: false,
			audioPath: '',
			hasPermission: undefined,
			status:"",
			filePath:"",
			fileName:"",
			haveRecordingPermissions: false,
			isPlaybackAllowed: false,
			muted: false,
			soundPosition: null,
			soundDuration: null,
			recordingDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isRecording: false,
            qouteStatus:'0',
			fontLoaded: false,
			shouldCorrectPitch: true,
			volume: 1.0,
			rate: 1.0,
			log1:'',
			log2:'',
			log3:'',
	        validate: () => {
	            let message = '';

	            if (this.state.comment === '') {
	                message = 'Please enter comment.';
	            }
	            if (message === '') {
	                return true;
	            }

	            Common.showAlertWithDefaultTitle(message);
	            return false;
	        }
        };

	   this.recordingSettings = RECORDING_OPTIONS_PRESET_LOW_QUALITY;
	   this._startRecording = this._startRecording.bind(this);
	}



    async componentDidMount(){


       	this.setState({
         	user: this.props.userData,
            qouteStatus: await AsyncStorage.getItem('IS_ALL')
   		});

		this._askForPermissions();


        this.getQuotes();
    }

	_askForPermissions = async () => {
	    const audio_response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
	    const location_response = await Permissions.askAsync(Permissions.LOCATION);
	    this.setState({
	      haveRecordingPermissions: audio_response.status === 'granted',
	      haveLocationPermissions: location_response.status === 'granted',
	    });

	    let location = await Location.getCurrentPositionAsync({});
	    this.setState({ location });
  	};


	_updateScreenForRecordingStatus = status => {

		console.log('recorder', status);

		if (status.canRecord) {
			console.log('canRecord', status.canRecord);
			this.setState({
				isRecording: true,
				recordingDuration: status.durationMillis,
			});
		} else if (status.isDoneRecording) {
				console.log('isDoneRecording', status.isDoneRecording);
			this.setState({
				isRecording: false,
				recordingDuration: status.durationMillis,
			});

		}
	};



    playSound = async () => {


        Audio.setAudioModeAsync({
		  allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: true,
        });

        this.audioPlayer = new Audio.Sound();

        this.audioPlayer.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
        try {
          await this.audioPlayer.unloadAsync()
          await this.audioPlayer.loadAsync({uri:'https://s3.us-east-2.amazonaws.com/reactnatively/testing-1-2-3.mp3'});
          await this.audioPlayer.playAsync();
        } catch (err) {
			console.log('audio_player_error', err);
            Common.showAlertWithDefaultTitle(`Couldn't Play audio`);
        }


    }


	async _startRecording() {
            console.log('player', '3');

		   try{
               if (this.recording !== null) {
	   	         this.recording.setOnRecordingStatusUpdate(null);
	   	         this.recording = null;
	   	       }

            console.log('player', '4');
			   const recording = new Audio.Recording();

			   await recording.prepareToRecordAsync(this.recordingSettings);

			   recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

			   this.recording = recording;
			   await this.recording.startAsync();


		   }catch(error){

	   			console.log('player_error', error);
 		   		Common.showAlertWithDefaultTitle("Something went wrong");
		   }

     }

    onPlaybackStatusUpdate = async(status) =>{

        console.log('player', status);
        if(status.didJustFinish){

			try {
                console.log('player', '1');
				await this.audioPlayer.stopAsync();;
				await this.audioPlayer.unloadAsync();

				await Audio.setAudioModeAsync({
	                  allowsRecordingIOS: true,
	                  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
	                  playsInSilentModeIOS: true,
	                  shouldDuckAndroid: true,
	                  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
	            }).then(
                    ()=>{
                        console.log('player', '2');
		                this._startRecording();

                    }

                    )


			}catch(error){

				console.log('error1',error);
			}


        }

    }


	async _stopRecording() {

	    try {
	      	await this.recording.stopAndUnloadAsync();
		  	const info = await FileSystem.getInfoAsync(this.recording.getURI());
	  		this.state.log1 = JSON.stringify(info);
	      	console.log(`FILE INFO: ${JSON.stringify(info)}`);
	  		this.uploadFile(info.uri);
	    } catch (error) {
			Common.showAlertWithDefaultTitle("Something went wrong");
	    }


	}

	_onRecordPressed = () => {
		if (this.state.isRecording) {
			this._stopRecording();
		} else {
			if(this.state.haveRecordingPermissions){
				this.playSound();
				this.setState({log1: 'audio button pressed'});
			}else{
				Common.showAlertWithDefaultTitle('Please provide recording permissions');
			}

		}
	};


	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = number => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};

		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}




	_getRecordingTimestamp() {
		if (this.state.recordingDuration != null) {
		 	return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
		}
		return `${this._getMMSSFromMillis(0)}`;
	}



    setQuoteText(){

        if(this.state.data){
            if(this.state.data.length > 0){
                console.log("1111000"+this.state.data[this.state.index].text);
                return this.state.data[this.state.index].text ;
            }else{
                return "";
            }
        }else{
            return "";
        }
    }



    render() {
        const {status} = this.state;
        if(this.previewFinished){
            this._startRecording();
        }
      return (
        <View style={{flex:1}}>


        <View style={styles.container}>
       <View style={{ flex : 1, marginBottom : 60 }}>
          <ScrollView >
          <View style={{ flexDirection: "column" }}>
          <Text style={styles.welcome}> {"Welcome " + this.state.user.fullname}</Text>
          <Text style={styles.instructions}>{this.setQuoteText()}</Text>
          <Text style={styles.instructionsrecord}>{!this.state.isRecording?"Not Recording...":this._getRecordingTimestamp()}</Text>

        <View  style={{
            paddingVertical: 5
            }}>
            <View
                style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex : 1,
                marginTop: dimens.space_small
                }}
            >
            {
				!this.state.isRecording  ?

	            <TouchableOpacity
	                style={{
	                alignSelf: "center",
	                marginRight:dimens.space_large
	                }}
	                onPress={this._onRecordPressed}

					/*console.log(Date.parse(new Date()));
                    const filename = Platform.select({
                        ios: this.state.data[this.state.index].id+"_"+Date.parse(new Date())+"_"+this.state.user.id+'.m4a',
                        android:this.state.data[this.state.index].id+"_"+Date.parse(new Date())+"_"+this.state.user.id+'.mp4',
                    });
                    const path = Platform.select({
                        ios: this.state.audioPath+"/"+filename,
                        android:this.state.audioPath+"/"+filename
                    });

                    this.setState({
                        fileName:filename,
                        filePath : path
                    });*/


            >
            <Image
                style={{
                    width: 200,
                    height: 200
                    }}
                    source={record}
            />
          </TouchableOpacity>
          :
          <TouchableOpacity
              style={{
              alignSelf: "center",
              marginRight:dimens.space_large
              }}
              onPress={this._onRecordPressed}
          >
          <Image
              style={{
                  width: 200,
                  height: 200
                  }}
                  source={stop_record}
          />
        </TouchableOpacity>
            }



        </View>
        </View>
		  </View>
        </ScrollView>
        </View>
       <View
       style = {styles.bottomView}>
    <View
      style = {{width : "100%",
       height:0.5,
       backgroundColor:"#13B9B4"}}>
       </View>
       <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity
              style={{padding : 10}}
              onPress={() => {
                this.logout();
              }}
            >

                <Text style={styles.welcomeone}>
                    logout >
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding : 10}}
              onPress={() => {
                this.props.navigation.navigate('ImportContact')
              }}
            >

                <Text style={styles.welcomeone}>
                    Contacts
                </Text>
            </TouchableOpacity>
			<Tooltip
			  animated
			  isVisible={this.state.show_record_button_tool_tip}
			  content={<Text>Check this out!</Text>}
			  placement="You can record audio from here"
			  onClose={() => this.setState({ toolTipVisible: false })}
			>
	            <TouchableOpacity
	              style={{padding : 10}}
	              onPress={() => {
	                this.props.navigation.navigate('Posts')
	              }}
	            >

	                <Text style={styles.welcomeone}>
	                    My Records
	                </Text>
	            </TouchableOpacity>
			</Tooltip>
        </View>


    </View>



        </View>
		{
			this.state.isRecording ?
			<View style={{position:'absolute', top:0, left:0, right:0,  backgroundColor:'yellow'}}>
				<Text style={{color:'#000', alignSelf:'center', padding:10}}>Device is Recording</Text>
			</View>
			:
			<View/>
		}
            {

                this.state.processing ?
                <View
                    style={{position: 'absolute', top:0, bottom:0, height:'100%', width:'100%', flexDirection:'column', backgroundColor:'#0000001A', justifyContent:'center', alignItems:'center'}}
                >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                :
                <View/>
            }
        </View>
      );
    }



    getQuotes() {
        Keyboard.dismiss();


            const url = "";
            getQuotesData(url, (flag, response, msg) => {

				console.log('getQuotes', response);
                if (flag) {
                    if (response !== undefined) {
                        try {
                           _this.setState({
                               data:response[0].results,
                               index:0
                           });

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

    uploadFile(uri){

        this.setState({
             processing: true,
        });

        const file = {
            uri: uri,
            name: this.state.data[this.state.index].id+"_"+Date.parse(new Date())+"_"+this.state.user.id+'.mp4',
            type: "audio/*"
          }
           const options = {
             keyPrefix: "uploads/",
             bucket: "reactnatively",
             region: "us-east-2",
             accessKey: "AKIAIUY6HK3C4BLK2NUA",
             secretKey: "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",
             successActionStatus: 201
           }


          RNS3.put(file, options).then(response => {


            if (response.status !== 201){
                console.log(response);
                this.setState({
                     processing: false,
                });
                Common.showAlertwithAction(Constant.PROJECTNAME, "Failed to upload image to S3" );
                throw new Error("Failed to upload image to S3");
            }else{

                console.log(response.body);
                console.log(file.name);
                this.createpost(file.name);
            }

            let indexincre = _this.state.index+1;
                if(_this.state.data.length > indexincre && this.state.qouteStatus !== '0'){
                    _this.setState({
                        index:indexincre,
                        fileName : "",
                        filePath: ""
                    });
                }else{
                    _this.setState({
                        index:0,
                        fileName : "",
                        filePath: ""
                    });
                }
          });
    }



    createpost(file_path) {
        Keyboard.dismiss();

        const url = "altitude=" + this.state.location.coords.altitude + "&latitude=" + this.state.location.coords.latitude + "&longitude=" + this.state.location.coords.longitude + "&path="+file_path+'&text=AudioFile&author='+this.props.userData.id;

        console.log('userToken is', this.props.userData.token);
        createNewPost(url, {}, this.props.userData.token, (flag, response, postings) => {
            if (flag) {
                    if (postings !== undefined) {
                        try {

                            this.setState({
                    	         processing: false,
                            });
                        } catch (error) {
                            this.setState({
                                 processing: false,
                            });
                            console.log('postings',error);
                        }
                    }
                } else {
                    this.setState({
                         processing: false,
                    });
                    if (response !== undefined && response !== null && response === 501) {
                        Common.showAlertwithAction(Constant.PROJECTNAME, msg, actions);
                    } else {
                        Common.showAlertWithDefaultTitle(msg);
                    }
                }
            }
        );
    }

    logout() {
        const actions = [
          { text: 'No', onPress: () => console.log('OK Pressed') },
          {
            text: 'Yes',
            onPress: () => {


				this.props.updateUserData({isloggedIn:false, userData:{}, sToken:null});

				this.setState({isloggedIn:false});

            }
          }
        ];
        Common.showAlertwithAction(Constant.PROJECTNAME, Constant.Messages.logout_message, actions);
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


  export default connect(mapStateToProps, mapDispatchToProps)(Quotes);

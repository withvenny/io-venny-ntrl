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
import React, {Component} from 'react';
import { connect } from 'react-redux'; //Redux support
import { getPostsData } from './services/user';
import { Asset, Audio, Font, Video } from 'expo';
  import * as Common from './common_function';
var audioPlayer;

class PostDetails extends Component {

    constructor(props) {
      super(props);

  		Audio.setIsEnabledAsync(true);
      this.state = {
          posts:[],
          current_post:this.props.navigation.state.params.current_post,
		  current_post_index:this.props.navigation.state.params.current_post_index,
          player_post_id:null,
      }
      this.audioPlayer = new Audio.Sound();
	}

    componentDidMount(){


        Audio.setAudioModeAsync({
		  allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: true,
        });

        this.getPosts();

  	};

    getPosts() {
        Keyboard.dismiss();
        const url = "author="+this.props.userData.id+"&type=mp4";
        getPostsData(url, (flag, response, postings) => {

            console.log('text', postings);
            if (flag) {
                if (postings !== undefined) {
                    try {

                        this.setState({
                            posts:postings
                        });
                        console.log('postings', postings);
                    } catch (error) {
                    }
                }
            } else {
                if (response !== undefined && response !== null && response === 501) {
                    Common.showAlertwithAction(Constant.PROJECTNAME, msg, actions);
                } else {
                    Common.showAlertWithDefaultTitle(msg);
                }
            }
        },
            this.props.userData.token
        );
    }

    _renderItem = ({item, index}) => (
        <TouchableOpacity onPress = {()=>
			{


				this.setState({current_post: item, current_post_index:index})

				this.playSound(this.state.current_post)

			}
		}


            style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomWidth:1,backgroundColor:'#fff', borderColor:'#ccc',padding:10}}>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>ID: {item.text}</Text>
                <Text>{Common.formatNewTime(item.date)}</Text>
            </View>

            <View style={{width:64, height:64}}
                >
                {
                    (item.id !== this.state.player_post_id) ?
                        <Image source = {require('./images/play.png')} tintColor= '#13B9B4' style={{width:64, height:64, tintColor:'#13B9B4'}}/>
                    :
                        <Image source = {require('./images/pause.png')} tintColor= '#13B9B4' style={{width:64, height:64, tintColor:'#13B9B4'}}/>

                }
            </View>
        </TouchableOpacity>
    );

    render() {
        console.log(this.state.current_post);
        return (
            <View style={{flex:1, backgroundColor:'#fff'}}>

                <View style={{height:52, padding:5, flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#13B9B4', backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
                            <Image source={require('./images/left-arrow.png')} tintColor= '#13B9B4' style={{height:15, width:15, tintColor:'#13B9B4'}}/>
                        </TouchableOpacity>

                        <Text style={{alignSelf:'center', color:'#13B9B4'}} onPress={()=>this.props.navigation.navigate('Quotes')}>Home</Text>
                    </View>
                    <Text style={{position:'absolute', left:'46%', color:'#13B9B4', fontWeight: 'bold'}}>Id: {this.state.current_post.id}</Text>
                </View>

                <Text style={{marginTop:20, paddingLeft:20, paddingRight:20,  fontSize:22, color:'#13B9B4', fontWeight:'bold' }}>{this.state.current_post.text}</Text>
                <Text style={{marginTop:20, paddingLeft:20, paddingRight:20, fontSize:16, color:'#13B9B4' }}>Date: {Common.formatNewTime(this.state.current_post.date)}</Text>
				<View style={{flexDirection:'row', justifyContent:'flex-start', alignSelf:'center', marginTop:40, marginBottom:40}}>
					{
						(this.state.current_post_index > 0)?
						<TouchableOpacity style={{margin:20}} onPress = {()=>
							{


								this.setState({current_post:this.state.posts[this.state.current_post_index - 1 ], current_post_index:this.state.current_post_index - 1})
								this.playSound(this.state.current_post)

							}
						}>
							<Image source = {require('./images/left.png')} tintColor= '#13B9B4'  style={{width:64, height:64, tintColor:'#13B9B4'}}/>
						</TouchableOpacity>
						:
						<View  style={{width:64, height:64, margin:20}}/>


					}


						<TouchableOpacity style={{margin:20}} onPress={()=>this.playSound(this.state.current_post)}
							>
							{
								(this.state.current_post.id !== this.state.player_post_id) ?
									<Image source = {require('./images/play.png')} tintColor= '#13B9B4'  style={{width:64, height:64, tintColor:'#13B9B4'}}/>
								:
									<Image source = {require('./images/pause.png')} tintColor= '#13B9B4'  style={{width:64, height:64, tintColor:'#13B9B4'}}/>

							}
						</TouchableOpacity>
						{
							(this.state.current_post_index < this.state.posts.length)?
							<TouchableOpacity  style={{margin:20}} onPress = {()=>
								{


								this.setState({current_post:this.state.posts[this.state.current_post_index + 1 ], current_post_index:this.state.current_post_index + 1});
								this.playSound(this.state.current_post);

								}
							}><Image source = {require('./images/right.png')} tintColor= '#13B9B4'  style={{width:64, height:64, tintColor:'#13B9B4'}}/>
							</TouchableOpacity>
							:
							<View  style={{width:64, height:64, margin:20}}/>

						}


				</View>

                {
                    this.state.posts.length > 0  ?
                    <FlatList
                        data={this.state.posts}
                        extraData={this.state}
                        renderItem={this._renderItem}
                    />
                    :
                    <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <Text>No Records</Text>
                    </View>

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


  export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

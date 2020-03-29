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

class Posts extends Component {

    constructor(props) {
      super(props);
      this.state = {
          posts:[],
          player_post_id:null,
      }
      this.audioPlayer = new Audio.Sound();
	}

    componentDidMount(){

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
        <TouchableOpacity


            style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomWidth:1,backgroundColor:'#fff', borderColor:'#ccc',padding:10}}>
            <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>{item.text}</Text>
                <Text>{Common.formatNewTime(item.date)}</Text>
            </View>

			<View style={{flexDirection:'row'}}>
	            <TouchableOpacity style={{width:64, height:64, marginRight:10}}
					onPress = {()=>    this.props.navigation.navigate('SinglePost', {'current_post':item, 'current_post_index':index})}
	                >
	                {
	                    (item.id !== this.state.player_post_id) ?
	                        <Image source = {require('./images/play.png')} tintColor= '#13B9B4' style={{width:64, height:64, tintColor:'#13B9B4'}}/>
	                    :
	                        <Image source = {require('./images/pause.png')} tintColor= '#13B9B4' style={{width:64, height:64, tintColor:'#13B9B4'}}/>

	                }
	            </TouchableOpacity>

	            <TouchableOpacity style={{width:64, height:64, alignItems:'center'}}
					onPress = {()=>    this.props.navigation.navigate('PostDetails', {'current_post':item, 'current_post_index':index})}
	                >

	                <Image source = {require('./images/playlist.png')} tintColor= '#13B9B4' style={{width:32, height:32, alignSelf:'center',tintColor:'#13B9B4'}}/>

	            </TouchableOpacity>
			</View>
        </TouchableOpacity>
    );

    render() {
        console.log(this.state.posts);
        return (
            <View style={{flex:1}}>
                <View style={{height:52, padding:5, flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderColor:'#13B9B4', backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
                            <Image source={require('./images/left-arrow.png')} style={{height:15, width:15}}/>
                        </TouchableOpacity>

                        <Text style={{alignSelf:'center', color:'#13B9B4'}} onPress={()=>this.props.navigation.goBack()}>Home</Text>
                    </View>
                    <Text style={{position:'absolute', left:'44%', color:'#13B9B4', fontWeight: 'bold'}}>Audio Files</Text>
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
        //this.setState({player_post_id:item.id})
        console.log('audio_path', item);
        try {
          await this.audioPlayer.unloadAsync()
          await this.audioPlayer.loadAsync({uri:item.path});
          await this.audioPlayer.playAsync();
        } catch (err) {
          Common.showAlertWithDefaultTitle("Audio currupted");
          console.warn("Couldn't Play audio", err)
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


  export default connect(mapStateToProps, mapDispatchToProps)(Posts);

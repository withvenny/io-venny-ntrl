import React, { Component } from 'react';
import { View, Text, Platform, AsyncStorage } from 'react-native';
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux';
import { responsiveScreen } from 'react-native-responsive-dimensions';
import { EventRegister } from 'react-native-event-listeners';
import { getRootNavigator } from 'src/rootNavigator';
import { connect } from 'react-redux'; //Redux support


import SharedManager from './sharedmanager';

const Device = require('react-native-device-detection');


class RouterComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
			sToken:null,
            logged: false,
            loading: true,
			isNew : true
        };
    }

    UNSAFE_componentWillMount() {
        this.listener = EventRegister.addEventListener('refreshRootRounter', () => {
            this.setState({ logged: false });
            Actions.auth({ type: 'reset' });
        });
    }

    async componentDidMount() {
        console.log('come on this screen on click on app icon');
		if (!this._unmounted) {
			//Get value of stoken from storage
			this.setState({ sToken: await AsyncStorage.getItem('STOKEN_KEY') });
			this.setState({ isNew: await AsyncStorage.getItem('IS_NEW_KEY') });
			this.setState({ userData: JSON.parse(await AsyncStorage.getItem('USER_DATA')) });
		}


		//check if device does not has stoken
		if( this.state.sToken !== null ){
        	this.props.updateUserData({isloggedIn: true, userData:  this.state.userData, sToken: this.state.sToken, isNew : this.state.isNew});
		}else {
			this.props.updateUserData({isloggedIn: false, userData:  {}, sToken: null, isNew : this.state.isNew});
		}
    }


    render() {



            // Call getRootNavigator function that decides which screen to display on basis of state.loggedIn variable
	        const RootNavigator = getRootNavigator(this.props.isloggedIn, this.state.isNew);
	        return (

                    <RootNavigator/>

            );

    }
}
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


export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

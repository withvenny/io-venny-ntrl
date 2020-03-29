
import * as Database from './database';
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
export default class SharedManager {

    static myInstance = null;

    deviceId = 0


    /**
     * @returns {SharedManager}
     */
    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new SharedManager();
        }

        return this.myInstance;
    }

    getDeviceID() {
        return this.deviceId;
    }

    setDeviceID(id) {
        this.deviceId = id;
    }

    getLogged() {
        return this.isLogged;
    }

    setLogged(value) {
        this.isLogged = value;
    }


    checkInternet() {
        return this.isConnect === undefined ? true : this.isConnect;
    }

    setInternet(connect) {
        this.isConnect = connect;
    }

    getUserInfo() {
        return this.userInfo;
    }

    async setUserInfo() {
		console.log('setUserInfo');
        let response;
		await AsyncStorage.getItem('User')
		.then(value => response = value)
		.then(
			function(response){

				console.log('---', response);
				if ((response !== undefined ) && (response !== null ) && (response.length > 0)) {
				console.log(JSON.parse(response));
		            console.log('exist user');
		                this.userInfo = response;
		        } else {
		            this.userInfo = undefined;
		        }

			}
		)

    }
}

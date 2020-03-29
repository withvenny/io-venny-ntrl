import React from 'react';
import { Alert, TouchableOpacity, Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Constant from './constant';
import Moment from 'moment';

//
export function showAlertWithDefaultTitle(message) {
    Alert.alert(
        Constant.PROJECTNAME,
        message,
        [
            { text: 'OK', onPress: () => console.log('OK presionado') }
        ],
        { cancelable: false });
}

//
export function showAlert(title, message) {
    Alert.alert(
        title,
        message,
        [
            { text: 'OK', onPress: () => console.log('OK presionado') }
        ],
        { cancelable: false });
}

//
export function formatNewTime(string) {
		console.log(string);
        return Moment(string, 'YYYY-MM-DD hh:mm:ss').format('Do of MMM YY, h:mm A');
}

//
export function showAlertwithAction(title, message, actions) {
    Alert.alert(
        title,
        message,
        actions,
        { cancelable: false });
}

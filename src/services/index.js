import { EventRegister } from 'react-native-event-listeners';
import * as Common from 'src/common_function';
import * as Constant from 'src/constant';
import * as Database from 'src/database';
import SharedManager from 'src/sharedmanager';
import { AsyncStorage } from 'react-native';

//
const getHeaders = (token) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    try {
        if (token !== undefined && token !== null) {
            headers['Authorization'] = 'Bearer ' + token;
        }

    } catch (error) {
        console.log(error);
    }
    return headers;
};

//
const getImageHeader = async() => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;'
    };

    try {
		let response = await AsyncStorage.getItem('User');

        if (response !== undefined && response.length > 0) {
            headers['Authorization'] = 'Bearer ' + response[0].token;
        }
    } catch (errorr) {
        console.log(error);
    }

    return headers;
};

//
export const postData = (methodName, postValue, token) => {

    console.log('methodName', methodName);
    console.log('postValue', postValue);
    console.log('postValue', JSON.stringify(postValue));
    console.log('token', token);
    console.log('url', Constant.BASE_URL+methodName);


    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postValue)
    }).then(response => {
        // debugger;
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }

    }).then((responseJson) => {

        if (responseJson !== undefined) {
            return responseJson;
        }
    })
        .catch((error) => {

            console.log('post', error);
            return error;

        });
};

//
export const postDataComment = (methodName, postValue, token) => {
    console.log(`${Constant.BASE_URL}${methodName}`);
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify(postValue)
    }).then(response => {
        console.log(JSON.stringify(response));
            return response.json();
    }).then((responseJson) => {
        console.log(JSON.stringify(responseJson));
            return responseJson;
    })
        .catch((error) => {
            return error;
            console.error(error);

        });
};

//
export const getData = (methodName, token) => {
    console.log(`${Constant.BASE_URL}${methodName}`);
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'GET',
        headers: getHeaders(token),
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
        if (responseJson !== undefined && responseJson.code === 401) {
            logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);
        });
};

//
export const postDataWithImage = (methodName, postValue) => {

    console.log(`${Constant.BASE_URL}${methodName}`);
    console.log(getImageHeader());
    console.log(postValue);
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getImageHeader(),
        body: postValue
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
        if (responseJson !== undefined && responseJson.code === 401) {
            logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);
        });
};

//
const logoutDeleteCase = (msg) => {
    const actions = [
        {
            text: 'Ok',
            onPress: () => {
				Database.removeDataFromStorage('User');

				SharedManager.getInstance().setUserInfo();

				EventRegister.emit('refreshRootRounter', 'logout add');
            }
        }
    ];
    Common.showAlertwithAction(Constant.PROJECTNAME, msg, actions);
};

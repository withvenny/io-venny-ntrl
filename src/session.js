'use strict';

import {getDataFromStorage} from './database';
import {setDataInStorage} from './database';
import {removeDataFromStorage} from './database';


let Session = {

    //delete stoken from storage (AsyncStorage)
    flushStoken : function() {
        return removeDataFromStorage('STOKEN_KEY');
    },

    //Save stoken in storage (AsyncStorage)
    setStoken : function(stoken_value) {
        return setDataInStorage('STOKEN_KEY', stoken_value);
    },

    //Save status in storage (AsyncStorage)
    setUserStatus : function(status) {
        console.log('status_from_session', status);
        return setDataInStorage('IS_NEW', status);
    },

    //Save status in storage (AsyncStorage)
    setQuoteStatus : function(status){
        console.log('status_from_session', status);
        return setDataInStorage('IS_ALL', status);
    },

    //Delete user data from storage (AsyncStorage)
    flushUserData : function() {
        return removeDataFromStorage('USER_DATA');
    },

    //Delete user data from storage (AsyncStorage)
    flushUserStatus : function() {
        return removeDataFromStorage('IS_NEW');
    },

    //Set user data in storage (AsyncStorage)
    setUserData : function(user_data) {
        return setDataInStorage('USER_DATA', JSON.stringify(user_data));
    }

};

export default Session;

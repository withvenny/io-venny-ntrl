import { AsyncStorage } from 'react-native';

// Get data from async storage
const getDataFromStorage = async(key) => {
  try {
       let result;
       await AsyncStorage.getItem(key).then(value => result = value);

       return result;
    } catch(error) {
        console.log('AsyncStorage Error', error);
    }
}

//Insert data in async storage
const setDataInStorage = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(error) {
        console.log('AsyncStorage Error', error);
    }
}

//
const removeDataFromStorage = async(key) =>{

    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }

}

//
module.exports = {
    getDataFromStorage,
    setDataInStorage,
    removeDataFromStorage
};

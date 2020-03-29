import {
    NetInfo
} from 'react-native';
import * as Constant from '../constant';

import {
    postData, postDataWithImage, getData
} from './index';

//
export const userLogin = (url,postValue, callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            postData(Constant.ApiMethods.login+url, postValue)
                .then(response => {
                    if (response !== undefined) {
                        if (response.status === "200") {
                            callback(true, response, response.message);
                        } else {
                            callback(false, response.status, response.message);
                        }
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e => callback(false, null, Constant.Messages.server_error)));
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const getContactList = (url,callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            getData(Constant.ApiMethods.addContact+url)
                .then(response => {
                    if (response !== undefined) {
                        callback(true, response, response);
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e) => {
                    callback(false, null, Constant.Messages.server_error);
                });
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const addContacts = (url,postValue, callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            postData(Constant.ApiMethods.addContact+url, postValue)
                .then(response => {
                    if (response !== undefined) {
                        if (response.status === "200") {
                            callback(true, response, response.message);
                        } else {
                            callback(false, response.status, response.message);
                        }
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e => callback(false, null, Constant.Messages.server_error)));
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const userRegistration = (url,postValue, callback) => {

	console.log(url, postValue);

    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            postData(Constant.ApiMethods.regisration+url, postValue)
                .then(response => {

                    if (response !== undefined) {
						console.log(response);
                        if (response.status === "200") {
                            callback(true, response, response.message);
                        } else {
                            callback(false, null, response.message);
                        }
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e => callback(false, null, Constant.Messages.server_error)));
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const passwordReset = (url,postValue, callback) => {

	console.log(url, postValue);

    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            postData(Constant.ApiMethods.reset+url, postValue)
                .then(response => {

                    if (response !== undefined) {
						console.log(response);
                        if (response.status === "200") {
                            callback(true, response, response.message);
                        } else {
                            callback(false, null, response.message);
                        }
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e => callback(false, null, Constant.Messages.server_error)));
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const postQuotes = (url,postValue, callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            postData(Constant.ApiMethods.postQuotes+url, postValue)
                .then(response => {

                    if (response !== undefined) {
                        console.log("RES---"+response);
                        console.log("RESO---"+response.message);
                            callback(true, response, response.message);
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e) => {
                    console.log("Api call error");
                    callback(false, null, Constant.Messages.server_error);
                });
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const getPostsData = (url,callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            getData(Constant.ApiMethods.postQuotes+url)
                .then(response => {
                    if (response !== undefined) {
                        callback(true, response, response.postings);
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e) => {
                    callback(false, null, Constant.Messages.server_error);
                });
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const createNewPost = (url, postValue, token, callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            postData(Constant.ApiMethods.createPost+url, postValue, token)
                .then(response => {
                    console.log("Api call success", response+"");
                    if (response !== undefined) {

                        callback(true, response, response);
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e) => {
                    console.log("Api call error");
                    callback(false, null, Constant.Messages.server_error);
                });
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const getQuotesData = (url, callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            getData(Constant.ApiMethods.getQuotes+url)
                .then(response => {
                     debugger;
                    if (response !== undefined) {
                        if (response[0].status === "SUCCESS") {
                            callback(true, response, response.message);
                        } else {
                            callback(false, null, response.message);
                        }
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e => callback(false, null, Constant.Messages.server_error)));
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

//
export const getCommentsData = (url, callback) => {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if (isConnected) {
            getData(Constant.ApiMethods.getcomments+url)
                .then(response => {
                     debugger;
                    if (response !== undefined) {
                        if (response) {
                            callback(true, response, response.message);
                        } else {
                            callback(false, null, response.message);
                        }
                    }else {
                        callback(false, null, Constant.Messages.server_error);
                    }
                })
                .catch((e => callback(false, null, Constant.Messages.server_error)));
        } else {
            callback(false, null, Constant.Messages.no_internet);
        }
    });
};

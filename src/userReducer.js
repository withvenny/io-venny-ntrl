import Session from './session';

const UserReducer = (state = {isloggedIn: false, userData: {}, sToken: null, isNew: true}, action) => {

	switch (action.type) {

        case 'UPDATE_USER_DATA':

			console.log('UserReducer');
		    // If command is set user loggedIn (login_state = false) then set stoken and userdata variable to storage
			if(action.payload.isloggedIn == true){

		    	Session.setStoken(action.payload.sToken);
		    	Session.setUserData(action.payload.userData);
		    } else{
		    	// If command is set user loggedOut (login_state = false) then delete old stoken and userdata variable from storage
		    	Session.flushStoken();
		    	Session.flushUserData();
		    	Session.flushUserStatus();
		    }

		    return Object.assign({}, state, action.payload);

		default:
	    	return state;
	}

}


export default UserReducer;

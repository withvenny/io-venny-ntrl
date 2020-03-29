import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoggedOutNavigator from 'src/LoggedOut';
import LoggedInNavigator from 'src/LoggedIn';


/*
export const getRootNavigator = (loggedIn = false) => createSwitchNavigator(
    {
        LoggedOut: {
            screen: LoggedOutNavigator
        },
        LoggedIn: {
            screen: LoggedInNavigator
        }
    },
    {
        initialRouteName: !loggedIn ?  'LoggedOut' : 'LoggedIn'
        //initialRouteName: 'OnBoarding'
    }
);
*/
export const getRootNavigator = (loggedIn = false) => createAppContainer(
    createSwitchNavigator(
        {
            LoggedOut: {
                screen: LoggedOutNavigator
            },
            LoggedIn: {
                screen: LoggedInNavigator
            }
        },
        {
            initialRouteName: !loggedIn ?  'LoggedOut' : 'LoggedIn'
            //initialRouteName: 'OnBoarding'
        }
    )
);
  
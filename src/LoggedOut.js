import { createStackNavigator } from 'react-navigation-stack'
import Login from 'src/Login';
import Register from 'src/Register';


const LoggedOutNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            navigationOptions: {
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0
                }
            }
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null,
            navigationOptions: {
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0
                }
            }
        }
    }
});

export default LoggedOutNavigator

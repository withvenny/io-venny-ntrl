import { createStackNavigator } from 'react-navigation-stack'

import Quotes from './Quotes';
import Posts from './Posts';
import PostDetails from './PostDetails';
import OnBoarding from './OnBoarding';
import SinglePost from './SinglePost';
import ImportContact from './ImportContact';
import AddContact from './AddContact';
import Contacts from './Contacts';

const LoggedOutNavigator = createStackNavigator({
    OnBoarding: {
        screen: OnBoarding,
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
    AddContact: {
        screen: AddContact,
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
    Contacts: {
        screen: Contacts,
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
    ImportContact: {
        screen: ImportContact,
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
    Quotes: {
        screen: Quotes,
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
    Posts: {
        screen: Posts,
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
    PostDetails: {
        screen: PostDetails,
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
    SinglePost: {
        screen: SinglePost,
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

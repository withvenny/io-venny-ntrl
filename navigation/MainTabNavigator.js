import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ThreadsScreen from '../screens/ThreadsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ActionBarScreen from '../screens/ActionBarScreen';

const config = Platform.select({web: { headerMode: 'screen' },default: {},});

const HomeStack = createStackNavigator({Feed: FeedScreen,},config);
const SearchStack = createStackNavigator({Discover: DiscoverScreen,},config);
const InboxStack = createStackNavigator({Threads: ThreadsScreen,},config);
const ProfileStack = createStackNavigator({Profile: ActionBarScreen,},config);

HomeStack.path = '';
SearchStack.path = '';
InboxStack.path = '';
ProfileStack.path = '';

HomeStack.navigationOptions = {tabBarLabel: 'Home', tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused}name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}`: 'md-information-circle' }/>),};
SearchStack.navigationOptions = {tabBarLabel: 'Search',tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />),};
InboxStack.navigationOptions = {tabBarLabel: 'Inbox',tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />),};
ProfileStack.navigationOptions = {tabBarLabel: 'Profile',tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />),};

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  InboxStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;

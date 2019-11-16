import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarIcon from './TabBarIcon';
import Profile from '../screens/Profile';
import Table from '../screens/Table';
import Orders from './../screens/Orders';




const config = Platform.select({
  web: { headerMode: 'screen' },
  //default: {},
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
      width: 0,
      height: 0
    }
  }
});

const HomeStack = createStackNavigator(
  {
    Home: Table
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Tables',
  headerStyle: {
      backgroundColor: '#fff',
      width: 0,
      height: 0
    }
  ,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-star${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const OrderStack = createStackNavigator(
  {
    Orders: Orders,
  },
  config
);

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-options'} />
  ),
  headerMode: 'none'
};

OrderStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
  },
  config,
);


ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-options'} />
  ),
};


ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  OrderStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;

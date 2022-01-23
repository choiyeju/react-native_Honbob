import React, { ReactElement } from 'react';

// import { IC_MASK } from '../../utils/Icons';
import { Image } from 'react-native';

import Two_Board from '../screens/Two_Board';
import Three_Chat from '../screens/Three_Chat';
import Four_Message from '../screens/Four_Message';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

const TabBarIcon = (focused: boolean): ReactElement => {
  return (
    <Image
      style={{
        width: focused ? 24 : 18,
        height: focused ? 24 : 18,
      }}
    //   source={IC_MASK}
    />
  );
};
function Navigator(): ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: ({ focused }): ReactElement => 
          TabBarIcon(focused),
      }}
    >
      <Tab.Screen
        name="Board"
        component={Two_Board}
        options={{
          tabBarLabel: 'Board',
          tabBarIcon: ({ focused }): ReactElement => 
            TabBarIcon(focused),
        }}
      />
      <Tab.Screen name="Chat" component={Three_Chat} />
      <Tab.Screen name="Message" component={Four_Message} />
    </Tab.Navigator>
  );
}
export default Navigator;
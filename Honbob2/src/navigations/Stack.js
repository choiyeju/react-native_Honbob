import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import One_Main from '../screens/One_Main';
import One_Login from '../screens/One_Login';
import One_Login_Email from '../screens/One_Login_Email';
import One_Sign_Special from '../screens/One_Sign_Special';
import One_Sign from '../screens/One_Sign';
import Two_Board from '../screens/Two_Board';
import Navigator from './Navigator';
import Two_Board_Add from '../screens/Two_Board_Add';
import Two_Board_Filter from '../screens/Two_Board_Filter';
import Three_Chat from '../screens/Three_Chat';
import Three_Chat_Private from '../screens/Three_Chat_Private';
import Three_Update from '../screens/Three_Update';
import Four_Message from '../screens/Four_Message';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{headerShown: false}}
                name='Main' component={One_Main} />
            <Stack.Screen
                options={{headerShown: false}}
                name='Login' component={One_Login} />
            <Stack.Screen
                options={{headerShown: false}}
                name='Login_Email' component={One_Login_Email} />
            <Stack.Screen name='Sign_Special' component={One_Sign_Special} />
            <Stack.Screen name='Sign' component={One_Sign} />
            <Stack.Screen
                options={{headerShown: false}}
                name='Navigator' component={Navigator} />
            <Stack.Screen 
                options={{headerShown: false}}
                name='Board' component={Two_Board} />
            <Stack.Screen 
                options={{headerShown: false}}
                name='Board_Add' component={Two_Board_Add} />
            <Stack.Screen name='Board_Filter' component={Two_Board_Filter} />
            <Stack.Screen 
                options={{headerShown: false}}
                name='Chat' component={Three_Chat} />
            <Stack.Screen
                options={{headerShown: false}}
                name='Chat_Private' component={Three_Chat_Private} />
            <Stack.Screen name='Board_Update' component={Three_Update} />
            <Stack.Screen 
                options={{headerShown: false}}
                name='Message' component={Four_Message} />
        </Stack.Navigator>
    );
};

export default StackNavigation;

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";

// import HomeScreen from '../screens/HomeScreen';
// import DetailsScreen from '../screens/DetailsScreen';

// const Stack = createStackNavigator();

// const StackNavigation = () => {
//   return (
//     <Stack.Navigator>
//         <Stack.Screen
//             options={{headerShown: false}} 
//             name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//     </Stack.Navigator>
//   );
// }

// export default StackNavigation;
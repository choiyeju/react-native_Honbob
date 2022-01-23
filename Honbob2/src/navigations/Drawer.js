import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigation from "./Stack";
import Three_Chat_Private from '../screens/Three_Chat_Private';
import One_Sign from "../screens/One_Sign";
import AboutScreen from '../screens/AboutScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
              initialRouteName="Main"
        >
          {/* , {moving: 31, moving2: 4, moving3: "b", moving4: 34} */}
            <Drawer.Screen
              // drawerContent={{moving: 31, moving2: 4, moving3: "b", moving4: 34}}
              name="Main" component={StackNavigation} options={{drawerLabel: 'SIGN', moving: 31, moving2: 4, moving3: "b", moving4: 34}} />
            <Drawer.Screen name="About" component={AboutScreen} options={{drawerLabel: 'ABOUT'}} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;
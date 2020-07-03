import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

import DashboardScreen from './DashboardScreen'
import Logout from './Logout'

const Drawer = createDrawerNavigator()

export default Dashboard = () => {
    return (
        <Drawer.Navigator initialRouteName='Dashboard'>
            <Drawer.Screen name='Dashboard' component={DashboardScreen} />
            <Drawer.Screen name='Logout' component={Logout} />
        </Drawer.Navigator>
    )
}
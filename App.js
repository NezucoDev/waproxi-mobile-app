import 'react-native-gesture-handler'
import React, { useContext, useMemo, useReducer, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import AuthContext from './app/contexts/authContext'
import auth from './app/services/authService'

import WelcomeScreen from './app/screens/WelcomeScreen'
import RegisterScreen from './app/screens/RegisterScreen'
import LoginScreen from './app/screens/LoginScreen'
import Dashboard from './app/screens/Dashboard/Dashboard'


const Stack = createStackNavigator()

export default function App() {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_USER':
                    return {
                        ...prevState,
                        user: action.user,
                        isLoading: false,
                    }
                case 'LOGIN':
                    return {
                        ...prevState,
                        isSignout: false,
                        user: action.user,
                    }
                case 'LOGOUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        user: null,
                    }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            user: null,
        }
    )

    useEffect(() => {
        (async () => {
            const user = await auth.getCurrentUser()
            if (user)
                dispatch({ type: 'RESTORE_USER', user })
        })()
    }, [])

    const authContext = useMemo(
        () => ({
            logIn: async (email, password) => {
                await auth.login(email, password)
                const user = await auth.getCurrentUser()
                dispatch({ type: 'LOGIN', user })
            },
            logOut: async () => {
                await auth.logout()
                dispatch({ type: 'LOGOUT' })
            },
            register: async (firstName, lastName, email, password) => {
                await auth.register(firstName, lastName, email, password)
                const user = await auth.getCurrentUser()
                dispatch({ type: 'LOGIN', user })
            },
            state: state
        }), [])

    return (
        <NavigationContainer>
            <AuthContext.Provider value={authContext}>
                {state.user === null ? (
                    <Stack.Navigator headerMode='none'>
                        <Stack.Screen name='Home' component={WelcomeScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
                        <Stack.Screen name='Register' component={RegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
                        <Stack.Screen name='Login' component={LoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS }} />
                    </Stack.Navigator>
                ) : <Dashboard />}
            </AuthContext.Provider>
        </NavigationContainer>
    )
}
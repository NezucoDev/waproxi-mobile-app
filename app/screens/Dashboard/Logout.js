import React, { useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import AuthContext from '../../contexts/authContext'

const Logout = () => {
    const { logOut } = useContext(AuthContext)
    
    useEffect(() => {
        (async () => {
            await logOut()
        })()
    }, [])

    return (
        <View><Text>Login out</Text></View>
    )
}

export default Logout
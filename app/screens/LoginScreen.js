import React, { useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, TextInput } from 'react-native'

import AuthContext from '../contexts/authContext'

import colors from '../res/colors'
import gStyles from '../res/styles'

import bg from '../assets/welcome-bg.jpg'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { logIn } = useContext(AuthContext)

    const submitLoginForm = async () => {
        if (loading) return

        setLoading(true)
        try {
            await logIn(email, password)
        } catch (ex) {
            console.log(ex.message)
            setLoading(false)
        }
    }

    return (
        <ImageBackground style={gStyles.container} source={bg}>
            <TextInput style={gStyles.input} value={email} onChangeText={(newVal) => setEmail(newVal)} placeholder='Email' keyboardType='email-address' placeholderTextColor='#000' />

            <TextInput style={gStyles.input} value={password} onChangeText={(newVal) => setPassword(newVal)} placeholder='Password' secureTextEntry={true} placeholderTextColor='#000' />

            <Text style={[gStyles.btn, styles.loginBtn]} onPress={submitLoginForm}>{loading ? 'Loggin in...' : 'Login'}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    loginBtn: {
        backgroundColor: colors.primary
    }
})

export default LoginScreen
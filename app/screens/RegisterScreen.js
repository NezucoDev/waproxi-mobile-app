import React, { useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, TextInput } from 'react-native'

import AuthContext from '../contexts/authContext'

import colors from '../res/colors'
import gStyles from '../res/styles'

import bg from '../assets/welcome-bg.jpg'

function RegisterScreen() {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useContext(AuthContext)

    const submitRegistrationForm = async () => {
        if (loading) return

        setLoading(true)
        try {
            await register(firstName, lastName, email, password)
        } catch (ex) {
            console.log(ex.message)
            setLoading(false)
        }
    }

    return (
        <ImageBackground style={gStyles.container} source={bg}>
            <TextInput style={gStyles.input} value={firstName} onChangeText={(newVal) => setFirstname(newVal)} placeholder='First Name' placeholderTextColor='#000' />

            <TextInput style={gStyles.input} value={lastName}  onChangeText={(newVal) => setLastname(newVal)} placeholder='Last Name' placeholderTextColor='#000' />

            <TextInput style={gStyles.input} value={email}     onChangeText={(newVal) => setEmail(newVal)} placeholder='Email' keyboardType='email-address' placeholderTextColor='#000' />

            <TextInput style={gStyles.input} value={password}  onChangeText={(newVal) => setPassword(newVal)} placeholder='Password' secureTextEntry={true} placeholderTextColor='#000' />

            <Text style={[gStyles.btn, styles.registerBtn]} onPress={submitRegistrationForm}>{loading ? 'Registering...' : 'Register'}</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    registerBtn: {
        backgroundColor: colors.primary
    }
})

export default RegisterScreen
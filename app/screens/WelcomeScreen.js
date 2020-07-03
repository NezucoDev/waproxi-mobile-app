import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import colors from '../res/colors'
import gStyles from '../res/styles'

import bg from '../assets/welcome-bg.jpg'

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground style={gStyles.container} source={bg}>
            <View style={gStyles.container}>
                <Text style={styles.logo}><Text style={{color: colors.primary}}>WA</Text>Proxi</Text>
                <Text style={styles.tagline}>Sell Your Soul To Us</Text>
            </View>

            <LinearGradient colors={['#00000000', '#000000']} style={[gStyles.container, { width: '100%', justifyContent: 'flex-start' }]}>
                <Text style={[gStyles.btn, styles.loginBtn]} onPress={() => navigation.navigate('Login')}>Login</Text>
                <Text style={{ color: '#fff', marginTop: 15 }}>Don't have an account yet? <Text style={{ color: colors.link }} onPress={() => navigation.navigate('Register')}>Register Now</Text> for free.</Text>
            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    logo: {
        fontSize: 48,
        color: '#fff'
    },
    loginBtn: {
        backgroundColor: 'lightblue'
    },
    tagline: {
        color: '#fff',
        fontStyle: 'italic'
    }
})

export default WelcomeScreen
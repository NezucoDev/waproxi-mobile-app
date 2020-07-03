import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'

import http from './httpService'

async function login(email, password) {
    try {
        const response = await http.post('https://accounts.nezuco.com/login', {
            email, password
        })

        const authHeader = response.headers['authorization']
        if (!authHeader) return console.log('No Authorization header')

        const jwt = authHeader.split(' ')[1]
        await AsyncStorage.setItem('jwt', jwt)
    } catch (ex) {
        console.log(ex.message)
    }
}

async function register(firstName, lastName, email, password) {
    try {
        const response = await http.post('https://accounts.nezuco.com/register', {
            firstName, lastName, email, password
        })

        const authHeader = response.headers['authorization']
        if (!authHeader) return console.log('No Authorization header')

        const jwt = authHeader.split(' ')[1]
        await AsyncStorage.setItem('jwt', jwt)
    } catch (ex) {
        console.log(ex.message)
    }
}

async function logout() {
    await AsyncStorage.removeItem('jwt')
}

async function getCurrentUser() {
    try {
        const token = await AsyncStorage.getItem('jwt')
        if (!token)
            return null

        return jwtDecode(token)
    } catch (ex) {
        return null
    }
}

export default {
    login,
    register,
    logout,
    getCurrentUser
}
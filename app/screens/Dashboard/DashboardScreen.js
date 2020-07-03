import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TextInput } from 'react-native'
import { Picker } from '@react-native-community/picker'
import { Notifications } from 'expo'
import { LinearGradient } from 'expo-linear-gradient'
import * as Contacts from 'expo-contacts'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import http from '../../services/httpService'

import colors from '../../res/colors'
import gStyles from '../../res/styles'
import { apiUrl } from '../../../config.json'

import Screen from '../Screen'


const askNotificationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (Constants.isDevice && status === 'granted')
        console.log('Notification permissions granted.')
}

function DashboardScreen({ navigation }) {
    const [contacts, setContacts] = useState(null)
    const [sendAt, setSendAt] = useState('0')
    const [msg, setMsg] = useState('')
    const [selectedContact, setSelectedContact] = useState(-1)
    const [awaitingResponse, setAwaitingResponse] = useState(false)

    useEffect(() => {
        (async () => {
            await askNotificationPermission()
            const { status } = await Contacts.requestPermissionsAsync()
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
                })

                if (data.length > 0) {
                    const phoneNumbers = []
                    data.forEach(contact => {
                        contact.phoneNumbers.forEach(phoneNumber => {
                            phoneNumbers.push({
                                id: contact.id,
                                name: contact.name,
                                phoneNumber: phoneNumber.number
                            })
                        })
                    })
                    setContacts(phoneNumbers)
                }
            }
        })()
    }, [])

    const sendMsg = async () => {
        try {
            setAwaitingResponse(true)
            const response = await http.post(`${apiUrl}/msg`, {
                to: selectedContact, msg, sendAt
            })
            const result = await response.json()

            const notification = { title: 'Message Sent', body: 'Your message was sent successfully.' }
            if (result.status && result.status === 'OK') {
                await Notifications.scheduleLocalNotificationAsync(notification)
                alert('Message Sent!')
            } else if (result.status && result.status === 'PENDING') {
                alert('Message scheduled!')
            }
        } catch (e) {
            console.error('Exception caught!', e)
        }
        setAwaitingResponse(false)
    }

    return (
        <Screen navigation={navigation}>
            <LinearGradient colors={[colors.primary, 'dodgerblue']} style={gStyles.container}>
                <SafeAreaView style={[gStyles.container, { width: '100%' }]}>

                    <TextInput style={gStyles.input} keyboardType='phone-pad' placeholder='Send to' placeholderTextColor='#000' />

                    {contacts?.length > 0 &&
                        <View style={gStyles.select}>
                            <Picker
                                selectedValue={selectedContact}
                                onValueChange={(value) => setSelectedContact(value)} style={{ width: '100%' }}>
                                {contacts.map(contact => <Picker.Item key={contact.phoneNumber} label={`${contact.name} ${contact.phoneNumber}`} value={contact.phoneNumber} />)}
                            </Picker>
                        </View>
                    }

                    <TextInput style={gStyles.input} value={msg} onChangeText={(newText) => setMsg(newText)} multiline={true} placeholder='Your message' placeholderTextColor='#000' />

                    <View style={gStyles.select}>
                        <Picker
                            selectedValue={sendAt}
                            onValueChange={(value) => setSendAt(value)} style={{ width: '100%' }}>
                            <Picker.Item label='Now' value='0' />
                            <Picker.Item label='12 hrs from now' value='+12' />
                            <Picker.Item label='24 hrs from now' value='+24' />
                            <Picker.Item label='Pick a time' value='custom' />
                        </Picker>
                    </View>

                    <Text style={[gStyles.btn]} onPress={sendMsg}>{awaitingResponse ? 'SENDING...' : 'SEND'}</Text>
                </SafeAreaView>
            </LinearGradient>
        </Screen>
    )
}

export default DashboardScreen
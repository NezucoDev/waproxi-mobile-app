import React from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default class Screen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {this.props.children}
                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', position: 'absolute', top: 50, right: 24 }}
                            onPress={this.props.navigation.openDrawer}
                        >
                            <FontAwesome5 name='bars' size={24} color='#161924' />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    text: {
        color: '#161924',
        fontSize: 20,
        fontWeight: '500'
    }
})
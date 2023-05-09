import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Styles from '../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import Constants from '../constants/Constants';
import { getAuth} from 'firebase/auth';

const Menu = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        }).catch(error => alert(error.message))
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/defautImage.png')}
                    style={styles.avatar} />
                <Text style={styles.textEmail}>Email: {auth.currentUser.email}</Text>
            </View>
            <View style={Styles.hr}></View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookTicketWV')}>
                    <Text style={styles.textButton}>Đặt vé</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.textButton}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 25,
        margin: 20
    },
    textEmail: {
        marginLeft: 10,
        fontSize: 18
    },

    button: {
        height: 45,
        borderRadius: 15,
        backgroundColor: Constants.barColor,
        justifyContent: 'center',
        padding: 10,
        margin: 10,
    },
    textButton: {
        textAlign: 'center',
        color: Constants.textColorWhite,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonProfile: {
        margin: 20,
    }
})

export default Menu;

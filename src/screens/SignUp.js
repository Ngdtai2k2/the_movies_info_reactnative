import React, { useEffect, useState } from 'react';
import { auth } from '../service/firebase-config';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './Styles';

const SignUp = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigation = useNavigation();
    
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user;
            alert("Registered an account with email ", user.email);
            navigation.navigate('Login');
            // console.log("Sign Up with: ",user.email);
        }).catch((error) => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/icon.png')} />
            <Text style={styles.title}>Vui lòng đăng kí tài khoản!</Text>
            <StatusBar style='auto' />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Email'
                    placeholderTextColor='#000'
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Mật khẩu'
                    placeholderTextColor='#000'
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textLink}>Tôi đã có một tài khoản!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp} style={styles.loginBtn}>
                <Text style={styles.textBtn}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp;
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { auth } from '../service/firebase-config';
import { styles } from './Styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).then(async (userCredentials) => {
      const userToken = await userCredentials.user.getIdToken();
      if (rememberMe) {
        await AsyncStorage.setItem('userToken', userToken);
      } else {
        await AsyncStorage.removeItem('userToken');
      }
      navigation.navigate('Home');
    }).catch((error) => alert(error.message))
  }

  const resetPassword = () => {
    auth.sendPasswordResetEmail(email).then(() => {
      alert('Please check your email!');
    }).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/icon.png')} />
      <Text style={styles.title}>Cảm ơn bạn đã dùng MoviesIn4!</Text>
      <StatusBar style='auto' />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Nhập email của bạn!'
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

      <View style={styles.checkboxView}>
        <Checkbox
          value={rememberMe}
          onValueChange={() => setRememberMe(!rememberMe)}
        />
        <Text style={styles.textCheckbox}>Nhớ đăng nhập</Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.textLink} onPress={resetPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.textLink}>Bạn chưa có tài khoản?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.textBtn}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

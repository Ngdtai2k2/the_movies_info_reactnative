import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { auth } from '../service/firebase-config';
import { styles } from './Styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
      const user = userCredentials.user;
      // const photoURL = user.photoURL;
      // console.log(photoURL);
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

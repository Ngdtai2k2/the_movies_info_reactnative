import {  StyleSheet } from 'react-native';
import Constants from '../constants/Constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      image: {
        width: 200,
        height: 200,
      },
    
      title: {
        fontSize: 20,
        marginBottom: 30,
        marginTop: 0,
      },
    
      inputView: {
        backgroundColor: Constants.textColorWhite,
        borderRadius: 30,
        borderColor: Constants.barColor,
        borderWidth: 2,
        width: '70%',
        height: 45,
        marginBottom: 20,
        alignItems: 'center',
      },
    
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        textAlign: 'center',
      },
    
      textLink: {
        marginTop: 5,
      },
    
      loginBtn: {
        width: '80%',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        backgroundColor: Constants.barColor,
      },
    
      textBtn: {
        color: Constants.textColorWhite,
      }
      
})
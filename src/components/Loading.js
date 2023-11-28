import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import Constants from '../constants/Constants';

const Loading = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color={Constants.barColor} />
    <Text style={styles.text}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  text: {
    color: Constants.barColor,
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10,
  },

});

export default Loading;
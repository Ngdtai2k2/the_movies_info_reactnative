import React from 'react';
import WebView from 'react-native-webview';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { URL_BUY_TICKET } from '../service/config';

const BookTicketWV = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: URL_BUY_TICKET }}
        style={styles.webView}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  webView: {
    flex: 1,
  },
  closeButton: {

  },
  closeButtonText: {

  },
});

export default BookTicketWV;

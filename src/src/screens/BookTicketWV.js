import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';

const BookTicketWV = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://moveek.com/mua-ve/' }} // Địa chỉ URL của trang web cần hiển thị
        style={styles.webView}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()} // Sử dụng navigation.goBack() để quay lại màn hình trước đó
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
    // Kiểu dáng của nút đóng
  },
  closeButtonText: {
    // Kiểu dáng của văn bản trong nút đóng
  },
});

export default BookTicketWV;

import React from 'react';
import { WebView } from 'react-native-webview'; 

const VideoWebView = ({ route }) => {
  const { url } = route.params; // Lấy url từ params được truyền vào

  return (
    <WebView
      source={{ uri: url }} // Đặt uri của WebView là url truyền vào
    />
  );
}

export default VideoWebView;

import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';

class ChatbotScreen extends Component {
  render() {
    return (
        <WebView
          source={{uri: 'https://computercompanion-chatbot.mybluemix.net'}}/>
    );
  }
}
export default ChatbotScreen;
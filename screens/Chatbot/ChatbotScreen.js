import React, { Component, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, Platform } from 'react-native';

class ChatbotScreen extends Component {
  function = function () {
    console.log("Hello")
  }
  render() {

    // return (
    //     <WebView source={{uri: 'https://computercompanion-chatbot.mybluemix.net'}}/>
    // );

    //return (Platform.OS === 'web' ? <iframe src='https://computercompanion-chatbot.mybluemix.net' frameborder="0" height="100%" width="100%"/> : <WebView source={{uri: 'https://computercompanion-chatbot.mybluemix.net'}}/>)

    return Platform.OS === "web" ? (
      <iframe frameborder="0" src="https://computercompanion-chatbot.mybluemix.net" height={'100%'} width={'100%'} />
    ) : (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: "https://computercompanion-chatbot.mybluemix.net" }}
          style={{marginTop: 22, flex: 1}}
        />
      </View>
    );
  }
}
export default ChatbotScreen;
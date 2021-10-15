import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, ScrollView, Button, Image } from 'react-native';

const ChatbotScreen = () => {
    const [text, onChangeText] = useState("");

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
            <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value = {text}
                    placeholder = "Enter your message here"
            />
            <Button 
                onPress={() => {alert("Message Sent")}}
                color="#7b42f5"
                title="Send"
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      messageContainer: {
          marginTop: 10,
          flexDirection: "row",
      },
      img: {
        width: 15,
        height: 15,
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})

export default ChatbotScreen;
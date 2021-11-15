import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Image, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Conversation } from 'react-native-watson'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatbotScreen = () => {
    const [text, onChangeText] = useState("");
    const [sent, onChangeSent] = useState(false);

    Message = () => {
        if (!sent)
            return <View></View>;
        else
            return (
                <View style={{
                    backgroundColor: "#0078fe",
                    padding:10,
                    marginLeft: '45%',
                    borderRadius: 5,
                    marginBottom: 15,
                    marginTop: 5,
                    marginRight: "5%",
                    maxWidth: '50%',
                    alignSelf: 'flex-end',
                    maxWidth: 500,
                    borderRadius: 20,
                  }}> 
                <Text style={{ fontSize: 16, color: "#fff", }}>{text}</Text>
                <View style={styles.rightArrow}></View>
                <View style={styles.rightArrowOverlap}></View>
                </View>
            );
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
            <View style={[{flexDirection: "row"}]}>
                <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value = {text}
                        placeholder = "Enter your message here"
                />
                <TouchableOpacity onPress={() => {onChangeSent(true)}}>
                    <AntDesign name="arrowup" size={32} color="black" style={[{marginTop: 12.5}]}/>            
                </TouchableOpacity>
            </View>
            <Message />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column-reverse",
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
        width: windowWidth - 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      rightArrow: {
        position: "absolute",
        backgroundColor: "#0078fe",
        //backgroundColor:"red",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
      },
      
      rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#fff",
        //backgroundColor:"green",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20
      
      },
})

export default ChatbotScreen;
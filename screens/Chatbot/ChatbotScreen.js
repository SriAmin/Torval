import React, { Component, useState} from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, Platform } from 'react-native';

const styles = StyleSheet.create({
  socialForumButton: {
      backgroundColor: 'purple',
      height: 50,
      width: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left:20,
      bottom:10,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 0
      }
  }
});

const ChatbotScreen = ({navigation}) => {

  const [forumCheck, setForumCheck] = useState(false)

  const navigateToSocialForum = () => {
    navigation.navigate('Forum')
  }
  
  const onMessage = (data) => {
    var htmlString = data;
    var forumWordLocation = htmlString.search("forum");

    if (forumWordLocation == -1) {
      //hide button
      setForumCheck(false);
    } else {
      //show button
      setForumCheck(true);
    }
  }

  const ForumButton = () => {

    if (forumCheck == false) {
      return <View></View>;
    } else {
      return (<View>
        <TouchableHighlight style={styles.socialForumButton} underlayColor='#ff7043' onPress={()=>{navigateToSocialForum()}}>
          <Text style={{fontSize: 10, color: 'white'}}>FORUM</Text>
        </TouchableHighlight>
      </View>)
    }
  }

    //Code to inject: Gets inner html of webpage and updates every 5 seconds
    const jsCode = 'function refresh(){window.ReactNativeWebView.postMessage(document.documentElement.innerHTML);setTimeout(refresh, 2000);}refresh();'
    
    return Platform.OS === "web" ? (
      <iframe frameborder="0" src="https://computercompanion-chatbot.mybluemix.net" height={'100%'} width={'100%'} />
    ) : (

      <View style={{ flex: 1 }}>

        {/* WebView for chatbot */}
        <WebView
            javaScriptEnabled={true}
            javaScriptEnabledAndroid={true}
            injectedJavaScript={jsCode}
            source={{ uri: "https://computercompanion-chatbot.mybluemix.net" }}
            style={{marginTop: 22, flex: 1}}
            onMessage={event => onMessage(event.nativeEvent.data)}
          />

        {/* forum button */}
        <ForumButton />

      </View>
    );
  }


export default ChatbotScreen;
import React, { Component, useState} from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Text, TextInput, View, TouchableHighlight, Platform } from 'react-native';
import { WebChatContainer} from '@ibm-watson/assistant-web-chat-react';
import DOMParser from 'react-native-html-parser';

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
      bottom:85,
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 0
      }
  },

  arButton: {
    backgroundColor: 'purple',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left:80,
    bottom:85,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    }
}
});

const webChatOptions = {
  integrationID: "cce610f1-06db-4bdc-87e9-41be3159c722",
  region: 'us-south',
  serviceInstanceID: 'da71d7eb-736a-4aa4-8b60-2299027eaed3',
};

const ChatbotScreen = ({navigation}) => {

  const [forumCheck, setForumCheck] = useState(false)
  const [arCheck, setARCheck] = useState(false)

  const navigateToSocialForum = () => {
    navigation.navigate('Forum')
  }

  const navigateToAR = () => {
    navigation.navigate('Tutorials')
  }
  
  const onMessage = (data) => {
    var htmlString = data;
    //var forumWordLocation = htmlString.search("forum");
    var parser = new DOMParser.DOMParser();
    var parsed = parser.parseFromString(htmlString, 'text/html');
    
    //console.log(parsed.getElementsByAttribute('id', 'WAC__messages--ns593616348'))
    console.log(parsed.querySelect('innerText'))

    //Finding Social Forum words
    var findForum = htmlString.includes('Forums')
    if(findForum == false){
      console.log('Nothing found')
    }
    else{
      console.log('Found')
      setForumCheck(true);
    }

    //Finding AR words
    var findAR = htmlString.includes('AR Tutorials')
    if(findAR == true)
    {
      console.log("Found AR")
      setARCheck(true)
    }
    else{
      console.log('Not Found')
    }

    //if (forumWordLocation == -1) {
      //hide button
      //setForumCheck(false);
    //} else {
      //show button
      //setForumCheck(true);
    //}
    
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

  const ARButton = () => {

    if (arCheck == false) {
      return <View></View>;
    } else {
      return (<View>
        <TouchableHighlight style={styles.arButton} underlayColor='#ff7043' onPress={()=>{navigateToAR()}}>
          <Text style={{fontSize: 10, color: 'white'}}>AR</Text>
        </TouchableHighlight>
      </View>)
    }
  }

    //Code to inject: Gets inner html of webpage and updates every 5 seconds
    const jsCode = 'function refresh(){window.ReactNativeWebView.postMessage(document.documentElement.innerHTML);setTimeout(refresh, 2000);}refresh();'
    
    return(

      <View style={{ flex: 1 }}>

        {/* WebView for chatbot */}
        <WebView
            javaScriptEnabled={true}
            javaScriptEnabledAndroid={true}
            injectedJavaScript={jsCode}
            source={{ uri: "https://web-chat.global.assistant.watson.appdomain.cloud/preview.html?backgroundImageURL=https%3A%2F%2Fus-south.assistant.watson.cloud.ibm.com%2Fpublic%2Fimages%2Fupx-da71d7eb-736a-4aa4-8b60-2299027eaed3%3A%3Ac37e07b8-b3de-4b13-9f59-08551ffff63a&integrationID=cce610f1-06db-4bdc-87e9-41be3159c722&region=us-south&serviceInstanceID=da71d7eb-736a-4aa4-8b60-2299027eaed3" }}
            style={{marginTop: 22, flex: 1}}
            onMessage={event => console.log ("recieved: ", onMessage(event.nativeEvent.data))}
          />

        {/* Social Forum button */}
        <ForumButton />

        {/* AR button */}
        <ARButton />

      </View>
    );
  }


export default ChatbotScreen;
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import FirebaseApp from '../FirebaseApp';

//JSON data to hold the thread forum data
const forumThreadResults = [
    {
        "title" : "Need help!!! PC won't turn on",
        "description" : "I just recently built my computer and for some reason the computer isn't starting, I've looked into the computer and nothing seems to be out of place, I've never checked back of the PC though",
        "resolved" : true,
        "author" : "Sri Amin",
        "tag" : [
            "Won't turn on"
        ],
        "comments" : [
            {
                "author" : "Justin MacGregor",
                "text" : "You should look at the back of the PC, check if the power cable is plugged in"
            },
            {
                "author" : "Sri Amin",
                "text" : "Thank you!! That fixed the issue, my computer has turned on, now I can play my games"
            },
            {
                "author" : "Onell Daniyal",
                "text" : "Had a similar issue, but the power cable is plugged in, can anyone help?"
            },
            {
                "author" : "Ali Hassan",
                "text" : "Make sure the power switch on the power supply is switched to on."
            },
        ]
    },
    {
        "title" : "PC is making noise with a fan",
        "description" : "The computer I just recently built is making alot of cllicking noises, it sounds like its coming from the fan but I'm not sure",
        "resolved" : false,
        "author" : "Nathan Fabar-Good",
        "tag" : [
            "Noises",
            "Repair",
            "Replace"
        ],
        "comments" : []
    },
]

//Handles the description for the thread to either display the shortened version or the full version
const ShortDescription = (props) => {
    if (props.string.length >= 150) {
        const newString = props.string.substring(0, 150) + " ..."
        return <Text styles={styles.desc}>{newString}</Text>
    }
    else
        return <Text styles={styles.desc}>{props.string}</Text>
}

//Returns an image based on if the resolved field is set to true/false
const Resolved = (props) => {
    if (props.resolve)
        return <Image style={styles.itemImg} source={{uri: 'https://icons-for-free.com/iconfiles/png/512/checkmark-131964752499076639.png',}}/>
    else
        return <Image style={styles.itemImg} source={{uri: 'https://static.thenounproject.com/png/962182-200.png',}}/>

}

const SocialForumScreen = ({navigation}) => {
    const [tutorialList, setTutorialList] = useState(forumThreadResults)

    const addForumThread = (title, description, author) => {
        const forumThread = {
            "title" : title,
            "description" : description,
            "resolved" : false,
            "author" : author,
            "tag" : [
                "New",
            ],
            "comments" : []
        }

        setTutorialList([...tutorialList, forumThread]);
    }

    return (
        <View style={styles.container}>
             <FirebaseApp />
            <Button onPress={() => {
                //addForumThread("test", "test", "test");
                navigation.navigate('Create A Thread', {addThread : addForumThread})
            }}
            title="Create Thread" />
            <FlatList
                data={tutorialList}
                keyExtractor={item => item.title}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => {
                                navigation.navigate('Comments', { thread: item })
                            }}>
                            <View style={[{flex:1,flexDirection:'row'}]}>
                                <Resolved resolve={item.resolved}/>
                                <View style={[{flexShrink: 1}]}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <ShortDescription string={item.description}/>
                                    <Text style={styles.authorText}>{item.author}</Text>
                                    <FlatList 
                                        style={styles.tagList}
                                        data={item.tag}
                                        renderItem={({item}) => {
                                            return(
                                                <View style={styles.tagBubble}>
                                                    <Text style={styles.tagText}>{item}</Text>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                    )
                }}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "grey",
    },
    itemImg: {
        height: 50,
        width: 50,
    },
    itemTitle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    desc: {
        fontSize: 8,
        padding: 10,
    },
    authorText: {
        paddingTop: 10,
        fontSize: 10,
        color: 'grey',
    },
    tagList: {
        flexDirection: "row",
    },
    tagBubble: {
        backgroundColor: "#7b42f5",
        margin: 10,
        borderRadius: 10,
        padding: 5
    },
    tagText: {
        color: "white",
        fontSize: 15,
    }
})

export default SocialForumScreen;
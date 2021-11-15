import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DifficultyElement = ({difficulty}) => {
    const difficultyList = []
    for (let index = 0; index < difficulty; index++) {
        difficultyList.push(true)
    }
    for (let index = difficulty; index <= 4; index++) {
        difficultyList.push(false) 
    }

    return (
        <FlatList
            data={difficultyList}
            horizontal={true}
            renderItem={({item}) => {
                if (item) {
                    return (
                        <AntDesign name="star" size={24} color="black" />
                    )
                }
                else {
                    return (
                        <AntDesign name="staro" size={24} color="black" />
                    )
                }
            }}
        />
    );
}

const TutorialDescriptionView = ({ navigation, route }) => {
    let tutorial = route.params.tutorial;
    console.log(tutorial)
    
    return (
        <View style={styles.container}>
            <Image style={styles.itemImg} 
                source={{
                    uri: 'https://image.shutterstock.com/image-photo/business-woman-working-on-modern-260nw-1364492978.jpg',
            }}/>
            <View style={{backgroundColor: "black", width: windowWidth, height: 5, marginBottom: 30}}/>
            <View styles={styles.infoContainer}>
                <Text style={styles.title}>{tutorial.title}</Text>
                <Text style={styles.desc}>{tutorial.description}</Text>
                <DifficultyElement difficulty={tutorial.difficulty}/>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Tutorial', { tutorial: tutorial })}}>
                    <Text style={{color: "white", fontSize: 18, marginRight: 10}}>Start</Text>
                    <AntDesign name="caretright" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        
    },
    itemImg: {
        width: windowWidth,
        height: 200,
        borderBottomWidth: 3
    },
    title: {
      padding: 10,
      marginBottom: 15,
      fontSize: 24,
      textAlign: "center",
      color: "#7b42f5"
    },
    desc: {
        fontSize: 16,
        padding: 10,
        color: "darkslategrey"
    },
    difficulty: {
        fontSize: 16,
        padding: 10,
        color: "darkslategrey"
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#7b42f5",
        marginTop: 50,
        margin: 5,
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
  });

export default TutorialDescriptionView;

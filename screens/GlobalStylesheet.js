import React from 'react';
import {Text} from 'native-base';
import {SafeAreaView} from "react-navigation";
import {TextInput} from "react-native";
import { Button } from 'react-native-paper';

//STYLESHEET
import Styles from "../components/Styles";
const s = Styles;
//

const GlobalStylesheet = ({ navigation }) => {


    return (
        <SafeAreaView style={{ padding: 20 }}>

                <Text style={s.text}>
                    Text
                </Text>

                <TextInput style={s.textInput}>
                    Text Input
                </TextInput>

                <Button style={s.button}>
                    <Text>Important Button</Text>
                </Button>

                <Button style={s.button}>
                    <Text>Miscellaneous Button</Text>
                </Button>

                <Button mode="elevated">
                    Press me
                </Button>


        </SafeAreaView>
    );
};

export default GlobalStylesheet;
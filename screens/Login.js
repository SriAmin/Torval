import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Input,
  Item,
  Label,
  Spinner,
  Text,
} from "native-base";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { auth, signInAuthAdmin, signInAuthAnonymous } from "../config/firebase";
import { SafeAreaView } from "react-navigation";
import SignUp from "./SignUp";

const Login = ({ navigation }) => {
  const [txtEmail, setEmail] = useState("");
  const [txtPassword, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const signIn = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(txtEmail, txtPassword)
      .then(result => {
        if (result) {
          setLoading(false);
          navigation.navigate("Torval");
        }
      })
      .catch(({ message }) => {
        alert(message);
        setLoading(false);
      });
  };

  const signInAnonymous = async () => {
    if (await signInAuthAnonymous()) {
      navigation.navigate("Torval");
    }
  };

  const signInAdmin = async () => {
    setLoading(true);
    if (await signInAuthAdmin()) {
      navigation.navigate("Torval");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.appImg}
            source={require('../assets/icon.png')}
          />
          <Text style={styles.appTitle}>Torval</Text>
        </View>
        <Form>
          <Item floatingLabel>
            <Input
              style={{color: "white"}}
              value={txtEmail}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </Item>

          <Item floatingLabel>
            <Input
              style={{color: "white"}}
              secureTextEntry
              value={txtPassword}
              onChangeText={setPassword}
              placeholder="Password"
            />
          </Item>
        </Form>

        <Button
          style={styles.buttons}
          onPress={signIn}
          disabled={isLoading}
        >
          {!isLoading ? <Text>Login</Text> : <Spinner color="#eeeeee" />}
        </Button>

        <Button
          transparent
          style={styles.buttons}
          onPress={() => navigation.navigate("SignUp")}
          disabled={isLoading}
        >
          <Text>Sign Up</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#002347"
  },
  formContainer: {
    paddingTop: 100,
  },
  appImg: {
    alignItems: "center",
    width: 175,
    height: 175,
  },
  appTitle: {
    marginTop: 15,
    fontSize: 36,
    fontFamily: "Optima",
    color: "#FF8E00"
  },
  buttons: {
    backgroundColor: "#FF8E00",
    marginTop: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default Login;

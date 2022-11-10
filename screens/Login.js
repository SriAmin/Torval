import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Input,
  Item,
  Label,
  Spinner,
  Text
} from 'native-base';
import { getAuth, signInAnonymously } from "firebase/auth";
import { auth, signInAuthAdmin, userDocument} from '../config/firebase';
import {SafeAreaView} from "react-navigation";
import SignUp from "./SignUp";

const Login = ({ navigation }) => {
  const [txtEmail, setEmail] = useState('');
  const [txtPassword, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const signIn = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(txtEmail, txtPassword)
      .then(result => {
        if (result) {
          setLoading(false);
          navigation.navigate('Torval');
        }
      })
      .catch(({ message }) => {
        alert(message);
        setLoading(false);
      });
  };

    const signInAnonymous = () => {
        const auth = getAuth();
        signInAnonymously(auth)
            .then(() => {
                navigation.navigate('Torval')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const signInAdmin = async () => {
      setLoading(true);
      if (await signInAuthAdmin()) {
        navigation.navigate('Torval');
      }
      setLoading(false);
    };


    return (
    <Container>

      <SafeAreaView style={{ padding: 20 }}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={txtEmail} onChangeText={setEmail} />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              value={txtPassword}
              onChangeText={setPassword}
            />
          </Item>
        </Form>



        <Button
            style={{
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          onPress={signIn}
          disabled={isLoading}>
          {!isLoading ? <Text>Login</Text> : <Spinner color="#eeeeee" />}
        </Button>

          <Button
              style={{
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
              onPress={signInAdmin}
              disabled={isLoading}>
              {!isLoading ? <Text>Login as Admin</Text> : <Spinner color="#eeeeee" />}
          </Button>

          <Button
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={signInAnonymous}
              disabled={isLoading}>
              {!isLoading ? <Text>Login Anonymously</Text> : <Spinner color="#eeeeee" />}
          </Button>

        <Button
          transparent
          style={{
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => navigation.navigate('SignUp')}
          disabled={isLoading}>
          <Text>Signup</Text>
        </Button>

      </SafeAreaView>
    </Container>
  );
};

export default Login;
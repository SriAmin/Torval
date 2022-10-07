import React, { useEffect } from 'react';
import { Container, Spinner, Text, View } from 'native-base';

import { auth } from '../config/firebase';

const Authentication = ({ navigation }) => {
  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);
  return (
    <Container>
      <View
        style={{
          padding: 20,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>Authenticating</Text>
        <Spinner color="#333333" />
      </View>
    </Container>
  );
};

export default Authentication;

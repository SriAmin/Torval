import React from 'react';
import { Button, Container, Header, Text, View } from 'native-base';

import { auth } from '../config/firebase';

const Home = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => navigation.navigate('Authentication'));
  };
  return (
    <Container>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <Text>Welcome!</Text>
        <Button style={{ marginTop: 20 }} onPress={logout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </Container>
  );
};

export default Home;
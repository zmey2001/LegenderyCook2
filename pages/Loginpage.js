import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import database from './database';
import Global from './context';

const myDatabase = new database();

const Loginpage = ({ navigation }) => {
  const [Login, setLogin] = React.useState('');
  const [Password, setPassword] = React.useState('');

  const handleAuthorization = () => {
      myDatabase.Authorization(Login, Password).then(authenticated => {
        if (authenticated) {
          Global.currentUser = Login;
          navigation.navigate('Privateofficepage');
        } else {
          Alert.alert('Ошибка', 'Неверный логин или пароль');
        }
      });
    }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        LEGENDARYCOOK
      </Text>
      <Text style={styles.SimpeText}>
        LOGIN
      </Text>
      <TextInput
        style={styles.input}
        name="Login"
        onChangeText={setLogin}
        value={Login}
        placeholder="NAME"
      />
      <Text style={styles.SimpeText}>
        PASSWORD
      </Text>
      <TextInput
        style={styles.input}
        name="Password"
        onChangeText={setPassword}
        value={Password}
        secureTextEntry={true}
        placeholder="*******"
      />
      <View style={styles.newbutton}>
      <Button
        style={styles.newbutton}
        color="#839EC9"
        title="ENTER"
        onPress={handleAuthorization}
      />
      </View>
      <View style={styles.newbutton}>
      <Button
        color="#839EC9"
        title="REGISTRATION"
        onPress={() => navigation.navigate('Registrationpage')}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor:'#1B2558',
  },
  input: {
    flexDirection: 'row',
    backgroundColor:'#D9D9D9',
    height: 40,
    margin: 12,
    padding: 10,
  },
  newbutton: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 15,
    textShadowColor: 'rgba(0, 0, 0, 2)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 5
  },
  SimpeText: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 2)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 5
  },
  
});

export default Loginpage;
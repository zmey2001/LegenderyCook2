import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import database from './database';

const myDatabase = new database();

const Registrationpage = ({ navigation }) => {
  const [Fullname, setFullName] = React.useState('');  
  const [Password, setPassword] = React.useState('');
  const [Password2, setPassword2] = React.useState('');
  
  const handleAddData = () => {
    if(Password == Password2)
    {
      myDatabase.addUsers(Fullname, Password)
        .then(() => {
          Alert.alert('Сообщение','Зарегистрировался');
        })
        .catch((error) => {
          Alert.alert('Сообщение', 'Ошибка');
          console.log(error);
        });
    }
    else{
      Alert.alert('Ошибка','Пароли не совпадают');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        REGISTRATION
      </Text>
      <Text style={styles.SimpeText}>
        FULLNAME
      </Text>
      <TextInput
        style={styles.input}
        name="Fullname"
        onChangeText={text => setFullName(text)}
        value={Fullname}
        placeholder="FULLNAME"
      />
      <Text style={styles.SimpeText}>
        PASSWORD
      </Text>
      <TextInput
        style={styles.input}
        name="Password"
        onChangeText={text => setPassword(text)}
        value={Password}
        secureTextEntry={true}
        placeholder="PASSWORD"
      />
      <Text style={styles.SimpeText}>
        PASSWORD AGAIN
      </Text>
      <TextInput
        style={styles.input}
        name="Password2"
        onChangeText={text => setPassword2(text)}
        value={Password2}
        secureTextEntry={true}
        placeholder="PASSWORD AGAIN"
      />
      <View style={styles.newbutton}>
      <Button
        color="#839EC9"
        title="REGISTRATION"
        onPress={handleAddData}
      />
      </View>
      <View style={styles.newbutton}>
      <Button
        color="#839EC9"
        title="BACK"
        onPress={() => navigation.navigate('Loginpage')}
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

export default Registrationpage;
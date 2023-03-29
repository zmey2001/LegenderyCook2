import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, View} from 'react-native';
import Global from './context';

const Privateofficepage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        HELLO, {Global.currentUser}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonFat} onPress={() => navigation.navigate('Loginpage')}>
          <Text style={styles.textTouch}>ИЗБРАННОЕ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFat} onPress={() => navigation.navigate('Loginpage')}>
          <Text style={styles.textTouch}>ПРЕДЛОЖИТЬ</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newbutton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchPage')}>
          <Text style={styles.textTouch}>ПОИСК</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newbutton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Loginpage')}>
          <Text style={styles.textTouch}>EXIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textTouch: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  buttonFat:{
    backgroundColor: '#839EC9',
    padding: 35,
    margin: 5,
    borderRadius: 20,
  },
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  newbutton: {
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor:'#1B2558',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#839EC9',
    padding: 10,
    borderRadius: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 60,
  },
  SimpeText: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
  },
});

export default Privateofficepage;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Button, ScrollView } from 'react-native';
import database from './database';
import Global from './context';

const myDatabase = new database();

const RecipeDetailsScreen = ({ navigation }) => {
  const [recipeOne, setRecipesOne] = useState([]);
  const [recipeTwo, setRecipesTwo] = useState([]);

  useEffect(() => {
    myDatabase.CardsOne().then(rowOne => {
      setRecipesOne(rowOne);
    }).catch(error => {
      console.log(error);
    });
    
    myDatabase.CardsTwo().then(rowTwo => {
      setRecipesTwo(rowTwo);
    }).catch(error => {
      console.log(error);
    });

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>{recipeOne.Name}</Text>
          <Text style={styles.SimpeText}>{recipeOne.Image}</Text>
          <Text style={styles.title}>Описание вселенной</Text>
          <Text style={styles.titlelittle}>{recipeOne.UniverseName}</Text>
          <Text style={styles.SimpeText}>{recipeOne.UniverseDescription}</Text>
          <Text style={styles.title}>Ингредиенты</Text>
          <Text style={styles.title}>Приготовление</Text>
          <Text style={styles.SimpeText}>{recipeOne.Calories}</Text>
          <Text style={styles.SimpeText}>{recipeOne.Stages}</Text>
          <Text style={styles.SimpeText}>{recipeOne.Comment}</Text>
          <Text style={styles.SimpeText}>{recipeOne.Description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor:'#1B2558',
    alignItems: 'center',
    padding: 20,
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
  titlelittle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
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
  
  step: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft:30,
    color: 'white',
  },
});

export default RecipeDetailsScreen;
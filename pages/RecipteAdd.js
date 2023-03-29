import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, Image, StyleSheet,ScrollView , FlatList, Text,  TouchableOpacity, Alert} from 'react-native';
import { color } from 'react-native-reanimated';



const RecipeAddScreen = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [imgUrl, setImageUrl] = useState([]);
  const [newImgUrl, setNewImageUrl] = useState('');
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient.trim()]);
    }
  };
  const handleAddImgURl= () => {
    if (newImgUrl.trim() !== '') {
      setImageUrl([...imgUrl, newImgUrl.trim()]);
    }
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleDeleteImgUrl = (index) => {
    const newImgUrls = [...imgUrl];
    newImgUrls.splice(index, 1);
    setImageUrl(newImgUrl);
  };

  const renderIngredient = ({ item, index }) => {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingrid}>{item}</Text>
        <TouchableOpacity onPress={() => handleDeleteIngredient(index)}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity> 
      </View>
      </SafeAreaView>
    );
  };

  const renderImg = ({ item, index }) => {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ingredientsContainer}>
      <Image style={styles.photo} source={{ uri: item}} />
        <TouchableOpacity onPress={() => handleDeleteImgUrl(index)}>
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  };

  const handleAddStep = () => {
    if (newStep.trim() !== '') {
      setSteps([...steps, newStep.trim()]);
      setNewStep('');
    }
  };

  const handleDeleteStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleEditStep = (index, newStepValue) => {
    const newSteps = [...steps];
    newSteps[index] = newStepValue;
    setSteps(newSteps);
  };

  const renderStep = ({ item, index }) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepNumber}>{`Этап ${index + 1}`}</Text>
          <TextInput
            style={styles.stepDescription}
            value={item}
            onChangeText={(value) => handleEditStep(index, value)}
          />

          <TouchableOpacity onPress={() => handleDeleteStep(index)}>
            <Text style={styles.deleteButtonText}>Удалить</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const newStepValue = Alert.alert('Введите новое значение:', item);
              if (newStepValue !== null) {
                handleEditStep(index, newStepValue);
              }
            }}
          >
          </TouchableOpacity> 
        </View>
      </SafeAreaView>
    );
  };

  const handleSubmitRecipe = () => {
    // отправка формы
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <View >
        <Text style={styles.title}>Добавление блюда</Text>
        </View>
    <ScrollView style={styles.container}>
    
      <TextInput
        style={styles.input}
        maxLength={50}
        placeholder="Название рецепта"
        value={recipeName}
        onChangeText={(value) => setRecipeName(value)}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Описание рецепта"
        multiline
        maxLength={140}
        value={recipeDescription}
        onChangeText={(value) => setRecipeDescription(value)}
      />

      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionHeader}>Ингредиенты:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Добавить ингредиент"
            value={newIngredient}
            onChangeText={(value) => setNewIngredient(value)}
          />
          <TouchableOpacity onPress={handleAddIngredient}>
            <Text style={styles.addButton}>Добавить</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList 
          data={ingredients}
          renderItem={renderIngredient}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.stepsContainer}>
        <Text style={styles.sectionHeader}>Этапы приготовления:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            
            maxLength={100}
            placeholder="Добавить этап"
            value={newStep}
            onChangeText={(value) => setNewStep(value)}
          />
          <TouchableOpacity onPress={handleAddStep}>
            <Text style={styles.addButton}>Добавить</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={steps}
          renderItem={renderStep}
          keyExtractor={(item, index) => index.toString()}
        />
      </View >

      <TextInput
            style={styles.input}
            placeholder="Ссылка на блюдо"
            value={newImgUrl}
            onChangeText={(value) => setNewImageUrl(value)}
          />
      <View style={styles.ImgAddButtonDiv}> 
        <FlatList 
            data={imgUrl}
            renderItem={renderImg}
            keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity onPress={handleAddImgURl} style={styles.ImgAddButton}>
          <Text  style={styles.ImgAddButtonDiv}>Добавить</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmitRecipe}>
        <Text style={styles.submitButton}>Сохрнаить</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
    photo: {
      alignItems: 'center',
      justifyContent: 'center',
        width: 400, height: 200, borderRadius: 50,
        marginBottom: 10,
      },
container: {
flex: 1,
backgroundColor:'#1B2558',
paddingHorizontal: 10,
},
title: {
  fontSize: 36,
  fontStyle: 'italic',
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: 10,
  color: 'white',
},
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 10,
},
input: {
backgroundColor:'#D9D9D9',
borderWidth: 1,
borderColor: '#ccc',
padding: 10,
marginBottom: 10,
},
ingrid: {
  color:'white'
  },
addButton: {
backgroundColor: '#2196F3',
color: '#fff',
padding: 10,
borderRadius: 5,
},
ImgAddButtonDiv: {
  color: 'white',
  alignItems: 'center',
  justifyContent: 'center',
},
ImgAddButton: {
  justifyContent: 'center',
  alignItems: 'center',
  width: 120, height: 60, borderRadius: 200 ,
  backgroundColor: '#2196F3',
  
  padding: 10,
  },
submitButton: {
  backgroundColor: '#2196F3',
  color: '#fff',
  padding: 10,
  borderRadius: 5,
  textAlign: 'center',
  marginTop: 20,
},
ingredientsContainer: {
  marginBottom: 20,
},
  sectionHeader: {
  borderColor: '#ccc',
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
deleteButtonText: {
color: 'red',
marginLeft: 10,
},
editButtonText: {
color: 'blue',
marginLeft: 10,
},
stepsContainer: {
marginBottom: 20,
},
stepContainer: {
  color: 'white',
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
stepNumber: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 2)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 5
},
stepDescription: {
flex: 1,
backgroundColor:'#D9D9D9',
borderWidth: 1,
borderColor: '#ccc',
padding:10,
marginLeft: 10,
},
});

    
export default RecipeAddScreen;
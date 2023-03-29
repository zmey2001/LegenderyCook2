import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [editingIngredient, setEditingIngredient] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [editingImageUrl, setEditingImageUrl] = useState(null);

  const handleAddIngredient = () => {
    if (editingIngredient === null) {
      if (!ingredientName) return;
      setIngredients([
        ...ingredients,
        {
          name: ingredientName,
          id: Math.random().toString(),
        },
      ]);
    } else {
      setIngredients(
        ingredients.map((ingredient) =>
          ingredient.id === editingIngredient.id
            ? { ...ingredient, name: ingredientName }
            : ingredient
        )
      );
      setEditingIngredient(null);
    }
    setIngredientName('');
  };

  const handleDeleteIngredient = (id) => {
    Alert.alert('Delete Ingredient', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
          if (editingIngredient && editingIngredient.id === id) {
            setEditingIngredient(null);
          }
        },
      },
    ]);
  };

  const handleEditIngredient = (ingredient) => {
    setEditingIngredient(ingredient);
    setIngredientName(ingredient.name);
  };

  const handleAddStep = () => {
    if (editingStep === null) {
      if (!stepDescription) return;
      setSteps([
        ...steps,
        {
          description: stepDescription,
          id: Math.random().toString(),
        },
      ]);
    } else {
      setSteps(
        steps.map((step) =>
          step.id === editingStep.id ? { ...step, description: stepDescription } : step
        )
      );
      setEditingStep(null);
    }
    setStepDescription('');
  };

  const handleDeleteStep = (id) => {
    Alert.alert('Delete Step', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setSteps(steps.filter((step) => step.id !== id));
          if (editingStep && editingStep.id === id) {
            setEditingStep(null);
          }
        },
      },
    ]);
  };

  const handleEditStep = (step) => {
    setEditingStep(step);
    setStepDescription(step.description);
  };

  const handleAddImageUrl = () => {
    if (editingImageUrl === null) {
      if (!imageUrl) return;
      setImageUrls([...imageUrls, imageUrl]);
    } else {
      setImageUrls(
        imageUrls.map((url, index) => (index === editingImageUrl ? imageUrl : url))
      );
      setEditingImageUrl(null);
}
setImageUrl('');
};

const handleDeleteImageUrl = (index) => {
Alert.alert('Delete Image', 'Are you sure?', [
{
text: 'Cancel',
style: 'cancel',
},
{
text: 'Delete',
style: 'destructive',
onPress: () => {
setImageUrls(imageUrls.filter((_, i) => i !== index));
if (editingImageUrl !== null && editingImageUrl === index) {
setEditingImageUrl(null);
}
},
},
]);
};

const handleEditImageUrl = (index) => {
setEditingImageUrl(index);
setImageUrl(imageUrls[index]);
};

const [ingredientName, setIngredientName] = useState('');
const [stepDescription, setStepDescription] = useState('');
const [imageUrl, setImageUrl] = useState('');

return (
<ScrollView contentContainerStyle={styles.container}>
<View style={styles.header}>
<Text style={styles.headerText}>Add Recipe</Text>
</View>
<View style={styles.form}>
<Text style={styles.label}>Recipe Name</Text>
<TextInput
       value={recipeName}
       onChangeText={setRecipeName}
       placeholder="Enter recipe name"
       style={styles.input}
     />
<Text style={styles.label}>Recipe Description</Text>
<TextInput
value={recipeDescription}
onChangeText={setRecipeDescription}
placeholder="Enter recipe description"
multiline={true}
style={[styles.input, styles.multilineInput]}
/>

php
Copy code
    <Text style={styles.label}>Ingredients</Text>
    <View style={styles.inputRow}>
      <TextInput
        value={ingredientName}
        onChangeText={setIngredientName}
        placeholder="Enter ingredient name"
        style={[styles.input, styles.ingredientInput]}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
        <Text style={styles.addButtonText}>{editingIngredient ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.ingredientsList}>
      {ingredients.map((ingredient) => (
        <View style={styles.ingredient} key={ingredient.id}>
          <Text>{ingredient.name}</Text>
          <View style={styles.ingredientActions}>
            <TouchableOpacity onPress={() => handleEditIngredient(ingredient)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteIngredient(ingredient.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>

    <Text style={styles.label}>Steps</Text>
    <View style={styles.inputRow}>
      <TextInput
        value={stepDescription}
        onChangeText={setStepDescription}
        placeholder="Enter step description"
        style={[styles.input, styles.stepInput]}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddStep}>
        <Text style={styles.addButtonText}>{editingStep ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.stepsList}>
      {steps.map((step, index) => (
        <View style={styles.step} key={step.id}>
          <Text>{`Step ${index + 1}. ${step.description}`}</Text>
          <View style={styles.stepActions}>
            <TouchableOpacity onPress={() => handleEditStep(step)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteStep(step.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </
        </View>
      ))}
    </View>

    <Text style={styles.label}>Image URLs</Text>
    <View style={styles.inputRow}>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Enter image URL"
        style={[styles.input, styles.imageUrlInput]}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddImageUrl}>
        <Text style={styles.addButtonText}>{editingImageUrl !== null ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.imageUrlsList}>
      {imageUrls.map((url, index) => (
        <View style={styles.imageUrl} key={index}>
          <TouchableOpacity onPress={() => handleDeleteImageUrl(index)}>
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditImageUrl(index)}>
            <Ionicons name="create-outline" size={24} color="blue" />
          </TouchableOpacity>
          <Text style={styles.imageUrlText}>{url}</Text>
        </View>
      ))}
    </View>

    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  </View>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flexGrow: 1,
padding: 20,
backgroundColor: '#fff',
},
header: {
alignItems: 'center',
marginBottom: 20,
},
headerText: {
fontSize: 20,
fontWeight: 'bold',
},
form: {},
label: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 10,
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 4,
padding: 10,
marginBottom: 20,
},
multilineInput: {
height: 120,
},
ingredientInput: {
flex: 1,
},
stepInput: {
flex: 1,
},
inputRow: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
},
addButton: {
backgroundColor: 'blue',
padding: 10,
borderRadius: 4,
marginLeft: 10,
},
addButtonText: {
color: '#fff',
fontWeight: 'bold',
},
ingredientsList: {
marginBottom: 20,
},
ingredient: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 4,
padding: 10,
marginBottom: 10,
},
ingredientActions: {
flexDirection: 'row',
},
editButton: {
color: 'blue',
marginRight: 10,
},
deleteButton: {
color: 'red',
},
stepsList: {
marginBottom: 20,
},
step: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 4,
padding: 10,
marginBottom: 10,
},
stepActions: {
flexDirection: 'row',
},
imageUrlsList: {
marginBottom: 20,
},
imageUrl: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
imageUrlText: {
marginLeft: 10,
flex:




Матвей Фесенко
продолжить
Copy code
1,
},
imageUrlsList: {
marginBottom: 20,
},
imageUrl: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
imageUrlText: {
marginLeft: 10,
flex: 1,
},
submitButton: {
backgroundColor: 'blue',
padding: 10,
borderRadius: 4,
alignItems: 'center',
},
submitButtonText: {
color: '#fff',
fontWeight: 'bold',
fontSize: 16,
},
});

export default RecipeForm;
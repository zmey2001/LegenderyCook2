import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loginpage from './pages/Loginpage';
import Registrationpage from './pages/Registrationpage';
import Privateofficepage from './pages/Privateofficepage';
import RecipeDetailsScreen from './pages/Rec';
import SearchPage from './pages/search';
import database from './pages/database';

const myDb = new database();
const Stack = createStackNavigator();
//
const App = () => {
  useEffect(() => {
    myDb.init();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Loginpage"
          component={Loginpage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registrationpage"
          component={Registrationpage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Privateofficepage"
          component={Privateofficepage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SearchPage"
          component={SearchPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RecipeDetailsScreen"
          component={RecipeDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
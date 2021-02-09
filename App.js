import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import ModifyTaskScreen from './screens/ModifyTaskScreen';
import AddTaskScreen from './screens/AddTaskScreen';

// Context
import {TaskProvider} from './contexts/TaskContext';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        <Stack.Screen name="ModifyTaskScreen" component={ModifyTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <TaskProvider>
    <AppContainer />
  </TaskProvider>
);

export default App;

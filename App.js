import { StyleSheet, Text, View } from 'react-native';
import storage from 'redux-persist/lib/storage';

import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
//import { persistStore, persistReducer } from 'redux-persist'; //persist Store React native à activer à la fin
//import { PersistGate } from 'redux-persist/integration/react'; //persist Store React native à activer à la fin
//import AsyncStorage from '@react-native-async-storage/async-storage'; //persist Store React native à activer à la fin

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DressingScreen from './screens/DressingScreen';
import SearchScreen from './screens/SearchScreen';
import AddArticleScreen from './screens/AddArticleScreen';
import ArticleScreen from './screens/ArticleScreen';
import CameraScreen from './screens/CameraScreen';
import ImportScreen from './screens/ImportScreen';
import UserScreen from './screens/UserScreen';
import ValidateCameraScreen from './screens/ValidateCameraScreen';
import ValidateImportScreen from './screens/ValidateImportScreen';

/*const reducers = combineReducers({});
const persistConfig = { key: 'DressCode', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});*/ //persist Store React native à activer à la fin
// const persistor = persistStore(store); //persist Store React native à activer à la fin

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
//const Tab = createBottomTabNavigator();
/*const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dressing" component={DressingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}*/

export default function App() {
  return (
    <Provider store={store}>
      {/*<PersistGate persistor={persistor}> //persist Store React native à activer à la fin */}

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SignIn' component={SignInScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='SignUp' component={SignUpScreen} />
          <Stack.Screen name='SearchScreen' component={SearchScreen} />
          <Stack.Screen name='DressingScreen' component={DressingScreen} />
          <Stack.Screen name='AddArticleScreen' component={AddArticleScreen} />
          <Stack.Screen name='ArticleScreen' component={ArticleScreen} />
          <Stack.Screen name='CameraScreen' component={CameraScreen} />
          <Stack.Screen name='ImportScreen' component={ImportScreen} />
          <Stack.Screen name='UserScreen' component={UserScreen} />
          <Stack.Screen
            name='ValidateCameraScreen'
            component={ValidateCameraScreen}
          />
          <Stack.Screen
            name='ValidateImportScreen'
            component={ValidateImportScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/*</PersistGate> //persist Store React native à activer à la fin */}
    </Provider>
  );
}

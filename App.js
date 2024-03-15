import React, { useEffect } from "react";
import { Text } from 'react-native';
import { StatusBar } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DressingScreen from "./screens/DressingScreen";
import SearchScreen from "./screens/SearchScreen";
import AddArticleScreen from "./screens/AddArticleScreen";
import ArticleScreen from "./screens/ArticleScreen";
import CameraScreen from "./screens/CameraScreen";
import ImportScreen from "./screens/ImportScreen";
import UserScreen from "./screens/UserScreen";
import ValidateCameraScreen from "./screens/ValidateCameraScreen";
import ValidateImportScreen from "./screens/ValidateImportScreen";

import user from "./reducers/user";

const reducers = combineReducers({ user });
const persistConfig = { key: 'Dresscode', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Définir la couleur du texte de la barre de notification en blanc
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          //initialRouteName="DressingScreen"
          >
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="DressingScreen" component={DressingScreen} />
            <Stack.Screen name="AddArticleScreen" component={AddArticleScreen} />
            <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="ImportScreen" component={ImportScreen} />
            <Stack.Screen name="UserScreen" component={UserScreen} />
            <Stack.Screen
              name="ValidateCameraScreen"
              component={ValidateCameraScreen}
            />
            <Stack.Screen
              name="ValidateImportScreen"
              component={ValidateImportScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

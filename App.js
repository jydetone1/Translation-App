import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SafeAreaView from 'react-native-safe-area-view';

import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';
import SavedScreen from './src/screens/SavedScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import colors from './utils/colors';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Saved') {
            iconName = 'heart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name='Saved'
        component={SavedScreen}
        options={{ tabBarLabel: 'Saved' }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    // <SafeAreaView>
    <NavigationContainer>
      <View onLayout={onLayout} style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontFamily: 'Roboto',
              color: '#fff',
            },

            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        >
          <Stack.Group>
            <Stack.Screen
              name='main'
              component={TabNavigator}
              options={{
                title: 'Translator',
              }}
            />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              presentation: 'containedModal',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleStyle: {
                color: colors.textColor,
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name='Language' component={LanguageScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </NavigationContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

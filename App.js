/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-get-random-values';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/page/Home';
import MyWebView from './src/page/MyWebView';
import GuideScreen from './src/page/Guide';
const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Guide">
          <Stack.Screen
            name="Guide"
            component={GuideScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '手机号登录',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="WebView"
            component={MyWebView}
            options={{
              title: '健康码',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

// export default App;

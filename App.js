import 'react-native-get-random-values';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Login,
  MyWebView,
  GuideScreen,
  HealthCode,
  Home,
  Personal,
  People,
} from './src/index';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  constructor(p) {
    super(p);
    this.state = {};
  }

  render() {
    const NavFootTab = () => {
      return (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/homefocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/homeblur.png')}></Image>
                  );
                }
              } else if (route.name === 'HealthCode') {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/healthfocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/healthblur.png')}></Image>
                  );
                }
              } else if (route.name === 'People') {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/peoplefocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/peopleblur.png')}></Image>
                  );
                }
              } else {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/personalfocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('@/assets/personalblur.png')}></Image>
                  );
                }
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: '#000',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={Home} options={{title: '首页'}} />
          <Tab.Screen
            name="HealthCode"
            component={HealthCode}
            options={{
              title: '健康码',
            }}
          />
          <Tab.Screen
            name="People"
            component={People}
            options={{title: '民意直通车'}}
          />
          <Tab.Screen
            name="Personal"
            component={Personal}
            options={{title: '我的'}}
          />
        </Tab.Navigator>
      );
    };
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
            name="NavFootTab"
            component={NavFootTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
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
              title: '热点新闻',
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

const styles = StyleSheet.create({
  tabBarIcon: {
    height: 25,
    width: 25,
  },
});

// export default App;

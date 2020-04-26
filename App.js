import 'react-native-get-random-values';
import React from 'react';
import {StyleSheet, TouchableOpacity, Button, Image, View, Platform} from 'react-native';
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
  About,
} from './src/index';
import storage from './src/store/index';
import {checkToken} from './src/api/api';

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
          screenOptions={({route, navigation}) => ({
            // 底部导航图标配置
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/homefocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/homeblur.png')}></Image>
                  );
                }
              } else if (route.name === 'HealthCode') {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/healthfocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/healthblur.png')}></Image>
                  );
                }
              } else if (route.name === 'People') {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/peoplefocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/peopleblur.png')}></Image>
                  );
                }
              } else {
                if (focused) {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/personalfocus.png')}></Image>
                  );
                } else {
                  return (
                    <Image
                      style={styles.tabBarIcon}
                      source={require('./src/assets/personalblur.png')}></Image>
                  );
                }
              }
            },
            // 底部导航，点击事件按键拦截，覆盖原生点击事件
            tabBarButton: (props) => {
              return (
                <TouchableOpacity
                  {...props}
                  onPress={async () => {
                    if (
                      route.name === 'HealthCode' ||
                      route.name === 'People'
                    ) {
                      try {
                        const token = await storage.load({key: 'token'});
                        if (token) {
                          const checkResult = await checkToken(
                            token.tokenDTO.userToken,
                          );
                          if (!checkResult.success) {
                            navigation.push('Login', {
                              nextRoute: route.name,
                            });
                          } else {
                            navigation.navigate(route.name);
                          }
                        } else {
                          navigation.push('Login', {
                            nextRoute: route.name,
                          });
                        }
                      } catch (e) {
                        navigation.push('Login', {nextRoute: route.name});
                      }
                    } else {
                      navigation.jumpTo(route.name);
                    }
                  }}
                />
              );
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
            options={{title: '民生直通车'}}
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
      <View style={{marginTop: 20, flex:1}}>
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
            // options={Login.navigationOptions}
            options={{
              title: '登录',
              headerStyle: {
                backgroundColor: '#FFF',
              },
              headerBackTitle: ' '
            }}
            // options={{
            //   title: 'login',
            //   headerStyle: {
            //     // backgroundColor: '#fff',
            //     backgroundColor: 'red'
            //   },
            //   // headerTitleAlign: 'center',
            //   headerBackTitle: ' ',
            // }}
          />
          <Stack.Screen
            name="WebView"
            component={MyWebView}
            options={
              MyWebView.navigationOptions
            }
            // options={{
            //   title: '热点新闻',
            //   headerStyle: {
            //     backgroundColor: '#fff',
            //   },
            //   headerTitleAlign: 'center',
            // }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: '关于',
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerTitleAlign: 'center',
              // headerBackTitle: ' '
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
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
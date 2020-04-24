import 'react-native-get-random-values';
import React from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import 'react-native-gesture-handler';
import storage from '../store/index';
import {Tip} from 'beeshell';
import SplashScreen from 'react-native-splash-screen';
import {WebView} from 'react-native-webview';
import {checkToken} from '@/api/api';
// 方式一： API 调用
export default class People extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      token: '',
    };
  }
  componentDidMount() {
    const {navigation} = this.props;

    this._unsubscribe = navigation.addListener('focus', async () => {
      // do something
      const token = await storage.load({key: 'token'});
      this.setState({
        token: token,
      });
    });
    storage
      .load({key: 'token'})
      .then(async (token) => {
        if (token) {
          const checkResult = await checkToken(token.tokenDTO.userToken);
          console.log(checkResult);
          console.log('tokne', token);
          if (!checkResult.success) {
            this.props.navigation.push('Login', {nextRoute: 'HealthCode'});
          } else {
            this.setState({
              token: token.tokenDTO.userToken,
              code: token.tokenDTO.code,
              userid: token.id,
            });
          }
        } else {
          this.props.navigation.push('Login', {nextRoute: 'HealthCode'});
        }
      })
      .catch((e) => {
        navigation.push('Login', {nextRoute: 'HealthCode'});
      });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    const {navigation, route} = this.props;
    // const {token = ''} = route.params;
    // console.log('路由参数', route.params);
    const {token, code, userid} = this.state;
    return (
      <WebView
        ref={(instance) => {
          // this.webView = instance;
        }}
        source={{
          uri:
            'http://211.149.250.134:8080/#/?token=' +
            token +
            '&code=' +
            code +
            '&userid=' +
            userid,
          // token,
        }}
        startInLoadingState={true}
        // onMessage={_onMessage}
        renderLoading={() => (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 10,
              }}>
              加载中...
            </Text>
          </View>
        )}
        style={{flex: 1}}
      />
    );
  }
}

const styles = StyleSheet.create({});

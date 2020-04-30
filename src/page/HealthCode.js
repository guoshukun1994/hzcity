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
import {checkToken} from '../api/api';
// 方式一： API 调用
export default class HealthCode extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      token: '',
      code: '',
      userid: '',
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    console.log('进入健康码componentDidMount')
    this._unsubscribe = navigation.addListener('focus', async () => {
      // do something
      storage
        .load({key: 'token'})
        .then(async (token) => {
          if (token) {
            const checkResult = await checkToken(token.tokenDTO.userToken);
            if (!checkResult.success) {
              this.props.navigation.push('Login', {nextRoute: 'HealthCode'});
            } else {
              console.log('componentDidMount注册的foucs监听')
              // console.log('token=' + token.tokenDTO.userToken)
              // console.log('code=' + token.tokenDTO.code)
              // console.log('userid=' + token.id)
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
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
    console.log('进入健康码componentWillUnmount')
  }
  render() {
    const {token, code, userid} = this.state;
    console.log('进入健康码render')
    return (
      <WebView
        ref={(instance) => {
          // this.webView = instance;
        }}
        source={{
          uri:
            'https://health.hangzhou.gov.cn/citybrain/health-code/#/?token=' +
            token +
            '&code=' +
            code +
            '&userid=' +
            userid,
          // token,
        }}
        startInLoadingState={true}
        mixedContentMode={'always'}
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

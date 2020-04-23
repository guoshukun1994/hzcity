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

// 方式一： API 调用
export default class HealthCode extends React.Component {
  constructor(p) {
    super(p);
    this.state = {};
  }
  async componentDidMount() {
    const {navigation} = this.props;
    try {
      const token = await storage.load({key: 'token'}); //检查是否有token,如果有token
      if (token) {
        const checkResult = checkToken(token.accessToken);
        if (!checkResult.success) {
          this.props.navigation.push('Login', {nextRoute: 'HealthCode'});
        }
        // .then((res) => {
        //   if (res.success) {
        //     refresh(token.refreshToken).then((res) => {
        //       if (res.success) {
        //         storage.save({
        //           key: 'token',
        //           data: res.data,
        //         });
        //         this.props.navigation.push('WebView', {
        //           token: res.data.accessToken,
        //         });
        //       } else {
        //         this.props.navigation.push('Login');
        //       }
        //     });
        //   } else {
        //     this.props.navigation.push('Login');
        //   }
        // });
      } else {
        this.props.navigation.push('Login', {nextRoute: 'HealthCode'});
      }
    } catch (e) {
      navigation.push('Login', {nextRoute: 'HealthCode'});
    }
  }
  render() {
    return (
      <WebView
        ref={(instance) => {
          // this.webView = instance;
        }}
        source={{
          uri: 'https://health.hangzhou.gov.cn/citybrain/health-code/#/?token=',
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

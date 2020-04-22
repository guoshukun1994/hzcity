import 'react-native-get-random-values';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
export default function MyWebView({route, navigation}) {
  // const _onMessage = (event) => {
  //   const {data} = event.nativeEvent;

  //   console.log('传处理useragent', data);
  // };
  const {token} = route.params;
  console.log('新的token', token);

  return (
    <WebView
      ref={(instance) => {
        // this.webView = instance;
      }}
      source={{
        uri:
          'https://health.hangzhou.gov.cn/citybrain/health-code/#/?token=' +
          token,
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

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
import storage from '../store/index';

export default class MyWebView extends React.Component {

  static navigationOptions = (props) => {
    const {navigation, route} = props;
    return {
      title: route.params.title,
      headerStyle: {
        backgroundColor: '#fff',
        // backgroundColor: 'red'
      },
      // headerTitleAlign: 'center',
      headerBackTitle: ' ',
    };
  };

  render() {
    const {route} = this.props;
    const {url} = route.params;
    return (
      <WebView
        // style={{marginTop}}
        ref={(instance) => {
          // this.webView = instance;
        }}
        source={{
          uri: url,
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

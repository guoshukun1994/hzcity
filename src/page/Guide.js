import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  AppRegistry,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import storage from '../store/index';

import Swiper from 'react-native-swiper';
import {checkToken, refresh} from '../api/api';

export default class GuideScreen extends Component {
  constructor(p) {
    super(p);
    this.state = {
      activeIndex: 0,
    };
  }
  componentDidMount() {
    // SplashScreen.hide();

    storage
      .load({key: 'openFlag'})
      .then((openFlag) => {
        storage
          .load({key: 'token'})
          .then((token) => {
            if (token) {
              checkToken(token.accessToken).then((res) => {
                if (res.success) {
                  refresh(token.refreshToken).then((res) => {
                    console.log(token.refreshToken);
                    if (res.success) {
                      storage.save({
                        key: 'token',
                        data: res.data,
                      });
                      this.props.navigation.replace('WebView', {
                        token: res.data.accessToken,
                      });
                      SplashScreen.hide();
                    } else {
                      this.props.navigation.replace('Home');
                      SplashScreen.hide();
                    }
                  });
                } else {
                  this.props.navigation.replace('Home');
                  SplashScreen.hide();
                }
              });
            } else {
              this.props.navigation.replace('Home');
              SplashScreen.hide();
            }
          })
          .catch((e) => {
            this.props.navigation.replace('Home');
            SplashScreen.hide();
          });
      })
      .catch((e) => {
        SplashScreen.hide();
      });
  }
  render() {
    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        showsPagination={true}
        showsButtons={false}
        loop={false}
        paginationStyle={
          {bottom: 10}
          // 主要分成三屏，三个View
        }>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 276, width: 288, marginTop: 80}}
            source={require('../assets/guideImg1.png')}
          />
          <Image source={require('../assets/guideText1.png')} />
          <Image
            style={{height: 27.5, width: 124, marginBottom: 30}}
            source={require('../assets/logo.png')}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 276, width: 288, marginTop: 80}}
            source={require('../assets/guideImg2.png')}
          />
          <Image source={require('../assets/guideText2.png')} />
          <Image
            style={{height: 27.5, width: 124, marginBottom: 30}}
            source={require('../assets/logo.png')}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 276, width: 288, marginTop: 80}}
            source={require('../assets/guideImg3.png')}
          />
          <TouchableOpacity
            onPress={() => {
              //点击立即使用，保存启动图是否需要再次打开
              storage.save({
                key: 'openFlag',
                data: true,
              });
              this.props.navigation.replace('Home');
            }}>
            <Image source={require('../assets/guideText3.png')} />
          </TouchableOpacity>

          <Image
            style={{height: 27.5, width: 124, marginBottom: 30}}
            source={require('../assets/logo.png')}
          />
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

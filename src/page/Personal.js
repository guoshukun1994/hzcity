import 'react-native-get-random-values';
import React from 'react';
import {
  TextInput,
  ImageBackground,
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
// 方式一： API 调用
export default class Personal extends React.Component {
  constructor(p) {
    super(p);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/person-back.png')}
          //   resizeMode="contain"
          style={{height: 200, alignItems: 'center'}}>
          <View
            style={{
              height: 65,
              width: 65,
              backgroundColor: 'gray',
              borderRadius: 50,
              marginTop: 70,
            }}></View>
          <Text style={{marginTop: 18, color: '#FEFEFE', fontSize: 18}}>
            欢迎你 XX
          </Text>
        </ImageBackground>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
          }}>
          <Image
            style={{height: 14, width: 14, marginHorizontal: 15}}
            source={require('@/assets/info.png')}></Image>
          <Text style={{color: '#1c1c1c', flex: 1}}>个人信息</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Image
            style={{height: 14, width: 14, marginHorizontal: 15}}
            source={require('@/assets/share.png')}></Image>
          <Text style={{color: '#1c1c1c', flex: 1}}>分享给好友</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}>
          <Text style={{textAlign: 'center', color: '#818180', marginTop: 30}}>
            退出登录
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

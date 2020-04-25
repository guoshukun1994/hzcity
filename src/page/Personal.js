import 'react-native-get-random-values';
import React from 'react';
import {
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
import {Tip, Dialog} from 'beeshell';

// 方式一： API 调用
import {checkToken, getUserInfo} from '../api/api';
export default class Personal extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      isLogin: false,
      userInfo: {id: '', userName: '', idCard: '', telephone: '', tokenDTO: ''},
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      const token = await storage.load({key: 'token'});
      getUserInfo(token.tokenDTO.userToken, {
        code: token.tokenDTO.code,
        userId: token.id,
      }).then((res) => {
        if (res.data) {
          if (res.data.telephone.length == 11) {
            res.data.telephone =
              res.data.telephone.substring(0, 3) +
              '****' +
              res.data.telephone.substring(7, 12);
          }
          this.setState({
            userInfo: res.data,
            isLogin: true,
          });
        }
      });
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  render() {
    const {navigation} = this.props;
    const {isLogin, userInfo} = this.state;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/person-back.png')}
          style={{height: 200, alignItems: 'center'}}>
          <Image
            style={{
              height: 65,
              width: 65,
              backgroundColor: 'gray',
              borderRadius: 50,
              marginTop: 70,
            }}
            source={require('../assets/avatar.png')}></Image>

          {isLogin ? (
            <Text style={{marginTop: 18, color: '#FEFEFE', fontSize: 18}}>
              欢迎你 {userInfo.userName}
            </Text>
          ) : (
            <TouchableOpacity
              style={{
                width: 75,
                height: 27,
                marginTop: 15,
                borderColor: '#fff',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => {
                navigation.push('Login', {nextRoute: 'Personal'});
              }}>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 13}}>
                登录
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
          }}>
          <Image
            style={{height: 20, width: 18, marginHorizontal: 15}}
            source={require('../assets/info.png')}></Image>
          <Text style={{color: '#333333', flex: 1, fontSize: 14}}>
            个人信息
          </Text>
          <Text style={{color: '#333333', marginRight: 15}}>
            {userInfo.telephone}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
          onPress={() => {
            navigation.push('About');
          }}>
          <Image
            style={{height: 20, width: 18, marginHorizontal: 15}}
            source={require('../assets/about.png')}></Image>
          <Text style={{color: '#1c1c1c', flex: 1, fontSize: 14}}>
            关于杭州城市大脑
          </Text>
          <Image
            source={require('../assets/right.png')}
            style={{width: 8, height: 12, marginRight: 13}}></Image>
        </TouchableOpacity>

        {isLogin ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginTop: 30,
              paddingVertical: 10,
            }}
            onPress={() => {
              this.dialog.open();
            }}>
            <Text style={{textAlign: 'center', color: 'blue'}}>退出登录</Text>
          </TouchableOpacity>
        ) : null}
        <Dialog
          ref={(c) => {
            this.dialog = c;
          }}
          title=""
          titleStyle={{height: 0}}
          bodyText="确定退出杭州城市大脑"
          cancelable={true}
          cancelLabelText="取消"
          confirmLabelText="确定"
          confirmCallback={() => {
            storage.save({
              key: 'token',
              data: '',
            });
            this.setState({
              userInfo: {},
              isLogin: false,
            });
            Tip.show('退出成功', 1000, 'center');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyTextStyle: {
    width: '100%',
    fontSize: 16,
    lineHeight: 24,
  },
});

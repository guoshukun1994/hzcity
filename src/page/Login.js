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
  Button,
} from 'react-native';
import 'react-native-gesture-handler';
import storage from '../store/index';
import {Tip} from 'beeshell';
import {getCode, verifyCode} from '../api/api';
// 方式一： API 调用
export default class Login extends React.Component {
  // static navigationOptions = (props) => {
  //   const {navigation} = props;
  //   return {
  //     title: '手机号登录',
  //     headerStyle: {
  //       backgroundColor: '#fff',
  //     },
  //     headerLeft: () => (
  //       <Button
  //         onPress={() => {
  //           console.log('navigation', p);

  //           // p.navigation.jumpTo('Home');
  //         }}
  //         title="Info"
  //         color="#fff"
  //       />
  //     ),
  //     headerTitleAlign: 'center',
  //   };
  // };
  constructor(p) {
    super(p);
    this.state = {
      phoneNo: '', //手机号
      code: '', //验证码
      count: '获取验证码', //倒计时
    };
  }
  onChangeText(text) {
    this.setState({
      phoneNo: text,
    });
  }
  getcount = () => {
    const {count} = this.state;
    this.countDown(count);
  };
  countDown(count) {
    if (count == '获取验证码') {
      this.setState({
        count: 59,
      });
      setTimeout(() => this.countDown(59), 1000);
    } else if (count == 0) {
      this.setState({
        count: '获取验证码',
      });
    } else {
      this.setState({
        count: count - 1,
      });
      setTimeout(() => this.countDown(count - 1), 1000);
    }
  }
  render() {
    const {navigation, route} = this.props;
    const {nextRoute} = route.params;
    const {phoneNo, code, count} = this.state;
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Image source={require('../assets/back.png')} style={{width: '100%'}} />
        <View style={{...styles.loginInput, marginTop: 20}}>
          <Image source={require('../assets/phone.png')} />
          <TextInput
            style={{flex: 1, padding: 0, fontSize: 16, marginLeft: 15}}
            onChangeText={(text) => {
              this.setState({
                phoneNo: text,
              });
            }}
            placeholder="请输入手机号"
            value={phoneNo}
          />
        </View>
        <View style={{...styles.loginInput, marginTop: 20}}>
          <Image source={require('../assets/code.png')} />
          <TextInput
            style={{flex: 1, padding: 0, fontSize: 16, marginLeft: 15}}
            onChangeText={(text) => {
              this.setState({
                code: text,
              });
            }}
            placeholder="验证码"
            value={code}
          />
          <TouchableOpacity
            style={styles.count}
            onPress={() => {
              if (count == '获取验证码') {
                if (/^1[3-9][0-9]{9}$/.test(phoneNo)) {
                  getCode({phoneNo: phoneNo})
                    .then((res) => {
                      console.log(res);

                      if (res.success) {
                        this.getcount();

                        Tip.show('验证码发送成功', 1000, 'center');
                      } else {
                        Tip.show('验证码发送失败', 1000, 'center');
                      }
                    })
                    .catch((e) => {
                      Tip.show('网络超时', 1000, 'center');
                    });
                } else {
                  Tip.show('请输入正确的手机号', 1000, 'center');
                }
              } else {
                Tip.show('请稍后获取验证码', 1000, 'center');
              }
            }}>
            <Text style={styles.countText}>{count}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            if (!phoneNo) {
              Tip.show('请输入手机号', 1000, 'center');
            } else if (!code) {
              Tip.show('请输入验证码', 1000, 'center');
            } else {
              verifyCode({phoneNo, code}).then((res) => {
                if (res.data) {
                  storage.save({
                    key: 'token',
                    data: res.data.tokenDTO,
                  });
                  navigation.navigate(nextRoute, {
                    token: res.data.tokenDTO.accessToken,
                  });
                } else {
                  Tip.show(res.message, 1000, 'center');
                }
              });
            }
          }}>
          <Text style={{color: '#fff', fontSize: 18}}>登录</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor
    // marginTop: 22,
    // backgroundColor: 'red',
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: 'red',
  },
  account: {
    alignItems: 'center',
    // backgroundColor: 'green',
    borderWidth: 0,
    marginTop: 20,
  },

  loginInput: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    // borderWidth: 0,
  },
  login: {
    alignItems: 'center',
  },
  loginBtn: {
    borderRadius: 5,
    height: 44,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#407ADA',
  },
  count: {
    justifyContent: 'center',
  },
  countText: {
    width: 90,
    textAlign: 'center',
    color: '#407ADA',
  },
  modalBotoom: {
    flexDirection: 'row',
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

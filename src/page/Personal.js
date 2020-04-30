import 'react-native-get-random-values';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableHighlight
} from 'react-native';
import 'react-native-gesture-handler';
import storage from '../store/index';
import {Tip, Dialog} from 'beeshell';

// 方式一： API 调用
import {checkToken, getUserInfo} from '../api/api';
import { ceil } from 'react-native-reanimated';
export default class Personal extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      isLogin: false,
      userInfo: {id: '', userName: '', idCard: '', telephone: '', tokenDTO: ''},
      isAuth: false
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
          console.log(res.data)
          let authSts = '未认证'
          if (res.data.telephone.length == 11) {
            res.data.telephone =
              res.data.telephone.substring(0, 3) +
              '****' +
              res.data.telephone.substring(7, 12);
          }
          if(res.data.idCard != null){
            console.log(res.data.idCard)
            res.data.idCard = 
            res.data.idCard.substring(0, 2) +
              '**************' +
            res.data.idCard.substring(14, 18);
            this.setState({isAuth: true})
            authSts = '已认证'
            // this.setState({isAuth: false})
          }
          this.setState({
            userInfo: {...res.data, authSts },
            isLogin: true,
          });
        }
      });
    });
  }
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }
  render() {
    const {navigation} = this.props;
    const {isLogin,isAuth, userInfo} = this.state;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/person-back.png')}
          style={{height: 200, alignItems: 'center'}}>
          {/* <Image
            style={{
              height: 65,
              width: 65,
              backgroundColor: 'gray',
              borderRadius: 50,
              // marginTop: 42.5,
              marginTop: 70,
            }}
            source={require('../assets/avatar.png')}></Image> */}

          {isLogin ? (
              <View style={{alignItems:"center"}}>
                 <Image
                  style={{
                    height: 65,
                    width: 65,
                    backgroundColor: 'gray',
                    borderRadius: 50,
                    marginTop: 35,
                    // marginTop: 70,
                  }}
                  source={require('../assets/avatar.png')}></Image>
                <Text style={{marginTop: 18, color: '#FEFEFE', fontSize: 18}}>
                  欢迎你 {userInfo.userName}
                </Text>
                { !isAuth ?
                  <TouchableOpacity style={{width:75, height:27, borderColor: '#fff',marginTop: 10,backgroundColor: '#fff',borderRadius: 14.5}}
                      onPress={()=> {
                        navigation.push('authPage',{nextRoute:'Personal'});
                      }}>
                      <Text style={{textAlign: 'center', color: 'black', fontSize: 14,lineHeight: 29}}
                            >
                        未认证
                      </Text>
                  </TouchableOpacity>
                :
                  <View style={{width:75, height:27, borderColor: '#fff',marginTop: 10,backgroundColor: '#2776FA',borderRadius: 14.5}}>
                      <Text style={{textAlign: 'center', color: '#fff', fontSize: 14,lineHeight: 29,}}>
                        已认证
                      </Text>
                  </View>
                }
              </View>
          ) : (
            <View style={{alignItems: "center"}}>
              {/* <TouchableOpacity style={{width:73, height:27, borderColor: '#fff'}}>
                  <Text style={{textAlign: 'center', color: '#fff', fontSize: 13,marginTop: 24,}}
                        onPress={()=> {
                          navigation.push('Login',{nextRoute:'Personal'})
                        }}>
                    个人登录
                  </Text>
              </TouchableOpacity> */}
            <Image
              style={{
                height: 65,
                width: 65,
                backgroundColor: 'gray',
                borderRadius: 50,
                // marginTop: 42.5,
                marginTop: 70,
              }}
              source={require('../assets/avatar.png')}></Image>
            <TouchableOpacity
                style={{
                  width: 75,
                  height: 27,
                  marginTop: 15,
                  borderColor: '#fff',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20
                }}
                onPress={() => {
                  navigation.push('Login', {nextRoute: 'Personal'});
                }}>
                <Text style={{textAlign: 'center', color: '#fff', fontSize: 13}}>
                  登录
                </Text>
            </TouchableOpacity>
                
                {/* <Text style={{extAlign: 'center', color: '#fff', fontSize: 13,marginTop: 22}}>/</Text> */}
            {/* <TouchableOpacity
              style={{
                width: 75,
                height: 27,
                marginTop: 15,
                borderColor: '#fff',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginLeft: 15
              }}
              onPress={()=> {
                navigation.push('WebView',{title:'企业登录',url:"https://qinqing.hangzhou.gov.cn/qqent/"})
              }}>
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 13}}>
              企业登录
              </Text>
            </TouchableOpacity> */}
              {/* <TouchableOpacity style={{width:73, height:27, borderRadius:'30%'}}>
                <Text style={{textAlign: 'center', color: '#fff', fontSize: 13,marginTop: 24}}
                      onPress={()=> {
                        navigation.push('WebView',{title:'企业登录',url:"https://qinqing.hangzhou.gov.cn/qqent/"})
                      }}>
                  企业登录
                </Text>
              </TouchableOpacity> */}
            </View>
          )}
        </ImageBackground>

        <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: '#fff',
            }}
            onPress={()=>{
              if(!isLogin){
                Tip.show('请先登录！', 2000, 'center')
              }else if(!isAuth){
                Tip.show('请点击未认证进行实名认证！', 2000, 'center')
              }else{
                navigation.push('personalInfo', {nextRoute: 'Personal',userInfo});
              }
            }}
            >
            <Image
              style={{height: 20, width: 18, marginHorizontal: 15}}
              source={require('../assets/info.png')}></Image>
            <Text style={{color: '#333333', flex: 1, fontSize: 14}}>
              个人信息
            </Text>
            <Text style={{color: '#333333', marginRight: 15}}>
              {userInfo.telephone}
            </Text>
            <Image
              source={require('../assets/right.png')}
              style={{width: 8, height: 12, marginRight: 13}}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
          onPress={() => {
            navigation.push('advise', {nextRoute: 'Personal'});
          }}>
          <Image
            style={{height: 20, width: 18, marginHorizontal: 15}}
            source={require('../assets/adviseIcon.png')}></Image>
          <Text style={{color: '#1c1c1c', flex: 1, fontSize: 14,paddingLeft:-2}}>
            建议反馈
          </Text>
          <Image
            source={require('../assets/right.png')}
            style={{width: 8, height: 12, marginRight: 13}}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
          onPress={() => {
            navigation.push('WebView', {
              title: '用户协议与隐私政策',
              url: 'http://www.todosoft.com.cn/td/userprivacy.html',
            });
          }}>
          <Image
            style={{height: 20, width: 18, marginHorizontal: 15}}
            source={require('../assets/secretIcon.png')}></Image>
          <Text style={{color: '#1c1c1c', flex: 1, fontSize: 14}}>
            用户协议与隐私政策
          </Text>
          <Image
            source={require('../assets/right.png')}
            style={{width: 8, height: 12, marginRight: 13}}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
          onPress={() => {
            navigation.push('WebView', {
              title: '关于',
              url: 'https://health.hangzhou.gov.cn/msztc/#/appsynopsis',
            });
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

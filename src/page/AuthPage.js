import 'react-native-get-random-values';
import React from 'react';
import {
    StyleSheet, 
    TextInput, 
    View, 
    Text,
    Image
} from 'react-native';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tip } from 'beeshell';
import storage from '../store/index';

import { realNmAuth } from '../api/api';


export default class AuthPage extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
        userName: '',
        idCard: ''
    };
  }

  toAuth = async(data) =>{
    const token = await storage.load({key: 'token'});
    realNmAuth(token.tokenDTO.userToken,data)
    .then((res) => {
        console.log('realNmAuth')
        console.log(res)
        if(res.success){
            Tip.show('认证成功',2000,'center')
            navigation.goBack()
        }else{
            Tip.show(res.message,2000,'center')
            // navigation.goBack()
        }
      }).catch((e)=>{
        console.log('realNmAuthcatch')
        console.log(e)
      })
  }

  render() {
    const {navigation} = this.props;
    return (
        <View style={{backgroundColor: '#fff',flex: 1,alignItems: "center"}}>
             <Image
                  style={{
                    height: 43,
                    width: '100%',
                  }}
                  source={require('../assets/authTop.png')}></Image>
            <View style={{width: '100%',paddingLeft: 20}}>
                <Text style={{fontSize: 24,marginTop: 14}}>实名认证</Text>
                <Text style={{width: 320,height: 40,fontSize: 14,marginTop: 12, color: '#999999'}}>
                    为有效保障您的信息安全，请填写与您身份证一致的信息。
                </Text>
            </View>
            <View style={{width: '100%',paddingLeft: 20,marginTop: 29}}>
                <Text style={{fontSize: 24}}>真实姓名</Text>
                <TextInput style={{fontSize: 14,marginTop: 10, borderBottomWidth:1, borderBottomColor: '#F4F4F4'}}
                           editable
                           placeholder="请填写您本人的真实姓名"
                           placeholderTextColor={{color: '#999999', fontSize: 14}}
                           onChangeText={(realName) => {
                                this.setState({
                                    realName
                                })
                            }} />
            </View>
            <View style={{width: '100%',paddingLeft: 20,marginTop: 39,marginBottom: 89}}>
                <Text style={{fontSize: 24}}>身份证号</Text>
                <TextInput style={{fontSize: 14,marginTop: 10, borderBottomWidth:1, borderBottomColor: '#F4F4F4'}}
                           editable
                           placeholder="请填写您本人的身份证号码"
                           placeholderTextColor={{color: '#999999', fontSize: 14}}
                           onChangeText={(idCard) => {
                                this.setState({
                                    idCard
                                })
                            }} />
            </View>
            <TouchableOpacity 
                style={{
                    width: '100%',
                    height: 40,
                    marginHorizontal: 16
                }}
                onPress={()=>{
                    if(!this.state.realName){
                        Tip.show('真实姓名不能为空！',2000,'center')
                    }else if(!this.state.idCard){
                        Tip.show('身份证号不能为空！',2000,'center')
                    }else if((this.state.idCard.length) !== 18){
                        console.log(this.state.idCard.length)
                        Tip.show('请输入正确的身份证号',2000,'center')
                    }else{
                        this.toAuth({
                            userName: this.state.userName,
                            idCard: this.state.idCard
                        }).then(()=>{

                        }).catch(()=>{

                        })
                    }
                }}>
                <Image
                    style={{
                        height: 40,
                        width: 343,
                    }}
                    source={require('../assets/authbtn.png')} />
            </TouchableOpacity>
        </View>
    );
  }
}

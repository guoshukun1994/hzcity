import 'react-native-get-random-values';
import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tip } from 'beeshell';


function UselessTextInput(props) {
    return (
      <TextInput
        {...props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
        editable
        maxLength={40}
      />
    );
  }

export default class Advise extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
        commitText: ''
    };
  }

  render() {
    const {navigation} = this.props;
    return (
        <View style={{alignItems: "center",backgroundColor: '#F7F9FD',flex:1}}>
            <View style={{width:70,height: 26,width: '100%',lineHeight:26}}>
                <Text style={{fontSize: 14, color:'#999999',textAlign: "left",justifyContent: "center",marginLeft: 11,marginTop: 15}}>问题与意见</Text>
            </View>
            <View
                style={{
                backgroundColor: '#fff',
                width: '100%',
                height: 261,
                marginTop: 26,
                alignItems:'center',
                paddingHorizontal: 16
                }}>
                <UselessTextInput
                placeholder="请填写您的问题描述以便我们提供更好的服务与帮助"
                placeholderTextColor={{color: '#999999', fontSize: 14}}
                multiline
                numberOfLines={4}
                onChangeText={(text,) => {
                    this.setState({
                        commitText: text
                    })
                }}
                    
                />
            </View>
            <Text style={{fontSize: 20,color: '#FFF',paddingTop: 5,textAlign:'center',width: 343, height:40,justifyContent:"center", backgroundColor: '#377CFF',marginTop: 130,borderRadius: 8,marginBottom: 334}}
            onPress={()=>{
                if(!this.state.commitText){
                Tip.show('提交内容不能为空！',2000,'center')
                }else {
                Tip.show('提交成功',2000,'center')
                console.log(navigator)
                navigation.goBack()
                }
            }}>提交</Text>
        </View>
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

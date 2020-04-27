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
        maxLength={200}
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
        <View style={{alignItems: "center",backgroundColor: '#F7F9FD',flex: 1}}>
            <View style={{width:'100%',height: 20,paddingTop: 12}}>
                <Text style={{fontSize: 14, color:'#999999',marginLeft: 12}}>问题与意见</Text>
            </View>
            <View
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  height: 261,
                  alignItems:'center',
                  top: 26,
                  // paddingBottom: 210,
                  // paddingVertical: 0,
                  padding: 0
                }}
                >
                <UselessTextInput
                    placeholder="请填写您的问题描述以便我们提供更好的服务与帮助"
                    placeholderTextColor={{color: '#999999', fontSize: 14}}
                    multiline
                    numberOfLines={10}
                    onChangeText={(text,) => {
                        this.setState({
                            commitText: text
                        })
                    }}
                />
            </View>
            <Text style={{fontSize: 20,color: '#FFF',paddingTop: 5,textAlign:'center',width: 343, height:40,justifyContent:"center", backgroundColor: '#377CFF',marginTop: 100,borderRadius: 6,marginBottom: 334}}
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

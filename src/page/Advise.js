import 'react-native-get-random-values';
import React from 'react';
import {StyleSheet, TextInput, View, Text,ScrollView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tip } from 'beeshell';
import { Colors } from 'react-native/Libraries/NewAppScreen';


//如果有多个需要封装的TextInput属性时作为提取的父组件使用
// function UselessTextInput(props) {
//     return (
//       <TextInput
//         {...props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
//         editable
//         maxLength={200}
//         style={{
//           textAlign: 'left',
//           textAlignVertical: 'top'
//         }}
//       />
//     );
//   }

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
      <ScrollView style={{flex: 1}}>
          <View style={{alignItems: "center",backgroundColor: '#F7F9FD',flex:1}}>
            <View style={{width:70,width: '100%',paddingTop:15}}>
                <Text style={{fontSize: 14, color:'#999999',marginLeft: 11}}>问题与意见</Text>
            </View>
            <View
                style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    height: 261,
                    marginTop: 15,
                    paddingTop: 10,
                    paddingHorizontal: 16
                }}>
                <TextInput
                    placeholder="请填写您的问题描述以便我们提供更好的服务与帮助"
                    placeholderTextColor={{color: '#999999', fontSize: 14}}
                    multiline
                    // numberOfLines={8}
                    editable
                    autoCapitalize="none"
                    maxLength={150}
                    onChangeText={(text,) => {
                        this.setState({
                            commitText: text
                        })
                    }}   
                />
            </View>

            {/*运行在安卓设备时背景有圆角， 但是在ios设备上没有圆角，背景依然显示为一个矩形。原因是ios中的Text组件不支持borderRadius这样的api。  */}
              <View style={{
                    width: 343, 
                    height:40, 
                    backgroundColor: '#377CFF',
                    borderRadius: 6,
                    paddingTop: 8,
                    marginTop: 100,
                    marginBottom: 334,
                  }}
              >
                <Text style={{
                    width: 343, 
                    height:40, 
                    fontSize: 20,
                    color: '#FFF',
                    textAlign:'center',
                    backgroundColor: '#00000000',
                  }}

                  //建议反馈提交
                  onPress={()=>{
                    if(!this.state.commitText){
                      Tip.show('提交内容不能为空！',2000,'center')
                    }else {
                      Tip.show('提交成功',2000,'center')
                      console.log(navigator)
                      navigation.goBack()
                    }
                  }}
              >提交</Text>
           </View>
        </View>

      </ScrollView>
            );
  }
}

const styles = StyleSheet.create({
  
});

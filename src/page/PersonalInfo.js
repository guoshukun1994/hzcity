import 'react-native-get-random-values';
import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tip } from 'beeshell';

export default class PersonalInfo extends React.Component {
  constructor(p) {
    super(p);
    // console.log('constructor')
    // console.log(p.userInfo)
    this.state = {
        userInfo: {id: '', userName: '', idCard: '', telephone: '', tokenDTO: '', authSts: ''}
    };
  }

  componentDidMount(){
      console.log(this.props)
    const {userInfo} = this.props.route.params;
    console.log('这里是个人信息展示页面')
    console.log(userInfo)
    this.setState({
        userInfo
    })
  }

  render() {
    const {userInfo} = this.state
    console.log('render')
    // console.log(userInfo)
    return (
        <View style={{backgroundColor: '#fff',flex: 1}}>
            <View style={{height: 18}}></View>
            <View style={styles.textStyle}>
                <Text style={styles.leftText}>手机号</Text><Text style={styles.rightText}>{userInfo.telephone}</Text>
            </View>
            <View style={styles.textStyle}>
                <Text style={styles.leftText}>姓名</Text><Text style={styles.rightText}>{userInfo.userName}</Text>
            </View>
            <View style={styles.textStyle}>
                <Text style={styles.leftText}>身份证号</Text><Text style={styles.rightText}>{userInfo.idCard}</Text>
            </View>
            <View style={styles.lastText} >
                <Text style={styles.leftText}>认证方式</Text><Text style={styles.rightText}>{userInfo.authSts}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    textStyle: {
        flexDirection: "row", 
        width: '100%', 
        height: 50, 
        alignItems: "center", 
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#F2F2F2',
    },
    lastText: {
        flexDirection: "row", 
        width: '100%', 
        height: 50, 
        alignItems: "center", 
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#F2F2F2',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2'
    },
    leftText: {
        fontSize: 16,
        color: '#333333'
    },
    rightText: {
        fontSize: 14,
        color: '#878787'
    }
})


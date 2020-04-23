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
} from 'react-native';
import 'react-native-gesture-handler';
import storage from '../store/index';
import {Tip} from 'beeshell';
// 方式一： API 调用
export default class People extends React.Component {
  constructor(p) {
    super(p);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
        }}></ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

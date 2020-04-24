import 'react-native-get-random-values';
import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
// 方式一： API 调用
export default class About extends React.Component {
  constructor(p) {
    super(p);
    this.state = {};
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 16}}>
          &emsp;&emsp;杭州城市大脑是提升城市数字化水平，实现城市治理现代化的重要抓手。杭州城市大脑起步于2016年4月，以交通领域为突破口，开启了利用大数据改善城市交通的探索，如今已迈出了从治堵向治城跨越的步伐，取得了许多阶段性的成果目前，杭州城市大脑的应用场景不断丰富，已形成11大系统、48个场景同步推进的良好局面。2020年3月31日，习近平总书记在杭州城市大脑运营指挥中心，观看“数字杭州”建设情况，了解杭州运用健康码、云服务等手段推进疫情防控和复工复产的做法。习近平说，城市大脑是建设“数字杭州”的重要举措。通过大数据、云计算、人工智能等手段推进城市治理现代化，大城市也可以变得更“聪明”。从信息化到智能化再到智慧化，是建设智慧城市的必由之路，前景广阔。
        </Text>
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

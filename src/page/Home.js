import 'react-native-get-random-values';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import storage from '../store/index';
import Swiper from 'react-native-swiper';
import {getNewsList, checkToken, getNewsImageById} from '../api/api';
// import {toDate} from '../utils/toDate'
// 方式一： API 调用
export default class Home extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      newsList: [], //新闻列表
    };
  }
  componentDidMount() {
    getNewsList().then((res) => {
      this.setState({
        newsList: res.data,
      });
    });
  }

  toDate = (time) =>{
    // 需要的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    D += '';
    h += '';
    m += '';
    s += '';
    D.length === 1 ? D = '0'+D : D;
    h.length === 1 ? h = '0'+h : h;
    m.length === 1 ? m = '0'+m : m;
    s.length === 1 ? s = '0'+s : s;
    return Y + M + D +' '+ h+':' + m + ':' + s   // 2019-06-10 11:45:39
}

  _renderNewsList = () => {
    const {newsList} = this.state;
    const {navigation} = this.props;
    return newsList.map((item, index) => {
      let time = this.toDate(item.Time);
      return (
        <TouchableOpacity
          key={index}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
          }}
          onPress={() => {
            //作为一个栈路由存在的
            // navigation.push('WebView', {title: '热点新闻', url: item.url});
            navigation.push('WebView', {title: '热点新闻', url: item.Url});
          }}>
          <View
            style={{flex: 1, justifyContent: 'space-between', marginRight: 30}}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{color: '#333333', fontSize: 15,marginBottom: 20}}>
              {/* {item.title} */}
              {item.Title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <Text style={{width: 90,height: 15,color: '#999999', fontSize: 11,marginRight: 20}}>
                {/* {item.newsSource} */}
                {item.GroupName}
              </Text>
              <Text style={{color: '#999999', fontSize: 11,marginRight: 200,width: 120,height: 15}}>
                {/* {item.createTime} */}
                {time}
              </Text>
            </View>
          </View>
          {/* <Image
            source={{
              uri:
                'https://minapp-test.hzcitybrain.com/phoneapi/getNewsImage?nid=' +
                item.id,
            }}
            style={{height: 82, width: 82}}></Image> */}
        </TouchableOpacity>
      );
    });
  };
  render() {
    const {navigation} = this.props;

    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 283}}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            showsPagination={true}
            showsButtons={false}
            loop={false}
            paginationStyle={
              {bottom: 70}
              // 主要分成三屏，三个View
            }>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{height: 276, width: '100%'}}
                source={require('../assets/banner1.png')}>
                {/* <Image
                  style={{
                    width: 124,
                    height: 32,
                    marginTop: 30,
                    marginLeft: 14,
                  }}
                  source={require('../assets/bannertitle.png')}></Image> */}
              </ImageBackground>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{height: 276, width: '100%'}}
                source={require('../assets/banner2.png')}>
                {/* <Image
                  style={{
                    width: 124,
                    height: 32,
                    marginTop: 30,
                    marginLeft: 14,
                  }}
                  source={require('../assets/bannertitle.png')}></Image> */}
              </ImageBackground>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{height: 276, width: '100%'}}
                source={require('../assets/banner3.png')}>
                {/* <Image
                  style={{
                    width: 124,
                    height: 32,
                    marginTop: 30,
                    marginLeft: 14,
                  }}
                  source={require('../assets/bannertitle.png')}></Image> */}
              </ImageBackground>
            </View>
          </Swiper>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            borderRadius: 10,
            marginTop: -60,
          }}>
          <Card
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                height: 94,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                storage
                  .load({key: 'token'})
                  .then(async (token) => {
                    if (token) {
                      const checkResult = await checkToken(
                        token.tokenDTO.userToken,
                      );
                      if (!checkResult.success) {
                        navigation.push('Login', {
                          nextRoute: 'HealthCode',
                        });
                      } else {
                        navigation.navigate('HealthCode');
                      }
                    } else {
                      navigation.push('Login', {
                        nextRoute: 'HealthCode',
                      });
                    }
                  })
                  .catch((e) => {
                    navigation.push('Login', {nextRoute: 'HealthCode'});
                  });
              }}>
              <Image
                style={{height: 50, width: 50}}
                source={require('../assets/healthIcon.png')}></Image>
              <Text style={{fontSize: 12}}>健康码</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 94,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                storage
                  .load({key: 'token'})
                  .then(async (token) => {
                    if (token) {
                      const checkResult = await checkToken(
                        token.tokenDTO.userToken,
                      );
                      if (!checkResult.success) {
                        navigation.push('Login', {
                          nextRoute: 'People',
                        });
                      } else {
                        navigation.navigate('People');
                      }
                    } else {
                      navigation.push('Login', {
                        nextRoute: 'People',
                      });
                    }
                  })
                  .catch((e) => {
                    navigation.push('Login', {nextRoute: 'People'});
                  });
              }}>
              <Image
                style={{height: 50, width: 50}}
                source={require('../assets/peopleIcon.png')}></Image>
              <Text style={{fontSize: 12}}>民生直通车</Text>
            </TouchableOpacity>
          </Card>
        </View>
        <ScrollView style={{paddingHorizontal: 16, flex: 1, marginTop: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 16, height: 20, marginRight: 5}}
              source={require('../assets/hot.png')}></Image>
            <Text style={{color: '#333333', fontSize: 16}}>热点动态</Text>
          </View>
          {this._renderNewsList()}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

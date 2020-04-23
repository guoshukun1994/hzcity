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
  ImageBackground,
} from 'react-native';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import storage from '../store/index';
import {Tip} from 'beeshell';
import Swiper from 'react-native-swiper';
import {getNewsList, checkToken} from '../api/api';
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
  _renderNewsList = () => {
    const {newsList} = this.state;
    const {navigation} = this.props;
    return newsList.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
          }}
          onPress={() => {
            //作为一个栈路由存在的
            navigation.push('WebView', {url: item.url});
          }}>
          <View
            style={{flex: 1, justifyContent: 'space-between', marginRight: 30}}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{color: '#333333', fontSize: 15}}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#999999', fontSize: 11}}>
                {item.newsSource}
              </Text>
              <Text style={{color: '#999999', fontSize: 11}}>
                {item.createTime}
              </Text>
            </View>
          </View>
          <Image
            source={{
              uri: item.imgUrl,
            }}
            style={{height: 82, width: 82}}></Image>
        </TouchableOpacity>
      );
    });
  };
  render() {
    const {navigation} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              <Image
                style={{height: 276, width: '100%'}}
                source={require('@/assets/banner1.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 276, width: '100%'}}
                source={require('../assets/banner2.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 276, width: '100%'}}
                source={require('../assets/banner3.png')}
              />
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
                      const checkResult = await checkToken(token.accessToken);
                      console.log(checkResult);
                      console.log('tokne', token);
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
                source={require('@/assets/healthIcon.png')}></Image>
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
                      const checkResult = await checkToken(token.accessToken);
                      console.log(',,,,,,,,,', checkResult);

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
                    console.log(e, 'eee');

                    navigation.push('Login', {nextRoute: 'People'});
                  });
              }}>
              <Image
                style={{height: 50, width: 50}}
                source={require('@/assets/peopleIcon.png')}></Image>
              <Text style={{fontSize: 12}}>民意直通车</Text>
            </TouchableOpacity>
          </Card>
        </View>
        <ScrollView style={{paddingHorizontal: 16, flex: 1}}>
          <View
            style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 16, height: 20, marginRight: 5}}
              source={require('@/assets/hot.png')}></Image>
            <Text style={{color: '#333333', fontSize: 16}}>热点动态</Text>
          </View>
          {this._renderNewsList()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

//获取屏幕宽度
let width = Dimensions.get('window').width;

export default class Detail extends Component {

  static navigationOptions = {

  }
  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false,
      playing: false,
      videoLoaded: false, //视频是否加载完，要开始播放之前
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
    };
  }

  render() {
    //获取通过Navigation传递过来的值
    let data = this.props.navigation.state.params.data;
    // const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* <Text style={styles.instructions} onPress={() => goBack()}> {data.video}</Text> */}
        <View style={styles.videoBox}>
          <Video
            source={{ uri: data.video }}
            ref="videoPlayer" //引用
            volume={5} //声音放大倍数
            paused={false} //是否暂停
            rate={this.state.rate} //0:暂停；1:正常
            muted={this.state.muted} //是否静音
            resizeMode={this.state.resizeMode} //视频区域的拉伸方式
            repeat={this.state.repeat} //是否重复播放
            style={styles.video}

            //回调
            onLoadStart={this._onLoadStart.bind(this)} //当视频开始加载时
            onLoad={this._onLoad.bind(this)}           //当视频不断加载时会不断调用
            onProgress={this._onProgerss.bind(this)}   //视频在播放时，每隔250ms会调用一次，同时会带上当前播放时间的参数
            onEnd={this._onEnd.bind(this)}             //当视频播放完后调用
            onError={this._onError.bind(this)}         //当视频播放出错时调用
          />
          {
            //如果视频没开始播放，显示加载图标
            !this.state.videoLoaded && <ActivityIndicator size="large" color='#ee735c' style={styles.loading} />
          }
          {
            //播放完毕后，增加播放按钮
            (this.state.videoLoaded && !this.state.playing) ?
              <Icon
                onPress={this._replay.bind(this)}
                name="ios-play"
                size={50}
                style={styles.play} /> : null
          }

        </View>
        {/**自定义进度条, 根据视频总长和当前时间计算出的值，来直充View */}
        <View style={styles.progerssBox}>
          <View style={[styles.progerssBar, { width: width * this.state.videoProgress }]}>
          </View>
        </View>
      </View>
    );
  }

  _onLoadStart() {
    console.log("_onLoadStart");
  }

  _onLoad() {
    console.log("_onLoadStart");
  }

  //开始播放
  _onProgerss(data) {
    //正在加载的标识
    if (!this.state.videoLoaded) {
      this.setState({
        videoLoaded: true
      });
    }

    //开始播放标识
    if (!this.state.playing) {
      this.setState({
        playing: true //开始播放标志
      });
    }

    let totalDuration = data.seekableDuration;//总播放时长
    let currentTime = data.currentTime;//当前时间
    let percent = Number((currentTime / totalDuration).toFixed(2)) //取2位小数, 当前百分比

    this.setState({
      videoTotal: totalDuration,
      currentTime: currentTime,
      videoProgress: percent
    })
    console.log(data);
  }

  _onEnd() {
    this.setState({
      videoProgress: 1,
      playing: false
    });
    console.log("_onEnd");
  }

  _onError() {
    console.log("_onError");
  }

  //重新播放
  _replay() {
    this.refs.videoPlayer.seek(0);
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  videoBox: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 140,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  progerssBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc',
  },
  progerssBar: {
    width: 1,
    height: 4,
    backgroundColor: '#ff6600'
  },
  play: {
    position: 'absolute',
    left: 180,
    top: 140,
    width: 60,
    height: 60,
    paddingTop: 5,
    paddingLeft: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },
});

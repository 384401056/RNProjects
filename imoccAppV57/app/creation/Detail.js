import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ListView,
  Button,
  AlertIOS,
  Image,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from '../common/config';
import { get, post } from '../common/request';

//获取屏幕宽度
let width = Dimensions.get('window').width;

export default class Detail extends Component {

  static navigationOptions = {

  }

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false,
      playing: false,
      paused: false,
      videoOk: true, //视频正常
      videoLoaded: false, //视频是否加载完，要开始播放之前
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
      dataSource: ds.cloneWithRows([]), //数据源
      animationType: 'none',
      modalVisible: false,
      content: "", //用户评论内容
    };
  }

  //发起评论列表请求
  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    let url = api.base + api.comments;
    get(url, {
      creationId: 124,
      accessToken: '124'
    }).then((data) => {
      if (data && data.success) {
        let comments = data.data;
        if (comments) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(comments),
          });
        }
      }
    })
      .catch((error) => {
        console.log(error);
      })
  }


  _renderRow(row) {
    return (
      <View key={row.id} style={styles.replyBox}>
        <Image style={styles.replyAvator} source={{ uri: row.replyBy.avatar }} />
        <View style={styles.reply}>
          <Text style={styles.replyNickname}>{row.replyBy.nickname}</Text>
          <Text style={styles.replyContent}>{row.content}</Text>
        </View>
      </View>
    );
  }

  _renderHeader() {
    //获取通过Navigation传递过来的值
    let data = this.props.navigation.state.params.data;
    return (
      <View style={styles.listHeader}>
        <View style={styles.infoBox}>
          <Image style={styles.avator} source={{ uri: data.author.avator }} />
          <View style={styles.descBox}>
            <Text style={styles.nickname}>{data.author.nickname}</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <TextInput
              placeholder="敢不敢讨论一个"
              style={styles.content}
              multiline={true}
              onFocus={this._focus.bind(this)} //获取焦点时触发事件
            />
          </View>
        </View>
        <View style={styles.commentArea}>
          <Text style={styles.commentTitle}>精彩评论</Text>
        </View>
      </View>
    );
  }

  /**
   * TextInput获取焦点时触发事件
   */
  _focus() {
    this._setModalVisible(true);
  }

  /**
   * 设置模态框的显示和隐藏
   */
  _setModalVisible(isVisible) {
    this.setState({
      modalVisible: isVisible
    })
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
            source={{ uri: data.video + '2211' }}
            ref="videoPlayer" //引用
            volume={5} //声音放大倍数
            paused={this.state.paused} //是否暂停
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
            //如果视频出错，显示错误信息
            !this.state.videoOk && <Text style={styles.failText}>视频出错了，很抱歉...</Text>
          }

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
          {
            //在播放过程中加入“暂停”按钮层
            (this.state.videoLoaded && this.state.playing) ?
              <TouchableOpacity onPress={this._pause.bind(this)} style={styles.pauseBtn}>
                {
                  this.state.paused ?
                    <Icon onPress={this._resume.bind(this)} name="ios-play" size={50} style={styles.play} />
                    : <Text></Text>
                  //TouchableOpacity中间不能为null
                }
              </TouchableOpacity> : null
          }

        </View>

        {/**自定义进度条, 根据视频总长和当前时间计算出的值，来直充View */}
        <View style={styles.progerssBox}>
          <View style={[styles.progerssBar, { width: width * this.state.videoProgress }]}>
          </View>
        </View>

        {/**评论列表 */}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderHeader={this._renderHeader.bind(this)} //视频信息栏
          enableEmptySections={true} //允许渲染空列表，否则会有警告.
          automaticallyAdjustContentInsets={false} //不加此设置，ListView上边缘会出现留白.
        />

        {/**评论 Modal */}
        <Modal
          animationType={'fade'}
          visible={this.state.modalVisible}
          onRequestClose={() => { this._setModalVisible(false) }}>
          <View style={styles.modalContainer}>
            <Icon onPress={this._setModalVisible.bind(this, false)} name="ios-close-circle" size={40} style={styles.closeIcon} />
            <View style={styles.commentBox}>
              <View style={styles.comment}>
                <TextInput
                  placeholder="敢不敢讨论一个"
                  style={styles.content}
                  multiline={true}
                  defaultValue={this.state.content}
                  onChangeText={(text) => {
                    //当文字改变时，更新状态值,相当于缓存输入内容.
                    this.setState({
                      content: text
                    });
                  }}
                />
              </View>
            </View>
            <View style={styles.sumbBtn}>
              <Button
                onPress={this._submit.bind(this)}
                title="发表评论"
                color="#ee753c"
                style={styles.sumbBtn}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  /**
   * 提交评论
   */
  _submit() {
    if(!this.state.content){
      return AlertIOS.alert("评论不能为空.");
    }
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

  _onError(e) {
    this.setState({
      videoOk: false
    });
    console.log(e);
    console.log("_onError");
  }

  //重新播放
  _replay() {
    this.refs.videoPlayer.seek(0);
  }

  //暂停播放
  _pause() {
    if (!this.state.paused) {
      this.setState({
        paused: true
      });
    }
  }

  //暂行后的继续播放
  _resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      });
    }
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  videoBox: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },
  video: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 70,
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
  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: 360
  },
  failText: {
    position: 'absolute',
    left: 0,
    top: 110,
    width: width,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },
  infoBox: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  avator: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },
  descBox: {
    flex: 1
  },
  nickname: {
    fontSize: 18
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: "#666"
  },
  replyBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10
  },
  replyAvator: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },
  replyNickname: {
    fontSize: 16,
    color: "#666"
  },
  replyContent: {
    marginTop: 4,
    fontSize: 16,
    color: "#666"
  },
  reply: {
    flex: 1
  },
  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width
  },
  content: {
    height: 80,
    paddingLeft: 2,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    fontSize: 14
  },
  commentArea: {
    width: width,
    marginTop: 4,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  modalContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: "#FFF",
  },
  closeIcon: {
    alignSelf: "center",
    fontSize: 30,
    color: "#ee753c"
  },
  sumbBtn:{
    flexDirection: 'row', 
    justifyContent: 'center',
  }

});

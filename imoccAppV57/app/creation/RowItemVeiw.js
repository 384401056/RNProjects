import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text,
    TouchableHighlight,
    ListView, //过时
    RefreshControl,
    ImageBackground,//可以包含子组件
    Image //不能在包含子组件.
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//获取屏幕宽度
let width = Dimensions.get('window').width;

export default class RowItemView extends Component {

    constructor(props) {
        super(props);
        let newRow = this.props.row;
        this.state = {
            up: newRow.voted,
            row: newRow,
        };
    }

    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps");
        let newRow = props.row //注：这里不要写成 this.props. 要用参数中的props
        this.setState({
            up: newRow.voted,
            row: newRow,
        });
    }

    _up() {
        let up = !this.state.up;
        this.setState({
            up: up
        })
    }

    render() {
        let rowData = this.state.row;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={()=>this.props.onSelect(rowData)}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{rowData.title}</Text>
                        <ImageBackground style={styles.thumb} source={{ uri: rowData.thumb }}>
                            <Icon name="ios-play" size={28} style={styles.play} />
                        </ImageBackground>
                    </View>
                </TouchableHighlight>
                <View style={styles.itemFooter}>
                    <TouchableHighlight onPress={this._up.bind(this)}>
                        <View style={styles.handleBox}>
                            <Icon name={this.state.up ? "ios-heart" : "ios-heart-empty"} size={28} style={styles.up} />
                            <Text style={styles.handleText}>喜欢</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <View style={styles.handleBox}>
                            <Icon name="ios-chatboxes" size={28} style={styles.chat} />
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000',
        backgroundColor: '#F5FCFF',
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },
    hearderTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: "center",
        fontWeight: '600',
    },
    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: '#FFF'
    },
    thumb: {
        width: width,
        height: width * 0.5,
        resizeMode: 'cover',
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333'
    },
    itemFooter: {
        flexDirection: 'row', //并排的分布方式
        justifyContent: 'space-between', //两端对齐
        backgroundColor: '#eee',
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: width / 2 - 0.5,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        color: '#ed7b66'
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333',
    },

    up: {
        fontSize: 22,
        color: '#FF4500',
    },
    chat: {
        fontSize: 22,
        color: '#333',
    },
    loadingMore: {
        marginVertical: 20
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    }
})
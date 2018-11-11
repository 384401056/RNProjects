import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, ListView, TouchableHighlight, Image, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//获取屏幕宽度
let width = Dimensions.get('window').width;

export default class index extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            //模拟数据源
            dataSource: ds.cloneWithRows([
                {
                    "id": 811101337005,
                    "thumb": "http://dummyimage.com/1200x600/d479f2",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "面支受政都山联党力能"
                },
                {
                    "id": 25549985592,
                    "thumb": "http://dummyimage.com/1200x600/79f2b0",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "明规又程示制热石价第两划划无她你"
                },
                {
                    "id": 484652736710,
                    "thumb": "http://dummyimage.com/1200x600/f28d79",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "则具家土中正象京工土"
                },
                {
                    "id": 874985366912,
                    "thumb": "http://dummyimage.com/1200x600/7988f2",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "证常相取一基说少引把须使"
                },
                {
                    "id": 962268297393,
                    "thumb": "http://dummyimage.com/1200x600/abf279",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "济但务只所使因如民色"
                },
                {
                    "id": 753496246991,
                    "thumb": "http://dummyimage.com/1200x600/f279ce",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "入特入处律布关选照员队比包规石已"
                },
                {
                    "id": 282335196973,
                    "thumb": "http://dummyimage.com/1200x600/79f2f2",
                    "video": "http://121.14.201.18/6569BE0F2B40753F3798463C/03000801005A4595B644BD169D844E919B0AC0-7C83-8BDF-093D-1ED07D0AA8F1.mp4?ccode=0502&duration=181&expire=18000&psid=02cb1f92e7b42ba418988a9362ba9995&ups_client_netip=deddc6fb&ups_ts=1541912353&ups_userid=780652852&utid=rRNCFGyUl34CAXBzFLQq7o1h&vid=XMzI3MzI4NjE1Ng&vkey=Afec523ae70109fc673408d6be08f0c33&iv=1&sp=",
                    "title": "器边据海该展两系油严其带院话"
                }
            ]),
        };
    }

    /**
     * ListView的row渲染方法
     * @param {*} rowData dataSource中的一条数据. 
     */
    renderRow(rowData) {
        return (
            <View style={styles.container}>
                <TouchableHighlight>
                    <View style={styles.item}>
                        <Text style={styles.title}>{rowData.title}</Text>
                        <Image style={styles.thumb} source={{ uri: rowData.thumb }}>
                            <Icon name="ios-play" size={28} style={styles.play} />
                        </Image>
                    </View>
                </TouchableHighlight>
                <View style={styles.itemFooter}>
                    <View style={styles.handleBox}>
                        <Icon name="ios-heart" size={28} style={styles.up} />
                        <Text style={styles.handleText}>喜欢</Text>
                    </View>
                    <View style={styles.handleBox}>
                        <Icon name="ios-chatbubbles" size={28} style={styles.up} />
                        <Text style={styles.handleText}>评论</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.hearderTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true} //允许渲染空列表，否则会有警告.
                    automaticallyAdjustContentInsets={false} //不加此设置，ListView上边缘会出现留白.
                />
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
        color: '#333',
    }

});

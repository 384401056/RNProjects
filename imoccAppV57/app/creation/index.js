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

import RowItemView from './RowItemVeiw';
import { api } from '../common/config';
import { get, post } from '../common/request';

//获取屏幕宽度
let width = Dimensions.get('window').width;

//获取数据时的缓存变量。
var cachedResults = {
    nextPage: 1,
    items: [],
    total: 0
}

export default class index extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            isLoading: false, //当前正在加载数据的标识
            isRefreshing: false,//是否在下拉刷新中
            up: false,//是否是被喜欢过的状态.
            dataSource: ds.cloneWithRows([])//数据源
        };
    }


    _renderFooter() {
        //如果没有数据，返回一种视图
        //&& cachedResults.total !== 0) 是为了第一次加载数据时，hasMore中的判断值都为0
        if (!this._hasMore() && cachedResults.total !== 0) {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有数据了</Text>
                </View>
            );
        }

        //如果没有在加载数据，返回一个空视图
        if (!this.state.isLoading) {
            return (<View style={styles.loadingMore}></View>);
        }

        //否则返回加载图标
        return (<ActivityIndicator style={styles.loadingMore} />);
    }

    /**
     * 下拉刷新数据
     */
    _onRefresh() {
        if (this.state.isRefreshing) {
            return;
        }

        this.setState({
            isRefreshing: true
        })

        get(api.base + api.creations, { accessToken: 'abcde', page: 0 })
            .then((data) => {
                if (data.success) {
                    let items = data.data; //因为是下拉刷新，所以不用追加数据.
                    cachedResults.items = items;
                    cachedResults.total = data.total;

                    //2秒以后再加载数据，人造延迟.
                    setTimeout(() => {
                        console.log(data);
                        this.setState({
                            isRefreshing: false,
                            dataSource: this.state.dataSource.cloneWithRows(cachedResults.items)
                        })
                    }, 2000);

                }
            })
            .catch((error) => {
                this.setState({
                    isRefreshing: false
                })
                console.error(error);
            });
    }



    /**
     * ListView的row渲染方法
     * @param {*} rowData dataSource中的一条数据. 
     */
    renderRow(rowData) {
        return (
            <RowItemView 
            key={rowData.id}
            row={rowData}
            onSelect={this._loadPage.bind(this)}/>
        );
    }

    _loadPage(row){
        const { navigate } = this.props.navigate;
        navigate('Detail',{data: row}); //传递到Detail中的数据 data
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.hearderTitle} onPress={this.onClick}>视频列表</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)} //数据加载时的视图,页头与页脚会在每次渲染过程中都重新渲染.
                    enableEmptySections={true} //允许渲染空列表，否则会有警告.
                    automaticallyAdjustContentInsets={false} //不加此设置，ListView上边缘会出现留白.
                    onEndReached={this._fetchMoreDate.bind(this)} //当滑动至底部时调用的方法
                    // onEndReachedThreshold={20} //距离底部多高时进行预加载
                    showsVerticalScrollIndicator={false} //隐藏滚动条
                    //下拉刷新
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff600"
                            title="拼命加载中..."
                        />
                    }
                />
            </View>
        );
    }

    /**
     * 判断是否还有数据
     */
    _hasMore() {
        //如果items中的数据不等于，接收到的数据总条数，就认为是还有数据。
        // console.log("cachedResults.items.length: " + cachedResults.items.length);
        // console.log("cachedResults.total: " + cachedResults.total);
        return cachedResults.items.length !== cachedResults.total;
    }

    /**
     * 上拉加载
     */
    _fetchMoreDate() {
        console.log("加载更多....")
        console.log("this.state.isLoading: " + this.state.isLoading);
        // //如果没有数据了，或者目前正在加载数据
        if (!this._hasMore() || this.state.isLoading) {
            return;
        }

        let page = cachedResults.nextPage;
        this._fetchData(page);
    }

    /**
     * 当组件加载完成后
     */
    componentDidMount() {
        this._fetchData(1);
    }

    /**
     * 获取网络数据
     * @param {*} page 获取哪一页的数据
     */
    _fetchData(page) {

        //设置当前为加载数据中
        this.setState({
            isLoading: true
        })

        //使用封装的fetch.
        get(api.base + api.creations, { accessToken: 'abcde', page: page })
            .then((data) => {
                console.log(data);
                if (data.success) {

                    let items = cachedResults.items.slice();//slice从已有的数组中返回选定的元素。
                    items = items.concat(data.data);//追加获取的数据

                    cachedResults.items = items;
                    cachedResults.nextPage += 1;
                    cachedResults.total = data.total;

                    //2秒以后再加载数据，人造延迟.
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                            dataSource: this.state.dataSource.cloneWithRows(cachedResults.items)
                        })
                    }, 2000);

                }
            })
            .catch((error) => {
                this.setState({
                    isLoading: false
                })
                console.error(error);
            });
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


});

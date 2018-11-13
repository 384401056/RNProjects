/** @format */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { StackNavigator } from 'react-navigation';
import App from './App';
import Detail from './app/creation/Detail';
import Creation from './app/creation/index';

//导航注册
const SimpleApp = StackNavigator({
    App: {
        screen: App,
        navigationOptions: {
            header: null
        }
    },
    Creation: {
        screen: Creation,
        navigationOptions: {
            header: null
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: '视频详情'
        }
    },
});
AppRegistry.registerComponent(appName, () => SimpleApp);

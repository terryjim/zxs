import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'
/*
import './app.scss'*/
import './styles/base.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
       'pages/my/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#CC0001',
      navigationBarTitleText: '知无涯自习室',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#000',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/images/21132058093sy@2x.png',
          selectedIconPath: 'assets/images/21133513667sy2x.png'
        }/* , {
          pagePath: 'pages/im/index',
          text: '聊天',
          iconPath: 'assets/images/21133513968lt2x.png',
          selectedIconPath: 'assets/images/21133513837lt_s2x.png'
        }  *//*, {
          pagePath: 'pages/announcement/index',
          text: '公告',
          iconPath: 'assets/images/21133513968lt2x.png',
          selectedIconPath: 'assets/images/21133513837lt_s2x.png'
        }*/
        ,/* {
          pagePath: 'pages/shop/index',
           //pagePath: 'pages/gate/components/remote', 
          text: '优品',
          iconPath: 'assets/images/21133514234yp2x.png',
          selectedIconPath: 'assets/images/21133514102yp_s2x.png'
        },  {
          pagePath: 'pages/contacts/index',
          text: '通讯录',
          iconPath: 'assets/images/21133514496txl2x.png',
          selectedIconPath: 'assets/images/21133514365txl_s2x.png'
        }, */ {
          pagePath: 'pages/my/index',
          text: '预约',
          iconPath: 'assets/images/21133514234yp2x.png',
          selectedIconPath: 'assets/images/21133514102yp_s2x.png'
        },{
          pagePath: 'pages/my/index',
          text: '我的',
          iconPath: 'assets/images/21133514758w2x.png',
          selectedIconPath: 'assets/images/21133514592w_s2x.png'
        },
      ]
    
  },
    cloud: true
  }


  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

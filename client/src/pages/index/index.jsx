import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Swiper, SwiperItem, Map, Button } from '@tarojs/components'
import { AtGrid, AtIcon, AtButton, AtCard } from 'taro-ui'
import './index.scss'

import Login from '../../components/login/index'
const basehref = 'cloud://zxs5188.7a78-zxs5188-1300852908/'
export default class Index extends Component {

  config = {
    navigationBarTitleText: '知无涯自习室'
  }
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      banners: [],   //轮播图
    }
  }
  componentWillMount() { }

  async componentDidMount() {
    Taro.cloud
      .callFunction({
        name: "banners",
        data: { action: 'query' }
      })
      .then(res => {
        this.setState({ banners: res.result.data })
      }).catch(e => {
        console.log(e)
        Taro.showToast(e)
      })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onTap = () => {
    Taro.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.512130,//要去的纬度-地址
          longitude: 114.399730,//要去的经度-地址
          name: "知无涯自习室",
          address: '鲁磨路国光大厦B座1401室'
        })
      }
    })

  }
  onCall = () => {
    Taro.makePhoneCall({ phoneNumber: '18971685188' })
  }
  getGift = () => {

    Taro.cloud
      .callFunction({
        name: "register",
        /* data: { action: 'query', needOpenid: true }*/
      })
      .then(res => {
        /* Taro.showToast({
             title: JSON.stringify(res),
             icon: 'none',
             duration: 5000
           })
           console.log(res)
      if(2>1)
      return*/
        console.log(res)
        if (res.result.retCode && res.result.retCode !== 1)
          Taro.showToast({
            title: '您已领取过免费券，请直接使用！',
            icon: 'none',
            duration: 2000
          })
        else {
          Taro.showToast({
            title: '领取成功，您可立即预定桌位或直接前往现场使用！',
            icon: 'none',
            duration: 2000
          })
        }
        /* .then(res => console.log(res)) */
      }).catch(e => {
        console.log('----------------------------------------')
        console.log(e)
      })


  }
   charge = () => {
    Taro.cloud
      .callFunction({
        name: "pay",
        data: { amount: 1000, added: 3000 }
      })
      .then(res => {
        console.log(res)
        this.setState({
          context: res.result
        })
      })
  }

 //支付提交
      paypost() {
            let that = this;
            Taro.showLoading({
                  title: '正在下单',
            });
            // 利用云开发接口，调用云函数发起订单
            Taro.cloud.callFunction({
                  name: 'charge',
                  data: {                      
                        product_id: 0
                  },
                  success: res => {
                        wx.hideLoading();
                        that.pay(res.result)
                  },
                  fail(e) {
                    console.log(e)
                        Taro.hideLoading();
                        Taro.showToast({
                              title: '支付失败，请及时反馈或稍后再试',
                              icon: 'none'
                        })
                  }
            });
      }
      //实现小程序支付
      pay(payData) {
            let that = this;
            //官方标准的支付方法
            Taro.requestPayment({
                  timeStamp: payData.timeStamp,
                  nonceStr: payData.nonceStr,
                  package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
                  signType: 'MD5',
                  paySign: payData.paySign, //签名
                  success(res) {
                       // that.setStatus();   修改卖家订单状态
                  },
            })
      }




  render() {
    const { banners } = this.state
    return (
      <View className='mainView'>
        {/* <Login/>*/}
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          /*  vertical */
          circular
          indicatorDots
          autoplay
          style='height:150px'
        >
          {
            !banners ? '' : banners.map(b => {
              return (
                <View>

                  <SwiperItem key={b.id}>
                    <Image mode='scaleToFill' style='height: 150px;background: #fff;' src={'cloud://zxs5188.7a78-zxs5188-1300852908/' + b.img} onClick={this.showWebView.bind(this, b.Url)} />
                  </SwiperItem>
                </View>)
            })
          }
        </Swiper>
        {/*  <AtIcon prefixClass='fa' value='clock' size='30' color='#F00'></AtIcon>
        <AtIcon  value='map-pin'/>*/}
        <View onClick={this.getGift} className='at-row at-row__align--center at-row__justify--center defaultBorderView' style={{ height: '50px', marginTop: '5px' }}>
          <View className='at-col  at-col-2 ' style={{ height: '50px', lineHeight: '20px', color: '#fff', textAlign: 'center', background: '#fa8c16' }}>
            <View style={{ marginTop: '5px' }}>
              <Text>新人</Text></View>
            <View >
              <Text>好礼</Text></View>
          </View>
          <View className='at-col  at-col-6 ' >
            <Text style={{ color: 'red', fontSize: '15px', marginLeft: '10px' }}>三日自习课时免费送</Text>
          </View>
          <View className='at-col  at-col-4' >
            <Button style={{ backgroundColor: '#fa8c16', color: '#ffffff' }} circle={true} size='mini'>立即领取</Button>
          </View>
        </View>
        快速购买
        <View className='defaultView at-row at-row--wrap' >
          <View className='at-col  at-col-6 mainView'/*  style={{textAlign: 'center' }} */>
            <View style='margin: 5px;height: 90px;background:#389e0d;color:#fff' onClick={this.paypost.bind(this)}>
              <View ><Text>课时卡</Text></View>
              <View><Text>可自由转换为其它卡</Text></View>
              <View> <Text>大惊喜！存就送</Text></View>
            </View>
          </View>
          <View className='at-col  at-col-6 mainView' >
            <View style='margin: 5px;height: 90px;background:#08979c;color:#fff' onClick={this.showWebView.bind(this, b.Url)}>
              <View><Text>单日四小时卡</Text></View>
              <View><Text>10 20元</Text></View>
            </View>
          </View>
          <View className='at-col  at-col-6 mainView' style={{ textAlign: 'center' }}>
            <View style='margin: 5px;height: 90px;background:#096dd9;color:#fff' onClick={this.showWebView.bind(this, b.Url)}>
              <View ><Text>日卡</Text></View>
            </View>         
        </View>
        <View className='at-col  at-col-6 mainView' style={{ textAlign: 'center' }}>
          <View style='margin: 5px;height: 90px;background:#1d39c4;color:#fff' onClick={this.showWebView.bind(this, b.Url)}>
            <View ><Text>7日卡</Text></View>
          </View>
        </View>
        <View className='at-col  at-col-6 mainView' style={{ textAlign: 'center' }}>
          <View style='margin: 5px;height: 90px;background:#531dab;color:#fff' onClick={this.showWebView.bind(this, b.Url)}>

            <View ><Text>30日卡</Text></View>
          </View>
        </View>
        <View className='at-col  at-col-6 mainView' style={{ textAlign: 'center' }}>
          <View style='margin: 5px;height: 90px;background:#c41d7f;color:#fff' onClick={this.showWebView.bind(this, b.Url)}>

            <View ><Text>90日卡</Text></View>
          </View>
        </View>
      </View>
          {/* <View style={{ marginTop: '10px', marginLeft: '10px' }}>
          自习室地址：</View>*/}
    <View className='defaultView at-row at-row__align--center at-row__justify--center' style={{ height: '50px' }}>
      <View onClick={this.onTap} className='at-col  at-col-1 ' > <AtIcon value='map-pin' color='#fa8c16' /></View>
      <View onClick={this.onTap} className='at-col  at-col-9 at-col--wrap'>
        武汉市洪山区鲁磨路243号国光大厦B座1401室
            </View>
      <View className='at-col  at-col-2' >
        <AtIcon value='phone' size='30' color='#fa8c16' onClick={this.onCall} /></View>
    </View>
    {/*   <Map style={{ marginTop: '5px', height: '180px', width: '750px' }} latitude={30.512130} longitude={114.399730} markers={[{ latitude: 30.512130, longitude: 114.399730 }]} onClick={this.onTap} /> */ }
        </View >
        )
  }
}



    ///////////////////////
/*4.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/4.jpg	98.70 KB	刚刚
3.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/3.jpg	52.31 KB	刚刚
2.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/2.jpg	90.32 KB	刚刚
1.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/1.jpg*/
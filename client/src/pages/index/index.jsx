import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Swiper, SwiperItem, Map } from '@tarojs/components'
import { AtGrid, AtIcon } from 'taro-ui'
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
      Taro.showToast({
          title: '领取成功，您可在预约中预定桌位或直接前往现场使用！',
          icon: 'success',
          duration: 2000
        })
   
  }
  render() {
    const { banners } = this.state
    return (
      <View className='defaultView'>
        {/* <Login/>*/}
        <Swiper
          className='defaultView swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          /*  vertical */
          circular
          indicatorDots
          autoplay
          style='height:180px'
        >
          {
            !banners ? '' : banners.map(b => {
              return (
                <View>

                  <SwiperItem key={b.id}>
                    <Image style='width: 350px;height: 180px;background: #fff;' src={'cloud://zxs5188.7a78-zxs5188-1300852908/' + b.img} onClick={this.showWebView.bind(this, b.Url)} />
                  </SwiperItem>
                </View>)
            })
          }
        </Swiper>
        {/*  <AtIcon prefixClass='fa' value='clock' size='30' color='#F00'></AtIcon>
        <AtIcon  value='map-pin'/>*/}
        {/* <View  onClick={this.getGift} className='at-row at-row__align--center at-row__justify--center' style={{ height: '40px', marginTop: '30px' }}>
          <View  className='at-col  at-col-3 at-col--wrap'style={{paddingLeft:'20px'}}> 新人加入迎好礼</View>
          <View className='at-col  at-col-6 at-col--wrap' style={{marginLeft:'10px',marginRight:'10px'}}>
            立即领取3日免费学习卡 ；
            立享免费自助咖啡茶水+千兆WIFI
            </View>
          <View className='at-col  at-col-3' style={{color:'red'}}>
            立即领取</View>
        </View>*/}
      <View style={{marginTop: '50px' ,marginLeft:'20px'}}>
        地址：</View>
        <View className='defaultView at-row at-row__align--center at-row__justify--center' style={{ height: '40px', marginTop: '10px' }}>
          <View onClick={this.onTap} className='at-col  at-col-1 ' > <AtIcon value='map-pin' /></View>
          <View onClick={this.onTap} className='at-col  at-col-8 at-col--wrap'>
            武汉市洪山区鲁磨路国光大厦B座1401室
            </View>
          <View className='at-col  at-col-2' >
            <AtIcon value='phone' size='40' color='#ffa940' onClick={this.onCall} /></View>
        </View>
      

        {/* <Map   latitude={30.512130}    longitude={114.399730}  markers={[{latitude:30.512130,longitude:114.399730}]} onClick={this.onTap} />*/}
      </View>
    )
  }
}



///////////////////////
/*4.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/4.jpg	98.70 KB	刚刚
3.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/3.jpg	52.31 KB	刚刚
2.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/2.jpg	90.32 KB	刚刚
1.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/1.jpg*/
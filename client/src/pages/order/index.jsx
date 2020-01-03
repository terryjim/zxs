import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Swiper, SwiperItem, Map, Button, RichText } from '@tarojs/components'
import { AtGrid, AtIcon, AtButton, AtCard,AtInputNumber  } from 'taro-ui'
import './index.scss'

import Login from '../../components/login/index'
const basehref = 'cloud://zxs5188.7a78-zxs5188-1300852908/'
export default class Index extends Component {

  config = {
    navigationBarTitleText: '服务详情'
  }
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      banners: [],   //轮播图
      quantity:1,//购买数量
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


  //支付提交
  charge = (productId = '0', quantity = 1) => {
    // let that = this;
    Taro.showLoading({
      title: '正在下单',
    });
    // 利用云开发接口，调用云函数发起订单
    Taro.cloud.callFunction({
      name: 'charge',
      data: {
        productId,
        quantity
      },
      success: res => {
        wx.hideLoading();
        this.pay(res.result)
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
    /* let that = this;*/
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

  handleChangeQuantity (quantity) {
    this.setState({
      quantity
    })
  }


  render() {
    const { id, name, info, memo,realPrice,price } = this.$router.params
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
          <View style={{ height: '50px', lineHeight: '20px', color: '#fff', textAlign: 'center', background: '#fa8c16' }}>
            <View style={{ marginTop: '5px' }}>
              <Text>{realPrice/100}元</Text></View>
            <View >
              <Text>{price/100}元</Text></View>
          </View>
          <View >{/*className='at-col  at-col-6 '*/}
            <Text style={{ color: 'red', fontSize: '15px', marginLeft: '10px' }}>{name}</Text>
          </View>

        </View>

        <View className='defaultView at-row at-row--wrap' >
          <View className='at-col  mainView'/*  style={{textAlign: 'center' }} */>
            <Text>详细介绍</Text>

          </View>
          <View className='at-col at-col-12 mainView'/*  style={{textAlign: 'center' }} */>
            <RichText nodes={info} />
          </View>
        </View>
         <View className='defaultView at-row at-row--wrap' >
          <View className='at-col  mainView'/*  style={{textAlign: 'center' }} */>
            <Text>其它</Text>

          </View>
          <View className='at-col at-col-12 mainView'/*  style={{textAlign: 'center' }} */>
            <RichText nodes={memo} />
          </View>


        </View>
           <View className='defaultView at-row at-row--wrap' >
          <View className='at-col  mainView'/*  style={{textAlign: 'center' }} */>
            <Text>数量</Text>

          </View>
          <View className='at-col at-col-12 mainView'/*  style={{textAlign: 'center' }} */>
             <AtInputNumber
        min={1}
     
        step={1}
        value={this.state.quantity}
        onChange={this.handleChangeQuantity.bind(this)}
      />
          </View>


        </View>
        总价：{realPrice*this.state.quantity/100}元
 <AtButton type='primary' size='small' onClick={()=>this.charge(''+id,this.state.quantity)}>支付</AtButton> 
      </View >
    )
  }
}



    ///////////////////////
/*4.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/4.jpg	98.70 KB	刚刚
3.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/3.jpg	52.31 KB	刚刚
2.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/2.jpg	90.32 KB	刚刚
1.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/1.jpg*/
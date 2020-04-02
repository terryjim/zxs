import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text, Swiper, SwiperItem, Map, Button, RichText } from '@tarojs/components'
import { AtGrid, AtIcon, AtButton, AtCard, AtInputNumber } from 'taro-ui'
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
      quantity: 1,//购买数量
      promotions: [],
      free:0,//赠送课时
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

    //按buy降序显示赠送课时数组[{id:...,buy:...,free:...}]
    Taro.cloud
      .callFunction({
        name: "promotion",
        data: { action: 'query' }
      })
      .then(res => {
        console.log('-------------%%%%%%%%%%%%%%%%%5-----------------------')
        console.log(res.result)

        this.setState({ promotions: res.result.data })
      }).catch(e => {
        console.log(e)
        Taro.showToast(e)
      })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }



  //支付提交
  charge = (productId,quantity,free,pay) => {
    // let that = this;pay
    Taro.showLoading({
      title: '正在下单',
    });
    // 利用云开发接口，调用云函数发起订单
    Taro.cloud.callFunction({
      name: 'pay',
      data: {
        productId,
        quantity
      },
      success: res => {
        wx.hideLoading();
        this.pay(res.result,productId,quantity,free,pay)
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
  pay(payData,productId,quantity,free,pay) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(payData)
    //return
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
        //添加购课记录，更新未消费记录
////////////
Taro.cloud
      .callFunction({
        name: "base",
        data: { needOpenid:true,action: 'insert',tbl:'charge',payload:{product_id:productId,free,quantity,pay}}
      })
      .then(res => {
        console.log('-------------%%%%%%%%%%%%%%%%%5-----------------------')
        console.log(res.result)

        //this.setState({ promotions: res.result.data })
      }).catch(e => {
        console.log(e)
        Taro.showToast(e)
      })


        /////////////////////


      },
    })
  }

  handleChangeQuantity(quantity) {
    this.setState({
      quantity,
      free:this.getFree(quantity)
    })
  }

  //获取赠送课时
  getFree(buy) {
    let promotions = this.state.promotions
    let free = 0
    let index = 0
    while (index <= promotions.length - 1 && free === 0) {
      if (buy >= promotions[index].buy)
        free = promotions[index].free
      else
        index++
    }
    return free
  }
  render() {
    const { id, name, info, memo, realPrice, price } = this.$router.params  
    const { banners, promotions } = this.state   
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
        <View className='at-row at-row__align--center at-row__justify--centcer defaultMarginView' style={{ height: '90px' }}>
          <View className='at-col  at-col-12   ' >

            <View className='at-col  at-col-6 ' style={{ marginTop: '5px', paddingLeft: '10px' }} >
              {/* <View style={{ textAlign: 'right' }}>*/}
              <Text style={{ fontSize: '30px', fontWeight: 400, color: 'red' }}>¥{realPrice / 100}</Text>
              {/* <div style="margin-left:5px;text-decoration:line-through;">*/}
              <Text style={{ fontSize: '20px', marginLeft: '5px', textDecoration: 'line-through', color: '#ccc' }}>{price / 100}</Text>
              {/*  </div>*/}
            </View>
            <View style={{ marginTop: '5px', paddingLeft: '10px' }}>
              <Text style='font-size:22px;font-weight:400;'>{name}</Text></View>
          </View>
         

        </View>
        <View className='at-row at-row__align--center at-row__justify--center defaultMarginView' style={{ height: '60px', marginTop: '5px' }}>
          <View className='at-col  at-col-12   '>
            <View style={{ paddingLeft: '10px' }}>
              <Text style='font-size:22px;font-weight:400;'>详细介绍</Text>
            </View>
          </View>
        </View>
        {/*  <View  className='at-row at-row__align--center at-row__justify--center defaultMarginView' style={{ marginTop: '1px' }}>*/}
        <View className='defaultMarginView' style={{ marginTop: '1px', paddingTop: '5px', paddingBottom: '5px' }}>
          <View style={{ marginTop: '5px', paddingLeft: '10px' }}>
            <RichText nodes={info} />
            <RichText nodes={memo} />
          </View>
        </View>
       


        <View className='at-row at-row__align--center at-row__justify--center defaultMarginView' style={{ height: '60px', marginTop: '5px' }}>
          <View className='at-col  at-col-8   '>
            <View style={{ paddingLeft: '10px' }}>
              <Text style='font-size:18px;font-weight:400;'>购买数量</Text>
            </View>
          </View>
          <View className='at-col  at-col-4   '>
            <View >
              <AtInputNumber
                min={1}
                max={1000}
                step={1}
                value={this.state.quantity}
                onChange={this.handleChangeQuantity.bind(this)}
              />
            </View>
          </View>
        </View>
        {id==='0'?
        <View className='at-row at-row__align--center at-row__justify--center defaultMarginView' style={{ height: '60px', marginTop: '1px' }}>
          <View className='at-col  at-col-10   '>
            <View style={{ paddingLeft: '10px' }}>
              <Text style='font-size:18px;font-weight:400;'>赠送时长</Text>
            </View>
          </View>
          <View className='at-col  at-col-2 '>
            <View >
              {this.state.free}

            </View>
          </View>
        </View>
        :''}
        <View className='at-row at-row__align--center at-row__justify--center defaultMarginView' style={{ height: '60px', marginTop: '1px' }}>
          <View className='at-col  at-col-8   '>
            <View style={{ paddingLeft: '10px' }}>
              <Text style='font-size:18px;font-weight:400;'>总价</Text>
            </View>
          </View>
          <View className='at-col  at-col-4   '>
            <View style={{ textAlign: 'right', paddingRight: '50px', color: 'red' }} >
              ¥{realPrice * this.state.quantity / 100}
            </View>
          </View>

        </View>
        <View className='at-row at-row__align--center at-row__justify--center defaultMarginView' style={{ height: '60px', marginTop: '1px' }}>
          <View className='at-col  at-col-8   '>
            <AtButton type='primary' size='small' onClick={() => this.charge(id, this.state.quantity,this.state.free,realPrice * this.state.quantity)}>支付</AtButton>
          </View>
        </View>
      </View >
    )
  }
}



    ///////////////////////
/*4.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/4.jpg	98.70 KB	刚刚
3.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/3.jpg	52.31 KB	刚刚
2.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/2.jpg	90.32 KB	刚刚
1.jpg	cloud://zxs5188.7a78-zxs5188-1300852908/banners/1.jpg*/
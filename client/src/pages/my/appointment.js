import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtGrid, AtToast } from 'taro-ui'


import './index.scss'
import room from '../../assets/images/room.png'
import discount from '../../assets/images/discount.png'
import company from '../../assets/images/company.png'
import car from '../../assets/images/car.png'
import { apiUrl } from '../../config';
import rpx2px from '../../utils/rpx2px.js'
import { createQrCode } from '../../utils/qrCode.js'
const qrcodeWidth = rpx2px(350)
const QRCode = require('../../utils/weapp-qrcode.js')
/*@connect(({ my,loading }) => ({
  ...my,...loading,
}))*/

export default class My extends Component {
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      nickname: '',
      userImg: ''
    }
  }
  config = {
    navigationBarTitleText: '我的',
  }
  redirect = (url) => Taro.navigateTo({
    url: url
  })

  gotoFace = () => Taro.navigateTo({
    url: '/pages/face/index'
  })
  showInfo = (title) => {
    Taro.showToast({
      title: title + "正在上架，敬请期待！",
      icon: 'none',
    });
  }
  onGridClick = (item, number) => {
    switch (number) {
      case 0:
        this.charge();
        break;
      case 1:
        this.redirect("/pages/company/index");
        break;
      case 2:
        this.redirect("/pages/activity/index");
        //this.showInfo("优惠券")
        break;
      case 3:
        this.showInfo("我的车辆")
        break;
    }

  }
  charge = () => {
    Taro.cloud
      .callFunction({
        name: "charge",
        data: { amount: 1000, added: 3000 }
      })
      .then(res => {
        console.log(res.result)
        this.setState({
          context: res.result
        })
      })
  }
  componentDidMount() {
    /* let userInfo = Taro.getStorageSync('userInfo')
     if(!userInfo || !userInfo.access_token){
         Taro.navigateTo({url:"/pages/register/index"})
     }
     this.setState({
       nickname:userInfo.nickname,
       userImg:apiUrl.userImg+'?size=middle&openid='+userInfo.openid
     })
     this.props.dispatch({ type: 'my/mybonus'})*/
    /*   let userInfo = Taro.getStorageSync('userInfo')
      if(!userInfo || !userInfo.access_token){
          Taro.navigateTo({url:"/pages/register/index"})
      } */
    //let qqq=Taro.createCanvasContext('canvas', this.$scope)

   
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  render() {

    let { openMyToast, myToastText, mybonusList } = this.props
    return (
      <View className='defaultView'>
        <View className='at-row at-row__align--end' >
          <View className='at-col at-col-3 avatar'>
            <open-data type="userAvatarUrl"></open-data>
          </View>
          <View className='at-col at-col-9'>
            <open-data type="userNickName"></open-data></View>
        </View>
        {/* <AtToast isOpened={openMyToast} text={myToastText}></AtToast>*/}
        {/* <View className='portrait'>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-2' >
              <Image className='MyPng' src={this.state.userImg} />
            </View>
            <View className='at-col at-col-10' >
              <View className='name'>{this.state.nickname}</View>
            </View>
          </View>
        </View>*/}
        {/*  <View className='defaultView'>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-8' onClick={this.redirect.bind(this,"/pages/integral/index")}>
              <View className='integralValue'>{mybonusList.totalbonus}</View>
              <View className='integralName'>积分值</View>
            </View>
            <View className='at-col at-col-4' >
               <View className='conversion' onClick={this.showInfo.bind(this,"兑换物品")}>兑换物品</View> 
            </View>
          </View>
        </View>
        111*/}

        <AtList>
  <AtListItem title='标题文字' note='描述信息' arrow='right' iconInfo={{ size:
  25, color: '#78A4FA', value: 'calendar', }} /> <AtListItem title='标题文字'
  note='描述信息' extraText='详细信息' arrow='right' iconInfo={{ size: 25,
  color: '#FF4949', value: 'bookmark', }} />
</AtList>
      </View>
    )
  }
}


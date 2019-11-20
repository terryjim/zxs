import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtGrid,AtToast } from 'taro-ui'


import './index.scss'
import room from '../../assets/images/room.png'
import discount from '../../assets/images/discount.png'
import company from '../../assets/images/company.png'
import {apiUrl} from '../../config';

/*@connect(({ my,loading }) => ({
  ...my,...loading,
}))*/

export default class My extends Component {
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      nickname:'',
      userImg:''
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
  showInfo=(title)=>{
    Taro.showToast({
      title: title+"正在上架，敬请期待！",
      icon: 'none',
    });
  }
  onGridClick = (item, number) => {
    switch (number) {
      case 0:
        this.redirect("/pages/residence/index");
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
  componentDidShow() {
   /* let userInfo = Taro.getStorageSync('userInfo')
    if(!userInfo || !userInfo.access_token){
        Taro.navigateTo({url:"/pages/register/index"})
    }
    this.setState({
      nickname:userInfo.nickname,
      userImg:apiUrl.userImg+'?size=middle&openid='+userInfo.openid
    })
    this.props.dispatch({ type: 'my/mybonus'})*/
  }

  render() {
    
    let {openMyToast,myToastText,mybonusList}=this.props
    return (
      <View>
        <AtToast isOpened={openMyToast} text={myToastText}></AtToast>
        <View className='portrait'>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-2' >
              <Image className='MyPng' src={this.state.userImg} />
            </View>
            <View className='at-col at-col-10' >
              <View className='name'>{this.state.nickname}</View>
            </View>
          </View>
        </View>
        <View className='defaultView'>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-8' onClick={this.redirect.bind(this,"/pages/integral/index")}>
              <View className='integralValue'>{mybonusList.totalbonus}</View>
              <View className='integralName'>积分值</View>
            </View>
            <View className='at-col at-col-4' >
              {/* <View className='conversion' onClick={this.showInfo.bind(this,"兑换物品")}>兑换物品</View> */}
            </View>
          </View>
        </View>
        <View className='defaultView'>
          <AtGrid hasBorder={false} onClick={this.onGridClick} columnNum={3} data={
              [
                {
                  image: room,
                  value: '我的房屋'
                },
                {
                  image: company,
                  value: '我的企业'
                },
                {
                  image: discount,
                  value: '我的活动'
                }/*,
                {
                  image: car,
                  value: '我的车辆'
                }*/
              ]
            }

          />
        </View>
        <View className='defaultView'>
          <AtList hasBorder={false}>
            {/* <AtListItem title='我的订单' arrow='right' onClick={this.showInfo.bind(this,"我的订单")} /> */}
            <AtListItem title='人脸录入' arrow='right' onClick={this.gotoFace.bind(this)} />
            {/* <AtListItem title='我的活动' arrow='right' onClick={this.redirect.bind(this,"/pages/activity/index")} /> */}
            <AtListItem title='意见反馈' arrow='right' onClick={this.redirect.bind(this,"/pages/opinionFeedback/index")} />
            <AtListItem title='关于我们' arrow='right' onClick={this.redirect.bind(this,"/pages/about/index")} />
            <AtListItem title='设置' arrow='right' onClick={this.redirect.bind(this,"/pages/setup/index")} />
          </AtList>
        </View>
      </View>
    )
  }
}


import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtGrid, AtToast, AtIcon ,AtModal} from 'taro-ui'
import './index.scss'
import room from '../../assets/images/room.png'
import discount from '../../assets/images/discount.png'
import company from '../../assets/images/company.png'
import car from '../../assets/images/car.png'
import { apiUrl } from '../../config';
import { getFormatDate, DateAdd,strToDate } from '../../utils/date'
/*@connect(({ my,loading }) => ({
  ...my,...loading,
}))*/

export default class Order extends Component {
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      selectPers: ['单人', '双人'],
      selectPersChecked: '单人',
      selectLimit: ['单日', '单周', '单月', '单季', '自选'],
      selectLimitChecked: '单日',
      selectStart: getFormatDate(DateAdd('d', 1)),
      selectEnd: getFormatDate(DateAdd('d', 1)),
      //被战胜座位
      occupied: []
    }
  }
  config = {
    navigationBarTitleText: '预约',
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
    if(!this.state.occupied.includes(item.value)){
      this.redirect(`/pages/order/confirm?desk=${item.value}&start=${this.state.selectStart}&end=${this.state.selectEnd}`);
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
  //选择人数
  onSelPers = e => {
    this.setState({
      selectPersChecked: this.state.selectPers[e.detail.value]
    })
  }
  //选择日月季卡
  onSelLimit = e => {
    this.setState({
      selectLimitChecked: this.state.selectLimit[e.detail.value]
    })
  }

  onDateChange = (v, e) => {
    console.log(v)
    console.log(e)
    if (v === 'start')
      this.setState({
        selectStart: e.detail.value
      })
    if (v === 'end')
      this.setState({
        selectEnd: e.detail.value
      })
  }
  onSearch = () => {
    //根据选中的日期段在数据库中查询所有被占用的座位 
    console.log(this.state.selectStart)
     console.log(this.state.selectEnd)
    Taro.cloud
      .callFunction({
        name: "getOccupied",
        data: { start:this.state.selectStart, end: this.state.selectEnd }
      })
      .then(res => {
        console.log('-------------------------------')
        console.log(res)
        this.setState({
          context: res.result
        })
      })
  }

  render() {

    let { openMyToast, myToastText, mybonusList } = this.props
    return (
      <View className='defaultView'>
        <AtToast isOpened={openMyToast} text={myToastText}></AtToast>
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
        <View className='defaultView'>
          <View className='at-row at-row__align--center'>
            <View className='at-col at-col-8' onClick={this.redirect.bind(this, "/pages/integral/index")}>
              <View className='integralValue'>{mybonusList.totalbonus}</View>
              <View className='integralName'>积分值</View>
              <AtIcon value='clock' size='30' color='#F00'></AtIcon>
            </View>
            <View className='at-col at-col-4' >
              {/* <View className='conversion' onClick={this.showInfo.bind(this,"兑换物品")}>兑换物品</View> */}
            </View>
          </View>
        </View>
        <Picker mode='selector' range={this.state.selectPers} onChange={this.onSelPers}>
          <View className='picker'>
            {this.state.selectPersChecked}
          </View>
        </Picker>
        <Picker mode='selector' range={this.state.selectLimit} onChange={this.onSelLimit}>
          <View className='picker'>
            {this.state.selectLimitChecked}
          </View>
        </Picker>

        <Picker mode='date' onChange={this.onDateChange.bind(this, 'start')}>
          <View className='picker'>
            开始日期：{this.state.selectStart}
          </View>
        </Picker>
        <Picker mode='date' onChange={this.onDateChange.bind(this, 'end')}>
          <View className='picker'>
            截止日期：{this.state.selectEnd}
          </View>
        </Picker>
        <Button onClick={this.onSearch}>查询</Button>
        <Text>暗光区</Text>
        <View className='defaultView'>

          <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
            new Array(34).fill(1).map((x, index) => (
             
              {
              //image: room,
              iconInfo: {
                size: 15,
                color: this.state.occupied.includes(x)?'#cccccc':'green',
                value: 'calendar'
              },
              value: 'A' + (index + 1)

            })
            )
          }

          />

        </View>
        <View className='defaultView'>
          <AtList hasBorder={false}>
            <AtListItem title='姓名' arrow='right' onClick={this.showInfo.bind(this, "我的订单")} />
            <AtListItem title='手机' arrow='right' onClick={this.gotoFace.bind(this)} />
            {/* <AtListItem title='我的活动' arrow='right' onClick={this.redirect.bind(this,"/pages/activity/index")} /> */}
            <AtListItem title='意见反馈' arrow='right' onClick={this.redirect.bind(this, "/pages/opinionFeedback/index")} />
            <AtListItem title='关于我们' arrow='right' onClick={this.redirect.bind(this, "/pages/about/index")} />

          </AtList>
        </View>
      </View>
    )
  }
}


import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtGrid, AtToast, AtIcon, AtModal } from 'taro-ui'
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

export default class OrderConfirm extends Component {
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      selectPers: ['单人', '双人'],
      selectPersChecked: '单人',
      selectLimit: ['单日', '单周', '单月', '单季', '自选'],
      selectLimitChecked: '单日',
      selectStart: getFormatDate(DateAdd( new Date(),'d', 1)),
      selectEnd: getFormatDate(DateAdd(new Date(),'d', 1)),
      //被战胜座位
      occupied: []
    }
  }
  config = {
    navigationBarTitleText: '订单确认',
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
  
  componentDid() {
    this.setState({selectStart:this.$router.params.start,selectEnd:this.$router.params.end,desk:this.$router.params.desk})
    console.log(this.$router.params)
  }
  handleSubmit=()=>{
  Taro.cloud
      .callFunction({
        name: "appointment",
        data: {start:this.state.selectStart,end:this.state.selectEnd,desk:this.state.desk}
      })
      .then(res => {
        console.log(res.result)
        this.setState({
          context: res.result
        })
      })
}
  render() {

    let {persons,desk,start,end } = this.$router.params
    return (
      <View className='defaultView'>

        <View className='at-row at-row__align--center' style='height:150rpx'>
          <View className='at-col at-col-2'>人数</View>
          <View className='at-col at-col-4'>
            <Text>{persons}</Text>
          {/*   <Picker mode='selector' range={selector} onChange={this.onChange} >
              <View className='picker' style='text-align:right'>
                {selectorChecked}<AtIcon value='chevron-down' size='20' color='#000' />
              </View>
            </Picker> */}
          </View>
          <View className='at-col at-col-2'>桌号</View>
          <View className='at-col at-col-4'>
            <Text>{desk}</Text>
          {/*   <Picker mode='selector' range={selector} onChange={this.onChange} >
              <View className='picker' style='text-align:right'>
                {selectorChecked}<AtIcon value='chevron-down' size='20' color='#000' />
              </View>
            </Picker> */}
          </View>
        </View>
        <View className='at-row' style='height:100rpx' /* onClick={this.handleDateClick.bind(this)} */>
          <View className='at-col at-col-3'>预定日期</View>
          <View className='at-col at-col-9' style='text-align:right' >
            {start} 至 {end}
            <AtIcon value='chevron-down' size='20' color='#000' />
          </View>
        </View>
        

        <Button type='primary' style='margin:50rpx' onClick={this.handleSubmit} > 确认</Button>
      </View>
    )
  }
}


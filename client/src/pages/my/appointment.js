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
import { getFormatDate, DateAdd, strToDate } from '../../utils/date'
/*@connect(({ my,loading }) => ({
  ...my,...loading,
}))*/

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      appointmentList: []
    }
  }
  config = {
    navigationBarTitleText: '我的预约',
  }
  /*   redirect = (url) => Taro.navigateTo({
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
    } */


  componentDidMount() {

    Taro.cloud
      .callFunction({
        name: "appointment",
        data: { action: 'query', needOpenid: true }
      })
      .then(res => {
       /* console.log('888888888888888888888888888')
        console.log(res.result.data)*/
        this.setState({ appointmentList: res.result.data })
        /* .then(res => console.log(res)) */
      })
  }
  componentWillUnmount() {
    // clearInterval(this.timerID)
  }
  render() {
    let { appointmentList } = this.state

    //let { openMyToast, myToastText, mybonusList } = this.props
    return (
      <View className='defaultView'>
        <View className='at-row at-row__align--end' >
          <View className='at-col at-col-3 avatar'>
            <open-data type="userAvatarUrl"></open-data>
          </View>
          <View className='at-col at-col-9'>
            <open-data type="userNickName"></open-data></View>
        </View>

        <View >
          <View style={{margin:'10px'}}>
             <Text style='font-size:22px;font-weight:400;padding-left: 10px'>预约中</Text>                 
          </View>
<AtList>
            {appointmentList && appointmentList.map(x => {
              if (new Date(x.start).getTime() >= new Date(getFormatDate(new Date())).getTime())
                return (<AtListItem title={x.start}
                  note={'至' + x.end} extraText={'桌号：' + x.desk}  iconInfo={{
                    size:
                    25, color: '#78A4FA', value: 'calendar',
                  }} />)
            }
            )}
            {/*   <AtListItem title='2019-12-02'
            note='至2019-12-02' extraText='桌号：A12' arrow='right' iconInfo={{
            size:
              25, color: '#78A4FA', value: 'calendar',
          }} /> 
            <AtListItem title='2019-12-02'
            note='至2019-12-02' extraText='桌号：A12' arrow='right' iconInfo={{
            size:
              25, color: '#78A4FA', value: 'calendar',
          }} /> 
            <AtListItem title='2019-12-02'
            note='至2019-12-02' extraText='桌号：A12' arrow='right' iconInfo={{
            size:
              25, color: '#78A4FA', value: 'calendar',
          }} />  */}
          </AtList>

        </View>
        <View>
            <View style={{margin:'10px',paddingTop:'10px'}}>
          <Text style='font-size:22px;font-weight:400;padding-left: 10px;'> 预约历史</Text>
          </View>
        
        <AtList>
            {appointmentList && appointmentList.map(x => {
              if (new Date(x.start).getTime() < new Date(getFormatDate(new Date())).getTime())
                return (<AtListItem title={x.start}
                  note={'至' + x.end} extraText={'桌号：' + x.desk}  iconInfo={{
                    size:
                     25, color: '#FF4949', value: 'bookmark',
                  }} />)
            }
            )}
          {/*  {appointmentList && appointmentList.map(x => (<AtListItem title={x.start}
              note={'至' + x.end} extraText={'桌号：' + x.desk} iconInfo={{
                size:
                25, color: '#FF4949', value: 'bookmark',
              }} />)
            )}*/}

          </AtList>
        </View>
      </View>
    )
  }
}


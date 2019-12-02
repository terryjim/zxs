import Taro, { Component } from '@tarojs/taro'
import { View, Image, Picker, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtList, AtListItem, AtGrid, AtToast, AtIcon, AtModal,AtButton } from 'taro-ui'
import './index.scss'
import room from '../../assets/images/room.png'
import discount from '../../assets/images/discount.png'
import company from '../../assets/images/company.png'
import car from '../../assets/images/car.png'
import { apiUrl } from '../../config';
import { getFormatDate, DateAdd, strToDate } from '../../utils/date'
import DarkArea from '../../components/darkArea'
import DayArea from '../../components/dayArea'
import CurtainArea from '../../components/curtainArea'
import Vip1Area from '../../components/vip1Area'
import Vip2Area from '../../components/vip2Area'
export default class Order extends Component {
  constructor(props) {
    super(props);
    //let userInfo = Taro.getStorageSync("userInfo")
    this.state = {
      selectPers: ['单人', '双人'],
      selectPersChecked: '单人',
      selectLimit: ['单日', '7天', '30天', '90天', '自选'],
      selectLimitChecked: '单日',
      selectStart: getFormatDate(DateAdd(new Date(), 'd', 1)),
      selectEnd: getFormatDate(DateAdd(new Date(), 'd', 1)),
      //被战胜座位
      occupied: [],
      loading: false
    }
  }
  config = {
    navigationBarTitleText: '桌位预定',
  }
  redirect = (url) => Taro.navigateTo({
    url: url
  })

  onGridClick = (item, number) => {
    if (!this.state.occupied.includes(item.value)) {
      this.redirect(`/pages/order/confirm?desk=${item.value}&persons=${this.state.selectPersChecked}&start=${this.state.selectStart}&end=${this.state.selectEnd}`);
    } else {
      Taro.showToast({ title: '该桌位已被预定', icon: 'none' })
    }
  }

  componentDidMount() {
    this.onSearch()
  }
  componentDidShow() {
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
    switch ( this.state.selectLimit[e.detail.value]) {
    case '单日':
      this.setState({ selectEnd: this.state.selectStart})
      break
    case '7天':
      this.setState({ selectEnd: getFormatDate(DateAdd(new Date( this.state.selectStart), 'd', 7)) })
      break
    case '30天':
      this.setState({ selectEnd: getFormatDate(DateAdd(new Date( this.state.selectStart), 'd', 30)) })
      break
    case '90天':
      this.setState({ selectEnd: getFormatDate(DateAdd(new Date( this.state.selectStart), 'd', 90)) })
      break
  }
  }
  onDateChange = (v, e) => {
    /* console.log('|||||||||||||||||||||||||||||||||||||||')
     console.log(v)
     console.log(e.detail.value)
     console.log('add:' + getFormatDate(DateAdd(new Date(e.detail.value), 'd', -1)))
     console.log('del:' + getFormatDate(DateAdd(new Date(e.detail.value), 'd', 2)))
 */
    if (v === 'start') {
      this.setState({
        selectStart: e.detail.value,
      })
      switch (this.state.selectLimitChecked) {
        case '单日':
          this.setState({ selectEnd: e.detail.value })
          break
        case '7天':
          this.setState({ selectEnd: getFormatDate(DateAdd(new Date(e.detail.value), 'd', 7)) })
          break
        case '30天':
          this.setState({ selectEnd: getFormatDate(DateAdd(new Date(e.detail.value), 'd', 30)) })
          break
        case '90天':
          this.setState({ selectEnd: getFormatDate(DateAdd(new Date(e.detail.value), 'd', 90)) })
          break
      }

    }
    if (v === 'end') {
      this.setState({
        selectEnd: e.detail.value
      })
      switch (this.state.selectLimitChecked) {
        case '单日':
          this.setState({ selectStart: e.detail.value })
          break
        case '7天':
          this.setState({ selectStart: getFormatDate(DateAdd(new Date(e.detail.value), 'd', -7)) })
          break
        case '30天':
          this.setState({ selectStart: getFormatDate(DateAdd(new Date(e.detail.value), 'd', -30)) })
          break
        case '90天':
          this.setState({ selectStart: getFormatDate(DateAdd(new Date(e.detail.value), 'd', -90)) })
          break
      }
    }
  }
  onSearch = () => {
    //根据选中的日期段在数据库中查询所有被占用的座位 
   /*  console.log(this.state.selectStart)
    console.log(this.state.selectEnd) */
    this.setState({ loading: true })
    Taro.showLoading({
      //title: '查询中'
    })
    Taro.cloud
      .callFunction({
        name: "getOccupied",
        data: { start: this.state.selectStart, end: this.state.selectEnd }
      })
      .then(res => {
        let occupiedDesk = []
        if (res.result && res.result.list) {
          res.result.list.map(x => occupiedDesk.push(x._id))
        }
        //console.log(occupiedDesk)
        this.setState({
          occupied: occupiedDesk
        })
        // this.setState({ loading: false })
        Taro.hideLoading()
      }).catch(err => {
        console.error(err)
        //this.setState({ loading: false })
        Taro.hideLoading()
      })

  }

  render() {

    let { openMyToast, myToastText, mybonusList } = this.props
    return (
      <View className='defaultView'>       
          <View className='at-row at-row__justify--around' style={{height:'40px',marginTop:'10px'}}>
         
            <Picker  className='at-col  at-col-2 hasBorder searchCondition' style={{height:'30px', display: 'flex',  justifyContent:'center', alignItems: 'center'}} mode='selector' range={this.state.selectPers} onChange={this.onSelPers}>
            <View className='picker'>
              {this.state.selectPersChecked}
            </View>
          </Picker>
        
          <Picker className='at-col at-col-2 hasBorder' style={{height:'30px', display: 'flex',  justifyContent:'center', alignItems: 'center'}} mode='selector' range={this.state.selectLimit} onChange={this.onSelLimit}>
            <View className='picker'>
              {this.state.selectLimitChecked}
            </View>
          </Picker>
          <Picker className='at-col  at-col-3 hasBorder'  style={{height:'30px', display: 'flex',  justifyContent:'center', alignItems: 'center'}} mode='date'  start={getFormatDate(DateAdd(new Date(), 'd', 1))} value={this.state.selectStart} onChange={this.onDateChange.bind(this, 'start')}>
            <View className='picker'>
              {this.state.selectStart}
            </View>
          </Picker>
         _
          <Picker className='at-col  at-col-3 hasBorder'  style={{height:'30px', display: 'flex',  justifyContent:'center', alignItems: 'center'}} mode='date' start={getFormatDate(DateAdd(new Date(), 'd', 1))} value={this.state.selectEnd} onChange={this.onDateChange.bind(this, 'end')}>
            <View className='picker'>
              {this.state.selectEnd}
            </View>
          </Picker></View>
       
        <AtButton  type='primary' onClick={this.onSearch}>桌位查询</AtButton>
       
      {this.state.selectPersChecked==='单人'?(<View>
        <DarkArea occupied={this.state.occupied} onGridClick={this.onGridClick} />
        <DayArea occupied={this.state.occupied} onGridClick={this.onGridClick} />     
        <CurtainArea occupied={this.state.occupied} onGridClick={this.onGridClick} />
        <Vip1Area occupied={this.state.occupied} onGridClick={this.onGridClick} /></View>):
        (<Vip2Area occupied={this.state.occupied} onGridClick={this.onGridClick} />   )}    
      </View >
    )
  }
}

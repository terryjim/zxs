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

  /* gotoFace = () => Taro.navigateTo({
    url: '/pages/face/index'
  })
  showInfo = (title) => {
    Taro.showToast({
      title: title + "正在上架，敬请期待！",
      icon: 'none',
    });
  } */
  onGridClick = (item, number) => {
    if (!this.state.occupied.includes(item.value)) {
      this.redirect(`/pages/order/confirm?desk=${item.value}&start=${this.state.selectStart}&end=${this.state.selectEnd}`);
    } else {
      Taro.showToast({ title: '该桌位已被预定', icon: 'none' })
    }


  }
 /*  charge = () => {
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
  } */
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
       {/*  <View style={{height:'100px',background:'#cccccc',marginBottom:'20px'}}>
        <Text >条件选择</Text>
        </View> */}
         {/*  <Text className='at-col  at-col__offset-1 at-col-2'>人数：</Text> */}
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
          <Picker className='at-col  at-col-3 hasBorder'  style={{height:'30px', display: 'flex',  justifyContent:'center', alignItems: 'center'}} mode='date' minDate={getFormatDate(DateAdd(new Date(), 'd', 1))} value={this.state.selectStart} onChange={this.onDateChange.bind(this, 'start')}>
            <View className='picker'>
              {this.state.selectStart}
            </View>
          </Picker>
         _
          <Picker className='at-col  at-col-3 hasBorder'  style={{height:'30px', display: 'flex',  justifyContent:'center', alignItems: 'center'}} mode='date' minDate={getFormatDate(DateAdd(new Date(), 'd', 1))} value={this.state.selectEnd} onChange={this.onDateChange.bind(this, 'end')}>
            <View className='picker'>
              {this.state.selectEnd}
            </View>
          </Picker></View>
       
        <AtButton  type='primary' onClick={this.onSearch}>桌位查询</AtButton>
       
        <Text>暗光区</Text>
        <View className='defaultView' style={{backgroundColor:'#cccccc'}}> 
          <AtGrid hasBorder={false} /* mode='rect' */  onClick={this.onGridClick} columnNum={6} data={
            new Array(34).fill(1).map((x, index) => (
              {
                //image: room,
                iconInfo: {
                  size: 15,
                  color: this.state.occupied.includes('A' + (index + 1)) ? '#000000' : '#ffffff',
                  value: this.state.occupied.includes('A' + (index + 1)) ? 'subtract-circle' : 'calendar'
                },
                value: 'A' + (index + 1)

              })
            )
          }
          />
        </View>
         <Text>日光区</Text>
        <View className='defaultView'>
          <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
            new Array(10).fill(1).map((x, index) => (
              {
                //image: room,
                iconInfo: {
                  size: 15,
                  color: this.state.occupied.includes('B' + (index + 1)) ? '#cccccc' : 'blue',
                  value: this.state.occupied.includes('B' + (index + 1)) ? 'subtract-circle' : 'calendar'
                },
                value: 'B' + (index + 1)

              })
            )
          }
          />
        </View>
         <Text>带帘桌位</Text>
        <View className='defaultView'>
          <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
            new Array(6).fill(1).map((x, index) => (
              {
                //image: room,
                iconInfo: {
                  size: 15,
                  color: this.state.occupied.includes('C' + (index + 1)) ? '#cccccc' : 'blue',
                  value: this.state.occupied.includes('C' + (index + 1)) ? 'subtract-circle' : 'calendar'
                },
                value: 'C' + (index + 1)
              })
            )
          }
          />
        </View>
         <Text>独立单间</Text>
        <View className='defaultView'>
          <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
           [{
                //image: room,
                iconInfo: {
                  size: 15,
                  color: this.state.occupied.includes('V2' ) ? '#cccccc' : 'blue',
                  value: this.state.occupied.includes('V2') ? 'subtract-circle' : 'calendar'
                },
                value: 'V2' 

              }]}
          />
        </View>
         <Text>独立双人间</Text>
        <View className='defaultView'>
          <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
            [1,3,4].map((x, index) => (
              {
                //image: room,
                iconInfo: {
                  size: 15,
                  color: this.state.occupied.includes('C' + x) ? '#cccccc' : 'blue',
                  value: this.state.occupied.includes('C' + x) ? 'subtract-circle' : 'calendar'
                },
                value: 'V' + x
              })
            )}
          />
        </View>
        {/* <View className='defaultView'>
          <AtList hasBorder={false}>
            <AtListItem title='姓名' arrow='right' onClick={this.showInfo.bind(this, "我的订单")} />
            <AtListItem title='手机' arrow='right' onClick={this.gotoFace.bind(this)} />
           
            <AtListItem title='意见反馈' arrow='right' onClick={this.redirect.bind(this, "/pages/opinionFeedback/index")} />
            <AtListItem title='关于我们' arrow='right' onClick={this.redirect.bind(this, "/pages/about/index")} />

          </AtList>
        </View>*/}
        {/*  <AtModal isOpened={this.state.loading}>*/}

        {/*       <AtModalContent>
            查询中...
  </AtModalContent>

        </AtModal>*/}
      </View >
    )
  }
}

import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"

export default class Login extends Component {
  state = {
    context: {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: "login",
        data: {}
      })
      .then(res => {
        console.log(res.result)
        this.setState({
          context: res.result
        })
      })
  }

  render() {
    return (
      <View className='index'>
        <Button onClick={this.getLogin}>获取登录云函数</Button>
       {JSON.stringify(this.state.context)}
          <Button onClick={this.getLogin}>获取登录云函数</Button>
          <Text>1:{(this.state.context.userInfo.appId)}</Text>
            <Button onClick={this.getLogin}>获取登录云函数</Button><Text>2:{(this.state.context.userInfo.openId)}</Text>
      </View>
    )
  }
}

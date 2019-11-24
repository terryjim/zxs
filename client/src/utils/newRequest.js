import Taro from '@tarojs/taro';

export default (options = { method: 'GET', data: {}, header: {} }) => {
    let userInfo = Taro.getStorageSync("userInfo")
    userInfo=userInfo?"Bearer "+userInfo.access_token:''
    return Taro.request({
        url: options.url,
        data: {
            ...options.data
        },
        header: {
            'Content-Type': 'application/json',
            'Authorization':userInfo,
            ...options.header
        },
        method: options.method.toUpperCase(),
    }).then((res) => {
        return res;
    })
}

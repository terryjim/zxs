import Taro from '@tarojs/taro';
//rpx换算为px
const rate = Taro.getSystemInfoSync().windowWidth / 750
export default function(rpx) {
    return rate * rpx
}
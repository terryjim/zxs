import Taro from '@tarojs/taro';
import { noConsole } from '../config';
import Tips from '../utils/tips'


const request_data = {
    platform: 'wap',
    rent_mode: 2,
};
const delayLoading = 500  //延迟0.5s显示遮罩，加载速度快时不显示遮罩
let showLoading = false//　显示遮罩中,用于延迟显示遮罩
//如果不想显示遮罩，传参hideLoading为true,loadingTitle为遮罩文字内容
export default (options = { aaa: 1, method: 'GET', data: {}, header: {}, loadingTitle: '', hideLoading: false }) => {
    if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
    }
    let userInfo = Taro.getStorageSync("userInfo")
    userInfo = userInfo ? "Bearer " + userInfo.access_token : ''
    showLoading = true
    if (!options.hideLoading) {
        setTimeout(() => {
            showLoading ?
                Taro.showLoading({
                    title: options.loadingTitle ? options.loadingTitle : '加载中...',
                    mask: true
                }) : null
        }
            , delayLoading)
    }
    return Taro.request({
        url: options.url,
        data: {
            ...request_data,
            ...options.data
        },
        header: {
            'Content-Type': 'application/json',
            'Authorization': userInfo,
            ...options.header
        },
        method: options.method.toUpperCase(),
    }).then((res) => {
        showLoading = false
        Taro.hideLoading()
        const { statusCode, data } = res;
        if (statusCode >= 200 && statusCode < 300) {
            if (!noConsole) {
                console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data);
            }
            if (statusCode !== 200) {
                Taro.showToast({
                    title: `${res.errMsg}~` || data.Data,
                    icon: 'none',
                    mask: true,
                });
            }
            return data;
        } else {
            // Taro.hideNavigationBarLoading()
            showLoading = false
            Taro.hideLoading()
            throw new Error(`网络请求错误，状态码${statusCode}`);
        }
    }).catch(e => {
        showLoading = false
        Taro.hideLoading()
        Tips.toast(`数据获取异常，请稍后再试(${e})`);
    })
}

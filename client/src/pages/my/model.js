import Taro from '@tarojs/taro';
import * as myApi from './service';

export default {
    namespace: 'my',
    state: {
        openMyToast:false,
        myToastText:'',
        mybonusList: {l:[]},
        pageIndex: 0,
    },
    effects: {
        * mybonus({payload}, { call,put,select }) {
            const {mybonusList} = yield select(state => state.my);         
            const { Status:code, Data:data } = yield call(myApi.mybonus, {
                pageIndex:0,pageSize:20,...payload
            });
            let pageIndex=payload&&payload.pageIndex?payload.pageIndex:0
            if (code === 200) {
                //yeild put作用和 redux 中的 dispatch 相同
                yield put({
                    type: 'update',
                    payload: {
                        //往后翻页时前面数据依然保留
                        mybonusList: pageIndex > 0 ? {...mybonusList, l:[...mybonusList.l,...data.l]} : data,
                        pageIndex
                    }
                });
            }
        }
    },
    reducers: {
        update(state, { payload }) {
            return { ...state, ...payload };
        }
    },
};

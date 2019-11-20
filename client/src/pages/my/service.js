import Request from '../../utils/request'
import {apiUrl} from '../../config';

export const mybonus = data => {   
    return    Request({
    url: apiUrl.mybonusList+"/"+data.pageIndex+"/"+data.pageSize,
    method: 'GET',   
})
}
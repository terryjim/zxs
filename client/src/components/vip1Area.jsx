
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'


//VIP单间
const Vip1Area = (props) => {
    return (
        <View className='defaultView' style={{ marginTop: '1px', backgroundColor: '#fcffe6' }}>
            <Text style='font-size:22px;font-weight:400;padding-left: 10px'>独立单间</Text>
            <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
                [{
                    //image: room,
                    iconInfo: {
                        size: 15,
                        color: props.occupied && props.occupied.includes('V2') ? '#f5222d' : '#096dd9',
                        value: props.occupied && props.occupied.includes('V2') ? 'subtract-circle' : 'calendar'
                    },
                    value: 'V2'
                }]}
            />
        </View>
    )
}



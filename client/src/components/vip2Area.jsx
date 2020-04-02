
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'

//VIP双人间
const Vip2Area = (props) => {
    return (
        <View className='defaultView' style={{ marginTop: '3px', backgroundColor: '#e8e8e8' }}>
            <Text style='font-size:22px;font-weight:400;padding-left: 10px'>独立双人间</Text>
            <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                [1, 3, 4].map((x, index) => (
                    {
                        //image: room,
                        iconInfo: {
                            size: 15,
                            color: props.occupied && props.occupied.includes('V' + x) ? '#f5222d' : '#096dd9',
                            value: props.occupied && props.occupied.includes('V' + x) ? 'subtract-circle' : 'calendar'
                        },
                        value: 'V' + x
                    })
                )
            }
            />
        </View>
    )
}
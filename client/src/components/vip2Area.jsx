
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'

//VIP双人间
const Vip2Area = (props) => {
    return (
        <View >
            <Text>独立双人间</Text>
            <View className='defaultView' style={{ backgroundColor: '#cccccc' }}>
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                    [1, 3, 4].map((x, index) => (
                        {
                            //image: room,
                            iconInfo: {
                                size: 15,
                                color: props.occupied && props.occupied.includes('V' + x) ? '#cccccc' : 'blue',
                                value: props.occupied && props.occupied.includes('V' + x) ? 'subtract-circle' : 'calendar'
                            },
                            value: 'V' + x
                        })
                    )
                }
                />
            </View>
        </View>
    )
}

import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'


//VIP单间
const Vip1Area = (props) => {
    return (
        <View >
            <Text>独立单间</Text>
            <View className='defaultView' style={{ backgroundColor: '#cccccc' }}>
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={this.onGridClick} columnNum={6} data={
                    [{
                        //image: room,
                        iconInfo: {
                            size: 15,
                            color: props.occupied && props.occupied.includes('V2') ? '#cccccc' : 'blue',
                            value: props.occupied && props.occupied.includes('V2') ? 'subtract-circle' : 'calendar'
                        },
                        value: 'V2'
                    }]}
                />
            </View>
        </View>
    )
}



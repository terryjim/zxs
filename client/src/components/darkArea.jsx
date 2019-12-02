
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
//暗光区座位
export const DarkArea = (props) => {
    return (
        <View >
            <Text>暗光区</Text>
            <View className='defaultView' style={{ backgroundColor: '#cccccc' }}>
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                    new Array(34).fill(1).map((x, index) => (
                        {
                            //image: room,
                            iconInfo: {
                                size: 15,
                                color: props.occupied && props.occupied.includes('A' + (index + 1)) ? '#000000' : '#ffffff',
                                value: props.occupied && props.occupied.includes('A' + (index + 1)) ? 'subtract-circle' : 'calendar'
                            },
                            value: 'A' + (index + 1)
                        })
                    )
                }
                />
            </View>
        </View>
    )
}


import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'

//带帘座位
export  const CurtainArea = (props) => {
    return (
        <View >
            <Text>带帘桌位</Text>
            <View className='defaultView' style={{ backgroundColor: '#cccccc' }}>
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                    new Array(5).fill(1).map((x, index) => (
                        {
                            //image: room,
                            iconInfo: {
                                size: 15,
                                color: props.occupied && props.occupied.includes('C' + (index + 1)) ? '#000000' : '#ffffff',
                                value: props.occupied && props.occupied.includes('C' + (index + 1)) ? 'subtract-circle' : 'calendar'
                            },
                            value: 'C' + (index + 1)

                        })
                    )
                }
                />
            </View>
        </View>
    )
}


import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'


//日光区座位
const DayArea = (props) => {
    return (
        <View >
            <Text>日光区</Text>
            <View className='defaultView' style={{ backgroundColor: '#cccccc' }}>
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                    new Array(10).fill(1).map((x, index) => (
                        {
                            //image: room,
                            iconInfo: {
                                size: 15,
                                color: props.occupied && props.occupied.includes('B' + (index + 1)) ? '#000000' : '#ffffff',
                                value: props.occupied && props.occupied.includes('B' + (index + 1)) ? 'subtract-circle' : 'calendar'
                            },
                            value: 'B' + (index + 1)

                        })
                    )
                }
                />
            </View>
        </View>
    )
}

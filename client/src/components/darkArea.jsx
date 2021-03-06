
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
//暗光区座位
export const DarkArea = (props) => {
    return (
        <View className='defaultView' style={{marginTop:'3px',backgroundColor: '#e8e8e8' }}>
            <Text style='font-size:22px;font-weight:400;padding-left: 10px'>暗光区</Text>
            <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                new Array(34).fill(1).map((x, index) => (
                    {
                        //image: room,
                        iconInfo: {
                            size: 15,
                            color: props.occupied && props.occupied.includes('A' + (index + 1)) ? '#f5222d' : '#096dd9',
                            value: props.occupied && props.occupied.includes('A' + (index + 1)) ? 'subtract-circle' : 'calendar'
                        },
                        value: 'A' + (index + 1)
                    })
                )
            }
            />
        </View>
    )
}

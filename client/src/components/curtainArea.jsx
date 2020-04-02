
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'

//带帘座位
export  const CurtainArea = (props) => {
    return (
        <View className='defaultView' style={{marginTop:'1px',backgroundColor: '#e8e8e8' }}>
            <Text style='font-size:22px;font-weight:400;padding-left: 10px'>带帘桌位</Text>        
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                    new Array(5).fill(1).map((x, index) => (
                        {
                            //image: room,
                            iconInfo: {
                                size: 15,
                                color: props.occupied && props.occupied.includes('C' + (index + 1)) ? '#f5222d' : '#096dd9',
                                value: props.occupied && props.occupied.includes('C' + (index + 1)) ? 'subtract-circle' : 'calendar'
                            },
                            value: 'C' + (index + 1)
                        })
                    )
                }
                />            
        </View>
    )
}

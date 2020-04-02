
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'


//日光区座位
const DayArea = (props) => {
    return (

<View className='defaultView' style={{marginTop:'1px',background:'#fcffe6' }}>
            <Text style='font-size:22px;font-weight:400;padding-left: 10px'>日光区</Text>
                <AtGrid hasBorder={false} /* mode='rect' */ onClick={props.onGridClick} columnNum={6} data={
                    new Array(10).fill(1).map((x, index) => (
                        {
                            //image: room,
                            iconInfo: {
                                size: 15,
                                color: props.occupied && props.occupied.includes('B' + (index + 1)) ? '#f5222d' : '#096dd9',
                                value: props.occupied && props.occupied.includes('B' + (index + 1)) ? 'subtract-circle' : 'calendar'
                            },
                            value: 'B' + (index + 1)
                        })
                    )
                }
                />
            </View>
       
    )
}

import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

interface DividerProps {
  style?: StyleProp<ViewStyle>
}

const Divider: React.FC<DividerProps> = ({ style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#ccc',
          height: 1,
          // width: '90%',
          // marginLeft: '5%',
          width: '100%',
        },
        style,
      ]}
    />
  )
}

export default Divider

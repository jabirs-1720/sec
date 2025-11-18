// src/components/Grid.tsx

import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface GridProps {
  columns?: number
  gap?: number
  children: React.ReactNode
  style?: ViewStyle
}

const Grid: React.FC<GridProps> = ({ columns = 2, gap = 8, children, style }) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        style,
      ]}
    >
      {childrenArray.map((child, index) => (
        <View
          key={index}
          style={{
            width: `${100 / columns}%`,
            padding: gap / 2,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})

export default Grid

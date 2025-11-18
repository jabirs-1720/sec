import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native'

interface PrimaryButtonProps {
  title: string
  onPress?: () => void
  style?: ViewStyle | ViewStyle[]
}

export default function PrimaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
  },
  text: {
    color: '#ff7300',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
})

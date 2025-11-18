import React from 'react'
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
  StyleSheet,
} from 'react-native'
import Divider from './Divider'
import Ionicon from 'react-native-vector-icons/Ionicons'

interface ListItemProps {
  icon: string
  text: string
  seperator?: boolean
  onPress?: () => void
  style?: ViewStyle
}

const ListItem: React.FC<ListItemProps> = ({ icon, text, seperator=true, onPress, style }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={[
        styles.item,
        style,
        (seperator ? {
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        } : {})
      ]}>
        <Ionicon name={icon} size={24} color='#ff7300' />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 15,
  } as ViewStyle,
  text: {
    fontSize: 18,
    textAlign: 'left',
    flex: 1,
    paddingVertical: 15,
    // color: '#ff7300'
  },
})

export default ListItem

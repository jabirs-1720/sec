// Components
import React from 'react'
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle
} from 'react-native'

type CardProps = {
  image: string
  category: string
  title: string
  subtitle: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  subtitle,
  onPress,
  style,
}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: '100%',
    height: 110,
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
  category: {
    textAlign: 'left',
    fontSize: 13,
    marginTop: 7,
    color: '#ff7300',
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    marginVertical: 7,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 13,
    opacity: 0.55,
  },
})

export default Card

import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Maticons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserContext } from './UserContext'

interface ToolbarProps {
  title: string
}

const Toolbar: React.FC<ToolbarProps> = ({ title }) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { user } = useContext(UserContext)

  const getInitials = () => {
    if (!user?.name) return null
    const names = user.name.split(' ')
    const firstLetter = names[0].charAt(0).toUpperCase()
    const secondLetter = names[1]?.charAt(0).toUpperCase() || ''
    return firstLetter + secondLetter
  }

  const handlePress = () => {
    if (user) {
      navigation.navigate('profile')
    } else {
      navigation.navigate('login')
    }
  }

  const initials = getInitials()

  return (
    <View style={[styles.toolbar, { paddingTop: 10 + insets.top }]}>
      <Text style={styles.toolbarTitle}>{title}</Text>
      <TouchableOpacity onPress={handlePress} style={styles.profile}>
        {initials ? (
          <View style={styles.profileCircle}>
            <Text style={styles.profileShortcut}>{initials}</Text>
          </View>
        ) : (
          Platform.select({
            ios: <Ionicons name="person-circle" size={30} color="#555" />,
            android: <Maticons name="account-circle" size={30} color="#555" />
          })
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolbarTitle: {
    fontSize: 37,
    fontWeight: 'bold',
  },
  profile: {
    width: 37,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCircle: {
    width: 37,
    height: 37,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileShortcut: {
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default Toolbar

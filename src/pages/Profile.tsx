import React, { useContext } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Br from '../components/Br'
import ListItem from '../components/ListItem'
import { UserContext } from '../components/UserContext'
import { useNavigation } from '@react-navigation/native'

const Profile: React.FC = () => {
  const navigation = useNavigation()
  const { user, logout } = useContext(UserContext)

  const handleLogout = async () => {
    Alert.alert('تأكيد', 'هل تريد تسجيل الخروج؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'نعم',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout()
            navigation.replace('login') // بعد تسجيل الخروج توجه المستخدم لتسجيل الدخول
          } catch (error) {
            Alert.alert('خطأ', 'حدث خطأ أثناء تسجيل الخروج')
          }
        },
      },
    ])
  }

  return (
    <>
      <Br />
      <View style={styles.card}>
        <ListItem
          icon="person-outline"
          text={`الملف الشخصي: ${user?.name || ''}`}
          style={styles.listItem}
        />
        <ListItem
          icon="log-out-outline"
          text="تسجيل الخروج"
          seperator={false}
          style={styles.listItem}
          onPress={handleLogout}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '90%',
    marginInlineStart: '5%',
    borderRadius: 10,
  },
  listItem: {
    paddingRight: 0,
  },
})

export default Profile

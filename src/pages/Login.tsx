import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { UserContext } from '../components/UserContext'

const Login: React.FC = () => {
  const navigation = useNavigation()
  const { login } = useContext(UserContext)
  const [id, setID] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert('خطأ', 'الرجاء إدخال جميع الحقول')
      return
    }

    try {
      setLoading(true)
      await login(id, password)
      // بعد تسجيل الدخول، يتم التوجيه تلقائيًا عبر Context
      navigation.goBack()
    } catch (error: any) {
      Alert.alert('خطأ', error.message || 'حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="رقم الهوية"
          placeholderTextColor="#999"
          value={id}
          onChangeText={setID}
          autoCapitalize="none"
          autoCorrect={false}
          textAlign="right"
        />
        <View style={styles.separator} />
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          textAlign="right"
        />
      </View>

      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => navigation.replace('signup')}
      >
        <Text style={styles.forgotPasswordText}>إنشاء حساب</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, justifyContent: 'center' },
  form: { borderRadius: 10, marginBottom: 25, borderWidth: 1, borderColor: '#ddd', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  input: { height: 50, paddingHorizontal: 15, fontSize: 17, color: '#000' },
  separator: { height: 1, backgroundColor: '#E5E5E5', marginLeft: 15 },
  loginButton: { height: 50, borderRadius: 10, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  loginButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
  forgotPasswordButton: { alignSelf: 'center', padding: 10 },
  forgotPasswordText: { color: '#007AFF', fontSize: 15 },
})

export default Login

import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
  id: string
  password: string
  name: string
}

export const registerUser = async (id: string, password: string, name: string): Promise<User> => {
  const usersData = await AsyncStorage.getItem('users')
  const users: User[] = usersData ? JSON.parse(usersData) : []

  const exists = users.find((u) => u.id === id)
  if (exists) throw new Error('هذا المستخدم موجود بالفعل')

  const newUser: User = { id, password, name }
  users.push(newUser)
  await AsyncStorage.setItem('users', JSON.stringify(users))

  // تخزين المستخدم الحالي مباشرة عند التسجيل
  await AsyncStorage.setItem('currentUser', JSON.stringify(newUser))

  return newUser
}

export const loginUser = async (id: string, password: string): Promise<User> => {
  const usersData = await AsyncStorage.getItem('users')
  const users: User[] = usersData ? JSON.parse(usersData) : []

  const found = users.find((u) => u.id === id && u.password === password)
  if (!found) throw new Error('بيانات الدخول غير صحيحة')

  await AsyncStorage.setItem('currentUser', JSON.stringify(found))
  return found
}

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await AsyncStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

export const logoutUser = async (): Promise<void> => {
  await AsyncStorage.removeItem('currentUser')
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
}

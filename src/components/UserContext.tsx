import React, { createContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
  id: string
  name: string
  password: string
}

interface UserContextType {
  user: User | null
  login: (id: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (id: string, password: string, name: string) => Promise<void>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
})

interface Props {
  children: ReactNode
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser')
      if (storedUser) setUser(JSON.parse(storedUser))
    }
    loadUser()
  }, [])

  const login = async (id: string, password: string) => {
    const usersData = await AsyncStorage.getItem('users')
    const users: User[] = usersData ? JSON.parse(usersData) : []
    const found = users.find(u => u.id === id && u.password === password)
    if (!found) throw new Error('بيانات الدخول غير صحيحة')
    await AsyncStorage.setItem('currentUser', JSON.stringify(found))
    setUser(found)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('currentUser')
    setUser(null)
  }

  const register = async (id: string, password: string, name: string) => {
    const usersData = await AsyncStorage.getItem('users')
    const users: User[] = usersData ? JSON.parse(usersData) : []

    const exists = users.find(u => u.id === id)
    if (exists) throw new Error('هذا المستخدم موجود بالفعل')

    const newUser: User = { id, password, name }
    users.push(newUser)
    await AsyncStorage.setItem('users', JSON.stringify(users))
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser))
    setUser(newUser)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  )
}

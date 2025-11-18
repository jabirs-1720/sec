import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { I18nManager } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// Components
import BottomNavigation from './src/components/BottomNavigation'

// Pages
import Greeting from './src/pages/Greeting'
import Home from './src/pages/Home'
import Cart from './src/pages/Cart'
import SearchResults from './src/pages/SearchResults'
import Search from './src/pages/Search'
import Product from './src/pages/Product'
import Category from './src/pages/Category'
import Profile from './src/pages/Profile'
import Login from './src/pages/Login'
import Signup from './src/pages/Signup'
import { UserProvider } from './src/components/UserContext'
import { CartProvider } from './src/components/CartContext'

I18nManager.forceRTL(true)
I18nManager.allowRTL(true)

const Stack = createNativeStackNavigator()

const structure = [
  { id: 'home', icon: 'home', name: 'الرئيسية', page: <Home /> },
  { id: 'cart', icon: 'cart', name: 'عربة التسوق', page: <Cart /> },
  { id: 'search', icon: 'search', name: 'البحث', page: <Search /> },
]

const Main = () => {
  return <BottomNavigation structure={structure} />
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{headerTitle: 'الترحيب', headerShown: false}} name='greeting' component={Greeting} />
              <Stack.Screen options={{headerTitle: 'الرئيسية', headerShown: false}} name='main' component={Main} />
              <Stack.Screen options={{headerTitle: 'المنتج'}} name='product' component={Product} />
              <Stack.Screen options={{headerTitle: 'تصنيف'}} name='category' component={Category} />
              <Stack.Screen options={{headerTitle: 'الملف الشخصي'}} name='profile' component={Profile} />
              <Stack.Screen options={{headerTitle: 'البحث'}} name='searchResults' component={SearchResults} />
              <Stack.Screen options={{headerTitle: 'تسجيل الدخول'}} name='login' component={Login} />
              <Stack.Screen options={{headerTitle: 'إنشاء حساب'}} name='signup' component={Signup} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default App
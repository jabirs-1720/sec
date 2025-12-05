import React, { useState, useEffect } from 'react'
import { Platform, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Maticons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CartContext } from './CartContext'
import { useContext } from 'react'

const pages = [
  { id: 'home', icon: 'home', name: 'الرئيسية' },
  { id: 'cart', icon: Platform.select({ios: 'cart', android: 'shopping-cart'}), name: 'عربة التسوق' },
  { id: 'search', icon: 'search', name: 'البحث' },
]

const CART_KEY = '@cart_items'

const BottomNavigation = ({ structure }) => {
  const insets = useSafeAreaInsets()
  const [pageIndex, setPageIndex] = useState(0)
  const { cart } = useContext(CartContext)
  const cartCount = cart.length

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {structure[pageIndex].page}
      </ScrollView>

      <View style={styles.bottomNavigation}>
        {pages.map((page, index) => (
          <Pressable
            key={page.id}
            style={[styles.button, { paddingBottom: insets.bottom }]}
            onPress={() => setPageIndex(index)}
          >
            <View style={{ position: 'relative' }}>
              {Platform.select({
                ios: <Ionicons name={page.icon} size={24} color={index === pageIndex ? '#ff7300' : '#888'}/>,
                android: <Maticons name={page.icon} size={24} color={index === pageIndex ? '#ff7300' : '#888'}/>,
              })}
              {/* Badge لعربة التسوق */}
              {page.id === 'cart' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.text, index === pageIndex && styles.textSelected]}>
              {page.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  bottomNavigation: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
  text: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  textSelected: {
    color: '#ff7300',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -12,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    paddingHorizontal: 5,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
})

export default BottomNavigation

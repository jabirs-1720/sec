import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toolbar from '../components/Toolbar'
import Br from '../components/Br'
import FlatButton from '../components/FlatButton'
import PrimaryButton from '../components/PrimaryButton'
import { CartContext } from '../components/CartContext'
import { useNavigation } from '@react-navigation/native'

const CART_KEY = '@cart_items'

// Component لعرض كل منتج في العربة
interface CartListItemProps {
  image: string
  name: string
  price: string
  installmentMonths?: number // نضيف هذا لتحديد عدد أشهر التقسيط
  onPress?: () => void
  onDelete?: () => void
}

const CartListItem: React.FC<CartListItemProps> = ({ image, name, price, installmentMonths = 12, onPress, onDelete }) => {
  const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ''))
  const installmentPrice = !isNaN(priceNumber) ? priceNumber / installmentMonths : 0

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.product}>
        <View style={styles.productInfo}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.detailsContainer}>
            {/* صف الاسم والسعرين */}
            <View style={styles.namePriceRow}>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                {name}
              </Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.price}>{price} ر.س</Text>
                <Text style={styles.installmentPrice}>{installmentPrice.toFixed(2)} ر.س / شهر</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <FlatButton title="حذف" onPress={onDelete} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const Cart: React.FC = () => {
  const navigation = useNavigation()
  const { removeFromCart, cart } = useContext(CartContext)

  const installmentMonths = 12
  const totalInstallment = cart.reduce((sum, item) => {
    const priceNumber = parseFloat(item.subtitle.replace(/[^0-9.]/g, ''))
    return sum + (isNaN(priceNumber) ? 0 : priceNumber / installmentMonths)
  }, 0)

  const total = cart.reduce((sum, item) => {
    const priceNumber = parseFloat(item.subtitle.replace(/[^0-9.]/g, ''))
    return sum + (isNaN(priceNumber) ? 0 : priceNumber)
  }, 0)

  if (cart.length === 0) {
    return (
      <>
        <Toolbar title="عربة التسوق" />
        <Text style={styles.empty}>عربة التسوق فارغة.</Text>
      </>
    )
  }

  return (
    <>
      <Toolbar title="عربة التسوق" />
      
      <ScrollView style={{ flex: 1 }}>
        <Br />
        {cart.map((product, idx) => (
          <View key={`${product.title}-${idx}`}>
            <CartListItem
              image={product.images[0]}
              name={product.title}
              price={product.subtitle}
              installmentMonths={installmentMonths} // تمرير عدد أشهر التقسيط
              onPress={() => navigation.push('product', {product: product})}
              onDelete={() => removeFromCart(product.id)}
            />
            <Br />
          </View>
        ))}
        
        <View style={styles.payment}>
          <View style={styles.total}>
            <Text style={styles.key}>السعر الإجمالي للشراء</Text>
            <Text style={styles.value}>{total.toFixed(2)} ر.س</Text>
          </View>
          <View style={[styles.total, {marginVertical: 20}]}>
            <Text style={styles.key}>قسط شهري ({installmentMonths} شهراً)</Text>
            <Text style={styles.value}>{totalInstallment.toFixed(2)} ر.س / شهر</Text>
          </View>
          <Br />
          <View style={{ gap: 10 }}>
            <PrimaryButton style={{ flex: 1 }} title="الدفع مباشرة" />
            <PrimaryButton
              style={{ flex: 1, backgroundColor: '#007AFF' }}
              title="التقسيط على فاتورة الكهرباء"
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  key: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 18,
  },
  payment: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 20
  },
  product: {
    width: '90%',
    marginInlineStart: '5%',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productInfo: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 1,
    width: '100%',
    textAlign: 'left',
  },
  price: {
    fontSize: 18,
    opacity: 0.6,
    marginTop: 4,
  },
  actions: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  empty: {
    flex: 1,
    fontSize: 20,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 20
  },
  namePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  installmentPrice: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  }
})

export default Cart

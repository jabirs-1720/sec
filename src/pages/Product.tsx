// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'

// Components
import {
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import OutlineButton from '../components/OutlineButton'
import Br from '../components/Br'
import Divider from '../components/Divider'
import Grid from '../components/Grid'
import Card from '../components/Card'
import categories from '../utils/products'
import { CartContext } from '../components/CartContext'

type ProductType = {
  title: string
  subtitle: string
  image: string
  specifications: (string | number)[][]
  [key: string]: any
}

type ProductRouteProp = RouteProp<{ Product: { product: ProductType } }, 'Product'>

const { width } = Dimensions.get('window')

const Product: React.FC = () => {
  const navigation = useNavigation()
  const { params } = useRoute<ProductRouteProp>()
  const { product } = params
  const { cart, addToCart, removeFromCart } = useContext(CartContext)
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imgHeight, setImgHeight] = useState(200)

  const inCart = cart.some(i => i.id === product.id)

  useEffect(() => {
    loadRelatedProducts()
  }, [])

  useEffect(() => {
    Image.getSize(product.images[0], (w, h) => {
      const ratio = width / w
      setImgHeight(h * ratio)
    })
  }, [product.images])

  useEffect(() => {
    navigation.setOptions({ headerTitle: product.title })
  }, [navigation, product.title])

  const loadRelatedProducts = () => {
    // جلب كل المنتجات من كل الفئات
    const allProducts = categories.flatMap(cat => cat.products)
    // فرز عشوائي
    const shuffled = allProducts.sort(() => 0.5 - Math.random())
    // استثناء المنتج الحالي
    const filtered = shuffled.filter(p => p.title !== product.title)
    setRelatedProducts(filtered.slice(0, 6)) // عرض 6 منتجات فقط
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.subtitle}>{product.subtitle}.</Text>
      <FlatList
        data={product.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.image, {height: imgHeight - 50, maxHeight: 500}]}
            resizeMode="contain"
          />
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        {product.images.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: idx === currentIndex ? '#aaa' : '#ddd',
              marginHorizontal: 4
            }}
          />
        ))}
      </View>

      {inCart ? (
        <OutlineButton
          title="الحذف من عربة التسوق"
          style={styles.addToCart}
          onPress={() => removeFromCart(product.id)}
        />
      ) : (
        <PrimaryButton
          title="إضافة إلى عربة التسوق"
          style={styles.addToCart}
          onPress={() => addToCart(product)}
        />
      )}

      <Br />
      <Divider />
      <Br />

      <Text style={styles.productInfoTitle}>معلومات المنتج</Text>

      <Grid columns={2} gap={10}>
        {product.specifications.map((spec, idx) => (
          <View key={idx}>
            <Text style={styles.key}>{spec[0]}</Text>
            <Text style={styles.value}>{spec[1]}</Text>
            <Br />
          </View>
        ))}
      </Grid>

      <Br />
      <Divider />
      <Br />

      {/* قسم قد يعجبك أيضًا */}
      <Text style={styles.productInfoTitle}>قد يعجبك أيضًا</Text>

      <ScrollView style={styles.relatedProducts} horizontal>
        <View style={{ width: 20 }} />
        {relatedProducts.map((product, index) => (
          <Card
            key={`${product.id}-${index}`} // ضمان مفتاح فريد
            style={styles.relatedProduct}
            category={product.category}
            title={product.title}
            subtitle={product.subtitle}
            image={product.images[0]}
            onPress={() => navigation.push('product', { product: product })}
          />
        ))}
      </ScrollView>

      <Br />
      <Br />
      <Br />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.5,
    textAlign: 'center'
  },
  image: {
    width: width - 50,
    marginInline: 25,
    marginTop: 50,
    borderRadius: 20,
  },
  addToCart: {
    margin: 20,
    marginTop: 40
  },
  productInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'left'
  },
  key: {
    opacity: 0.6,
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: 'left'
  },
  value: {
    fontSize: 19,
    marginHorizontal: 20,
    textAlign: 'left'
  },
  relatedProducts: {
    paddingBottom: 20
  },
  relatedProduct: {
    width: 175,
    marginInlineEnd: 20
  }
})

export default Product

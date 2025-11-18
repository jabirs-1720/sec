import React from 'react'
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import categories from '../utils/products'

type RootStackParamList = {
  SearchResults: { query: string }
}

const SearchResults = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, 'SearchResults'>>()
  const { query } = route.params

  const allProducts = categories.flatMap(category => category.products)

  const filteredProducts = allProducts.filter(product => {
    const lowerQuery = query.trim().toLowerCase()

    // دمج كل نصوص المنتج
    const productText = [
      product.title,
      product.category,
      ...product.specifications.flat()
    ]
      .join(' ')
      .toLowerCase()

    return productText.includes(lowerQuery)
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredProducts.length === 0 ? (
        <Text style={styles.noResults}>لا توجد نتائج</Text>
      ) : (
        filteredProducts.map((product, _) => (
          <TouchableOpacity
            activeOpacity={.8}
            key={_}
            style={styles.productCard}
            onPress={() => navigation.push('product', {product: product})}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.subtitle}>{product.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
})

export default SearchResults

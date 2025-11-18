// Hooks
import { useNavigation } from '@react-navigation/native'

// Components
import Grid from '../components/Grid'
import Card from '../components/Card'
import {
  Text,
  View,
  Button,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'

type ProductType = {
  id: string | number
  title: string
  subtitle: string
  image: string
  category?: string
  [key: string]: any
}

type RootStackParamList = {
  home: undefined
  product: { product: ProductType }
  category: { title: string }
}

type NavigationProp = ReturnType<typeof useNavigation<ReactNavigation.NavigationProp<RootStackParamList>>>

type ProductsGridProps = {
  title?: string
  products: ProductType[]
  style?: StyleProp<ViewStyle>
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, title }) => {
  const navigation = useNavigation<NavigationProp>()

  const displayedProducts = title ? products.slice(0, 4) : products

  return (
    <>
      {title && (
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>{title}</Text>
          <Button title="المزيد" onPress={() => navigation.navigate('category', { title })} />
        </View>
      )}
      <Grid style={{ padding: 15 }}>
        {displayedProducts.map((product) => (
          <Card
            key={product.id}
            image={product.images[0]}
            category={product.category || ''}
            title={product.title}
            subtitle={product.subtitle}
            onPress={() => navigation.push('product', { product })}
          />
        ))}
      </Grid>
    </>
  )
}

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  categoryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '75%'
  }
})

export default ProductsGrid

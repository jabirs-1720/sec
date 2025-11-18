// Hooks
import {
  useLayoutEffect
} from 'react'
import {
  useNavigation,
  useRoute,
  RouteProp
} from '@react-navigation/native'

// Components
import {
  StyleSheet,
  ScrollView
} from 'react-native'
import ProductsGrid from '../components/ProductsGrid'
import Br from '../components/Br'

// Utils
import categories from '../utils/products'

type CategoryRouteParams = {
  title?: string
}

const Category = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<Record<string, CategoryRouteParams>, string>>()
  const { title } = route.params || {}

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({ headerTitle: title })
    }
  }, [navigation, title])

  return (
    <ScrollView style={styles.container}>
      <ProductsGrid
        products={categories.find(category => category.name == title)?.products || []}
      />
      <Br />
      <Br />
      <Br />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Category

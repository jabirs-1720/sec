// Components
import {
  Fragment
} from 'react'
import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import Toolbar from '../components/Toolbar'
import Divider from '../components/Divider'
import Br from '../components/Br'
import ProductsGrid from '../components/ProductsGrid'

// Data
import products from '../utils/products'

const Home: React.FC = () => {
  return (
    <ScrollView>
      <Toolbar title="الرئيسية" />
      <Br />

      {products.map((category, _) => (
        <Fragment key={_}>
          <ProductsGrid
            title={category.name}
            products={category.products}
          />

          {_ < products.length - 1 && (
            <>
              <Br />
              <Divider />
              <Br />
            </>
          )}
        </Fragment>
      ))}

      {/* <Category title="الإضاءة" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="الأجهزة المنزلية" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="الحماية الكهربائية" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="الطاقة الشمسية" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="شواحن المركبات" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="المنزل الذكي" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="التجارية والصناعية" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="منتجات SEC" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="منتجات مستقبلية" products={products} />
      <Br />
      <Divider />
      <Br />

      <Category title="الدعم الفني" products={products} /> */}
    </ScrollView>
  )
}

export default Home

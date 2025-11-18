// Hooks
import {
  useNavigation
} from '@react-navigation/native'

// Components
import {
  Text,
    TextInput
} from 'react-native'
import SearchBar from '../components/SearchBar'
import ListItem from '../components/ListItem'
import Br from '../components/Br'

const Search = () => {
  const navigation = useNavigation()
  return (
    <>
      <SearchBar />
      <Br />
      <Br />
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        margin: 20,
        marginBottom: 10
      }}>التصنيفات</Text>
      <ListItem onPress={() => navigation.navigate('category', {title: 'الإضاءة'})} icon='bulb-outline' text='الإضاءة' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'الأجهزة المنزلية'})} icon='home-outline' text='الأجهزة المنزلية' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'الحماية الكهربائية'})} icon='flash-outline' text='الحماية الكهربائية' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'الطاقة الشمسية'})} icon='sunny-outline' text='الطاقة الشمسية' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'شواحن المراكب'})} icon='car-outline' text='شواحن المراكب' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'المنزل الذكي'})} icon='wifi-outline' text='المنزل الذكي' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'التجارية والصناعية'})} icon='business-outline' text='التجارية والصناعية' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'منتجات مستقبلية'})} icon='rocket-outline' text='منتجات مستقبلية' />
      <ListItem onPress={() => navigation.navigate('category', {title: 'أسلاك الكهرباء والعلب الداخلية'})} icon='construct-outline' text='أسلاك الكهرباء والعلب الداخلية' />
    </>
  )
}

export default Search
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native'
import Toolbar from './Toolbar'

interface SearchBarProps extends TextInputProps {}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const navigation = useNavigation()

  const handleSubmit = (event: any) => {
    const query = event.nativeEvent.text // النص اللي كتبه المستخدم
    navigation.push('searchResults', { query }) // مثال: تمرير النص للشاشة التالية
  }

  return (
    <View style={styles.searchBar}>
      <Toolbar title='البحث' />
      <TextInput
        placeholder='إبحث هنا ...'
        style={styles.searchBarInput}
        returnKeyType="search" // يعطي شكل زر البحث على الكيبورد
        onSubmitEditing={handleSubmit}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {},
  searchBarInput: {
    backgroundColor: '#ededf0',
    fontSize: 18,
    padding: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    textAlign: 'right',
  },
})

export default SearchBar

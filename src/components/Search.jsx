import { StyleSheet, TextInput} from 'react-native'
import { colors } from '../global/colors'

const Search = ({setSearch}) => {
  return (
    <TextInput placeholder='Buscar productos'
    onChangeText = {(text) => setSearch(text)}
    style= {styles.searchInput} />

  ) 
}

export default Search

const styles = StyleSheet.create({
  searchInput : {
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 5,
    paddingLeft: 15,
    marginBottom: 3,
    backgroundColor: "white",

  }
})
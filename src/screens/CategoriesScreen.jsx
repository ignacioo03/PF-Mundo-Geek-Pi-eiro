import { StyleSheet, Text, View, FlatList, Image, Pressable,useWindowDimensions, ActivityIndicator} from 'react-native';  
import FlatCard from '../components/FlatCard';
import { useState,useEffect } from 'react';
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import {setCategory} from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService';

const CategoriesScreen = ({ navigation }) => {

  const { width, height } = useWindowDimensions();
  const [isPortrait, setIsPortrait] = useState(true);


//seleccionar algo del estado global
const {data: categories, error , isLoading} = useGetCategoriesQuery()


// realiza un cambio en el estado global
  const dispatch = useDispatch()

  useEffect(() => {
    if (width > height) {
      setIsPortrait(false);
    } else {
      setIsPortrait(true);
    }
  }, [width, height]);

  const renderCategoryItem = ({ item, index }) => {
    return (
      <Pressable onPress={() =>{
          dispatch(setCategory(item.title))
          navigation.navigate('Productos')
          }}>
        <FlatCard style={
          index % 2 === 0 
            ? { ...styles.categoryItemContainer, ...styles.row }
            : { ...styles.categoryItemContainer, ...styles.rowReverse }
        }>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={width> 400? styles.categoryTitle: styles.categoryTitleSmall}>{item.title}</Text>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
    {
      isLoading ? <ActivityIndicator size ='large' color={colors.morado}/> : 
      error ? <Text>Hubo un error</Text> : null
    }
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      renderItem={renderCategoryItem}
    />
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoryItemContainer: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryTitleSmall: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
});
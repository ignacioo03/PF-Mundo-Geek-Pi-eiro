import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../services/shopService';
import { setProductId } from '../features/shop/shopSlice';
import Loader from '../components/loader';
import Search from '../components/Search';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import LottieError from '../components/lottieError';
import MontserratText from '../components/MontserratText';

const ProductsScreen = ({ route, navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    // const [showError, setShowError] = useState(false);


    const category = useSelector(state => state.shopReducer.value.categorySelected);
    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category);

    const dispatch = useDispatch();
    // Configuro temporizador para mostrar el loader durante 2.5 segundos
    useEffect(() => {
        setShowLoader(true);
        const timer = setTimeout(() => setShowLoader(false), 2500);
        return () => clearTimeout(timer);
    }, [category]);

    // Filtrar productos por búsqueda
    useEffect(() => {
        if (productsFilteredByCategory) {
            setProductsFiltered(
                search
                    ? productsFilteredByCategory.filter(product =>
                        product.title.toLowerCase().includes(search.toLowerCase())
                    )
                    : productsFilteredByCategory
            );
        }
    }, [search, productsFilteredByCategory]);

    const renderProductItem = ({ item }) => {
        return (
            <Pressable
                onPress={() => {
                    dispatch(setProductId(item.id));
                    navigation.navigate('Producto');
                }}>
                <FlatCard style={styles.productContainer}>
                    <View>
                        <Image source={{ uri: item.mainImage }} style={styles.productImage} resizeMode="contain" />
                    </View>
                    <View style={styles.productDescription}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                        {/* Tags */}
                        <View style={styles.tags}>
                            <Text style={styles.tagsText}>Tags: </Text>
                            {item.tags?.map(tag => (
                                <Text key={tag} style={styles.tagsText}>
                                    {tag}
                                </Text>
                            ))}
                        </View>
                        {/* Descuento */}
                        {item.discount > 0 && (
                            <View style={styles.discount}>
                                <Text style={styles.discountText}>Descuento: {`${item.discount} %`}</Text>
                            </View>
                        )}
                        {/* Sin stock */}
                        {item.stock <= 0 && <Text style={styles.noStockText}>Agotado</Text>}
                        <Text style={styles.price}>Precio: $ {item.price}</Text>
                    </View>
                </FlatCard>
            </Pressable>
        );
    };

    if (showLoader || isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Loader />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <LottieError />
                <Text style={styles.errorMessage}>Error al cargar los productos 😣</Text>
            </View>
        );
    }

    return (
        <>
            <Pressable onPress={() => navigation.goBack()}>
                <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
            </Pressable>
            <View style={styles.searchContainer}>
            <Search setSearch={setSearch} />
            </View>
            <FlatList data={productsFiltered} keyExtractor={item => item.id} renderItem={renderProductItem} />
        </>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        gap: 15,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
        shadowColor: colors.negro,
        shadowOpacity:1,
        shadowRadius: 1,
        shadowOffset: {width: 3, height: 5},
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productDescription: {
        width: '75%',
        padding: 20,
        gap: 10,
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontSize: 20,
        fontWeight: '700',
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagsText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.morado,
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
    },
    discount: {
        backgroundColor: '#FF5722',
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    discountText: {
        color: 'white',
    },
    noStockText: {
        color: 'red',
    },
    goBack: {
        color: colors.morado,
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'Montserrat',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorMessage: {
        fontSize:24 ,
        color:"red",
        fontFamily:'PressStart2P',
    },
});
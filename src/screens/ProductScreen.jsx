import { StyleSheet, Text, View, Pressable, useWindowDimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../global/colors';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../services/shopService';
import Loader from '../components/loader';

const ProductScreen = ({ route, navigation }) => {
    const productId = useSelector(state => state.shopReducer.value.productId);
    const { width } = useWindowDimensions();

    const { data: productFound, error, isLoading } = useGetProductQuery(productId);

    const [showLoader, setShowLoader] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        // Muestra el loader durante 2.5 segundos antes de ocultarlo
        const timer = setTimeout(() => setShowLoader(false), 2500);
        return () => clearTimeout(timer);
    }, [productId]);

    if (showLoader || isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Loader />
            </View>
        );
    }

    if (error) {
        return <Text>Error al cargar el producto</Text>;
    }

    return (
        <ScrollView style={styles.productContainer}>
            <Pressable onPress={() => navigation.goBack()}>
                <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
            </Pressable>
            <Text style={styles.textBrand}>{productFound.brand}</Text>
            <Text style={styles.textTitle}>{productFound.title}</Text>
            <Image
                source={{ uri: productFound.mainImage }}
                alt={productFound.title}
                width="100%"
                height={width * 0.7}
                resizeMode="contain"
            />
            <Text style={styles.longDescription}>{productFound.longDescription}</Text>
            <View style={styles.tagsContainer}>
                <View style={styles.tags}>
                    <Text style={styles.tagText}>Tags: </Text>
                    {productFound.tags?.map(tag => (
                        <Text key={tag} style={styles.tagText}>{tag}</Text>
                    ))}
                </View>
                {productFound.discount > 0 && (
                    <View style={styles.discount}>
                        <Text style={styles.discountText}>- {productFound.discount} %</Text>
                    </View>
                )}
            </View>
            {productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}
            <Text style={styles.price}>Precio: $ {productFound.price}</Text>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed && productFound.stock > 0 ? 0.95 : 1 },
                    styles.addToCartButton,
                    productFound.stock <= 0 && styles.disabledButton,
                ]}
                onPress={() => {
                    if (productFound.stock > 0) {
                        dispatch(addItem({ ...productFound, quantity: 1 }));
                    }
                }}
                disabled={productFound.stock <= 0}
            >
                <Text style={[styles.textAddToCart, productFound.stock <= 0 && styles.disabledText]}>
                    {productFound.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                </Text>
            </Pressable>
        </ScrollView>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    goBack: {
        padding: 8,
        color: colors.grisMedio,
    },
    productContainer: {
        paddingHorizontal: 16,
    },
    textBrand: {
        color: colors.grisOscuro,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.morado,
    },
    discount: {
        backgroundColor: colors.naranjaBrillante,
        width: 64,
        height: 64,
        borderRadius: 64,
    },
    discountText: {
        color: colors.blanco,
        textAlign: 'center',
        lineHeight: 64,
    },
    noStockText: {
        color: 'red',
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16,
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginVertical: 16,
    },
    textAddToCart: {
        color: colors.blanco,
        fontSize: 24,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, goBack: {
        color: colors.morado,
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'Montserrat',
    },
    disabledButton: {
        backgroundColor: colors.grisClaro
    },
    disabledText: {
        color: colors.grisMedio
    },
});
import { FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FlatCard from '../components/FlatCard';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { removeReceipt} from '../features/cart/cartSlice';

const ReceiptsScreen = () => {

  const [expandedReceipts, setExpandedReceipts] = useState([]);

  const toggleExpand = (id) =>
    setExpandedReceipts(expandedReceipts =>
      expandedReceipts.includes(id)
        ? expandedReceipts.filter((expandedId) => expandedId !== id)
        : [...expandedReceipts, id]
    );

  const dispatch = useDispatch();
  
    const receipts = useSelector(state => state.cartReducer.value.receipts);

    const renderReceiptItem = ({ item }) => {
      const isExpanded = expandedReceipts.includes(item.id);
  
      return (
          <FlatCard style={styles.receiptContainer}>
              <Text style={styles.title}>Recibo nro: {item.id}</Text>
              <Text style={styles.date}>Creado el {new Date(item.createdAt).toLocaleString('es-AR')} Hs.</Text>
              <Text style={styles.total}>Total: ${item.total}</Text>
              
              <Pressable onPress={() => toggleExpand(item.id)}>
                  <Icon
                      name={isExpanded ? "expand-less" : "visibility"}
                      size={24}
                      color={colors.grisOscuro}
                      style={styles.viewIcon}
                  />
              </Pressable>
              
              {/* Mostrar detalles si está expandido */}
              {isExpanded && (
                  <View style={styles.detailsContainer}>
                      {item.items.map((product, index) => (
                          <View key={index} style={styles.productDetails}>
                              <Text style={styles.productText}>Producto: {product.title}</Text>
                              <Text style={styles.productText}>Cantidad: {product.quantity}</Text>
                              <Text style={styles.productText}>Precio Unitario: ${product.price}</Text>
                          </View>
                      ))}
                  </View>
              )}
              
              <Pressable onPress={() => dispatch(removeReceipt(item.id))}>
                  <Icon name="delete" size={24} color={colors.morado} style={styles.trashIcon} />
              </Pressable>
          </FlatCard>
      );
  };

    return (
        <FlatList
            data={receipts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReceiptItem}
        />
    );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
    receiptContainer: {
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        gap: 10,
    },
    title: {
        fontWeight: '700',
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    total: {
        fontSize: 16,
        fontWeight: '700',
    },
    viewIcon: {
        alignSelf: 'flex-end',
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginTop: 24,
        color: 'red',
    },
    detailsContainer: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
  },
  productDetails: {
      marginBottom: 8,
  },
  productText: {
      fontSize: 16,
      color: 'black',
      fontFamily: 'Montserrat',
      fontWeight: '700',
  },
});
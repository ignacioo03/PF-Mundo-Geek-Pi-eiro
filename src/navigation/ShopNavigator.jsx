import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native"

import {ProductScreen, CategoriesScreen, ProductsScreen} from "../screens/index"
import Header from "../components/Header"


const stack = createNativeStackNavigator()


const ShopNavigator = () => {
  return (
    
    <stack.Navigator screenOptions={{
      header : ({route}) => <Header subtitle={route.name}/>
      }}
    >
      <stack.Screen name="Categorias" component={CategoriesScreen} /> 
      <stack.Screen name="Productos" component={ProductsScreen} />
      <stack.Screen name="Producto" component={ProductScreen} />

    </stack.Navigator>
    
  )
}

export default ShopNavigator

const styles = StyleSheet.create({})
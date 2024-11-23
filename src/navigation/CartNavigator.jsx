import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet } from "react-native"
import CartScreen from "../screens/CartScreen"
// import CheckoutScreen from "../screens/CheckoutScreen"
import Header from "../components/Header"

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <CartStack.Navigator  screenOptions={{
      header : ({route}) => <Header subtitle={route.name}/>
      }}>
        <CartStack.Screen name="Carrito" component={CartScreen} />
    </CartStack.Navigator>
  )
}

export default CartNavigator

const styles = StyleSheet.create({})
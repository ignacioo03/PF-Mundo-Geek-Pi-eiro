import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator"
import ReceiptsNavigator from "./ReceiptsNavigator"
import ProfileNavigator from "./ProfileNavigator"
import { colors } from "../global/colors"
import MyPlacesNavigator from "./MyPlacesNavigator"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useSelector } from "react-redux"

const Tab = createBottomTabNavigator()
const TabNavigator = () => {

const cartLenght = useSelector(state => state.cartReducer.value.cartLenght)
  return (

    <Tab.Navigator initialRouteName="Shop" screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}>
      <Tab.Screen
        name="Shop"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="storefront"
              size={24}
              color={focused ? colors.azulCobalto : colors.grisOscuro}
            />
          )
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-cart"
              size={24}
              color={focused ? colors.azulCobalto : colors.grisOscuro}
            />
          ),
          tabBarBadge: cartLenght > 0 ? cartLenght : null
          
        }}
      />

      <Tab.Screen
        name="Receipts"
        component={ReceiptsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="receipt"
              size={24}
              color={focused ? colors.azulCobalto : colors.grisOscuro}
            />
          )
        }}
      />

<Tab.Screen
        name="Places"
        component={MyPlacesNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="location-on"
              size={24}
              color={focused ? colors.azulCobalto : colors.grisOscuro}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="account-circle"
              size={24}
              color={focused ? colors.azulCobalto : colors.grisOscuro}
            />
          )
        }}
      />

    </Tab.Navigator>

  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    backgroundColor: colors.grisClaro,
  }
})
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReceiptsScreen from '../screens/ReceiptsScreen'
import Header from '../components/Header'

const receiptsStack = createNativeStackNavigator()
const ReceiptsNavigator = () => {
  return (

    <receiptsStack.Navigator screenOptions={{
      header : ({route}) => <Header subtitle={route.name}/>
      }}>
      <receiptsStack.Screen  component={ReceiptsScreen}  name="Recibos"/>
    </receiptsStack.Navigator>
  )
}

export default ReceiptsNavigator


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPlacesScreen from "../screens/MyPlacesScreen";
import Header from "../components/Header";

const stack = createNativeStackNavigator();


const MyPlacesNavigator = () => (
    <stack.Navigator screenOptions={{ header: ({ route }) => <Header title= "Mundo Geek" subtitle={route.name} /> }}>
        <stack.Screen name="Mis lugares" component={MyPlacesScreen} />
    </stack.Navigator>
)

export default MyPlacesNavigator
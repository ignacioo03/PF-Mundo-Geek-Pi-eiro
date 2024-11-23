import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../components/Header";

const stack = createNativeStackNavigator();


const ProfileNavigator = () => (
    <stack.Navigator screenOptions={{ header: ({ route }) => <Header title= "Mundo Geek" subtitle={route.name} /> }}>
        <stack.Screen name="Perfil" component={ProfileScreen} />
    </stack.Navigator>
)

export default ProfileNavigator
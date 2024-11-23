import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

const stack = createNativeStackNavigator()

const AuthNavigator = () => {
    return(
        <stack.Navigator screenOptions={{headerShown: false}}>
            <stack.Screen name="Signup" component={SignupScreen} />
            <stack.Screen name="Login" component={LoginScreen} />
        </stack.Navigator>
    )
}

export default AuthNavigator
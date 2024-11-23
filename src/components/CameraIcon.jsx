import { View, StyleSheet } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors'

const CameraIcon = () => {
  return (
    <View style = {styles.iconContainer}>
        <Icon name="photo-camera" size={28} color={colors.blanco} />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grisOscuro,
        width: 48,
        height: 48,
        borderRadius: 32,
    }
})
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../global/colors'
import CameraIcon from '../components/CameraIcon'
import FolderIcon from '../components/FolderIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../services/userService'

const ProfileScreen = () => {
  const image = useSelector((state) => state.authReducer.value.profilePicture)
  const user = useSelector((state) => state.authReducer.value.email)
  const localId = useSelector((state) => state.authReducer.value.localId)
  const dispatch = useDispatch()

  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

  const verifyCameraPermisions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    return granted
  }

  const pickImage = async () => {
    const permissionOk = await verifyCameraPermisions()
    if (permissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.7,
      })
      if (!result.canceled) {
        dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
        triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
      }
    } else {
      console.log('permiso no ok')
    }
  }

  const pickImageLibrary = async () => {
    const permissionOk = await verifyCameraPermisions()
    if (permissionOk) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.7,
      })
      if (!result.canceled) {
        dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
        triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId })
      }
    }
  }

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageAndIconsContainer}>
        <View style={styles.imageProfileContainer}>
          {image ? (
            <Image source={{ uri: image }} resizeMode="cover" style={styles.profileImage} />
          ) : (
            <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
          )}
        </View>
        <View style={styles.iconsContainer}>
          <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
            <CameraIcon />
          </Pressable>
          <Pressable onPress={pickImageLibrary} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
            <FolderIcon />
          </Pressable>
        </View>
      </View>
      <Text style={styles.profileData}>Email: {user}</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileContainer: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAndIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 128,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -16,
  },
  iconsContainer: {
    marginLeft: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textProfilePlaceHolder: {
    color: colors.blanco,
    fontSize: 48,
  },
  profileData: {
    paddingVertical: 16,
    fontSize: 16,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128,
    marginRight: -36,
  },
})
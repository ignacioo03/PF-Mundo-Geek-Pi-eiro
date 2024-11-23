import { StyleSheet, Text, View, Platform, TextInput, Pressable, FlatList} from 'react-native'
import { useState } from 'react'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import FlatCard from '../components/FlatCard';
import MapView, { Marker } from 'react-native-maps';
import { geocoding_api_key } from '../firebase/database';

const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState('');
    const [places, setPlaces] = useState([]);
    const  [adress , setAdress] = useState('');

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            duration: 2000,
        })
    }


    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return false
        }
        return true
    }


    const renderPlaceItem = ({ item }) => (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    
                >
                <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title={"lugar Geek"} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.adress}>{item.adress}</Text>
            </View>
        </FlatCard>
    )

    getLocation = async () => {
        const permissionOk = await getPermissions()
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied')
            showToast('Permiso denegado')
        }
        else {
            let location = await Location.getCurrentPositionAsync({})
            if (location) {
                const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${geocoding_api_key}`);
                const data = await response.json();
                if (data.status === 'OK') {
                    const formattedAddress = data.results[0].formatted_address;
                    setAdress(formattedAddress);
                }else{
                    console.log("erroren geocodificación inversa:",data.error_message);
                }

            }
            else {
                setErrorMsg('Location could not be obtained')
                showToast('Error', 'ubicacion no obtenida')
            }
            setLocation(location.coords)
        }
    }

    const savePlace = () => {
        if(title && location)
            {
                setPlaces(prevState => [...prevState, {"id":Math.random(), title, "coords":{"latitude": location.latitude, "longitude": location.longitude}, "adress": adress}])
                showToast('success', 'Lugar guardado')
        setTitle('')
        setLocation('')
    }else {
        showToast('error', 'Debes ingresar un título y una ubicación')
    }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Lugares: </Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} placeholder="Ingresa un titulo" onChangeText={(text) => setTitle(text)}value={title} />
                <Pressable onPress={getLocation}><Icon name="location-on" size={30} color={colors.naranjaBrillante} /></Pressable>
                <Pressable onPress={savePlace}><Icon name="add-circle" size={34} color={colors.verdeok} /></Pressable>
            </View>
            <Text style={styles.subtitle}>Tus lugares favoritos: </Text>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderPlaceItem}
            />
            <Toast />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 12,
        color: colors.grisOscuro
    },
    inputContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.grisMedio,
        borderRadius: 20,
        padding: 8,
        width: '80%',
        paddingLeft: 16,
    },
    placesContainer: {
        marginTop: 16
    },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        margin: 4,
        gap: 24
    },
    mapContainer: {
        width:120,
        height: 120,
        borderRadius: 75,
        overflow: 'hidden',
        elevation: 5,
    },
    map: {
        width: 120,
        height: 120,
    },
    mapTitle: {
        fontWeight: "700"
    },
    adress: {

    },
    placeDescriptionContainer: {
        width: '60%',
        padding: 8
    }
});


export default MyPlacesScreen

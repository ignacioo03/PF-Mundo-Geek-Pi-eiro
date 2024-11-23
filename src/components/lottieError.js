import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

export default function LottieError() {
    return (
        <View style={styles.loaderContainer}>
            <LottieView
            source ={require('../../assets/Animation - 1732395178329.json')}
            autoPlay
            loop
            style={styles.loader}
            
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        width: 300,
        height: 300,
    },
});

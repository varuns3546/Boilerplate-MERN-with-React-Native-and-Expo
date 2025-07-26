import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
})

export default Spinner
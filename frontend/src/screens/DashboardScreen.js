import { useEffect } from 'react'
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import EntryForm from '../components/EntryForm'
import EntryItem from '../components/EntryItem'
import Spinner from '../components/Spinner'
import { getEntries, reset } from '../features/entries/entrySlice'
import { loadUser, logout } from '../features/auth/authSlice'
const DashboardScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const {entries, isError, isLoading, message} = useSelector((state) => state.entries)
    useEffect(() => {
        dispatch(loadUser())
    }, [])
    const {user} = useSelector((state) => state.auth)
    useEffect(() => {
        if (!user) {
            navigation.navigate('Login')
            return
        }
        dispatch(getEntries())
        return () => {
            dispatch(reset())
        }
    }, [user, dispatch])

    useEffect(() => {
        if (isError) {
            console.log('Error:', message)
        }
    }, [isError, message])

    const handleLogout = () => {
        dispatch(logout())
        navigation.navigate('Login')
    }

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Text>Welcome, {user && user.firstName}</Text>
            </View>
            <EntryForm />
            
            <View style={styles.entries}>
               {!isError && entries?.length > 0 && (
                <>
                    <View style={styles.entriesList}>
                        {entries.map((entry, index) => (
                            <EntryItem key={index} entry={entry} />
                        ))}
                    </View>
                </>
                )}
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#007AFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 16,
    },
    entries: {
        padding: 16,
    },
    entriesList: {
        marginTop: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },
    noEntriesText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
export default DashboardScreen

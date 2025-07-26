import { useEffect } from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import EntryForm from '../components/EntryForm'
import EntryItem from '../components/EntryItem'
import Spinner from '../components/Spinner'
import { getEntries, reset } from '../features/entries/entrySlice'
const DashboardScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {entries, isError, isLoading, message} = useSelector((state) => state.entries)

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

    return(
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>
            </View>
            <View style={styles.content}>
                <Text>Welcome, {user && user.name}</Text>
            </View>
            <EntryForm />

            <View style={styles.entries}>
                {console.log('Entries we have:', entries.entries)}
                {console.log('Entries length:', entries.entries?.length || 0)}
                {console.log('Is loading:', isLoading)}
                {console.log('Is error:', isError)}
                {console.log('Message:', message)}
                
                {isLoading && <Spinner />}
                
                {isError && (
                    <Text style={styles.errorText}>Error: {message}</Text>
                )}
                
                {!isLoading && !isError && entries && entries.length > 0 && (
                    console.log('we have entries'),
                    <View style={styles.entriesList}>
                        {entries.entries.map((entry) => (
                            <Text>Hello</Text>
                        ))}
                    </View>
                )}
                
                {!isLoading && !isError && (!entries || entries.length === 0) && (
                    <Text style={styles.noEntriesText}>No entries found</Text>
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
})
export default DashboardScreen

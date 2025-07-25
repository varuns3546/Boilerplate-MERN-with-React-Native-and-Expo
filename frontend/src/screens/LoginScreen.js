import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'




const LoginScreen = ({navigation}) => {
    const [formData, setFormData] = useState({
        email: '', 
        password: '',
      })

    const { email, password } = formData
    const dispatch = useDispatch()

     const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)

    useEffect(() => {
        if (isError) {
            console.log('error', message)
        }

        if (isSuccess || user) {
            navigation.navigate('Dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch])
    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const onSubmit = (e) => {

        const userData = {
        email,
        password,
        }

        dispatch(login(userData))
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heading}>
            <View style={styles.titleContainer}>
                <Ionicons name="person" size={24} color="#007AFF" />
                <Text style={styles.title}>Login</Text>
            </View>
        </View>

        <View style={styles.form}>

            <View style={styles.formGroup}>
                <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                />
            </View>
            <View style={styles.formGroup}>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                secureTextEntry
                autoCapitalize="none"
            />
            </View>
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    },
    scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    },
    loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    heading: {
    alignItems: 'center',
    marginBottom: 40,
    },
    titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    },
    title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    },
    subtitle: {
    fontSize: 16,
    color: '#666',
    },
    form: {
    width: '100%',
    },
    formGroup: {
    marginBottom: 20,
    },
    input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    },
    button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
})
    

export default LoginScreen;
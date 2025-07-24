import React, { useState, useEffect } from 'react';
import {View, Text, TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { entriesAPI } from '../services/api';

const Screen = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [entries, setEntries] = useState([])

    useEffect(()=>{
        loadEntries()
    })

    const loadEntries = async () => {
        try {
            const response = await entriesAPI.getEntries()
            console.log(response)
            setEntries(response.entries);
        } catch (error) {
            console.log('Error loading entries:', error);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Validation', 'Please enter both title and content');
            return;
        }
        try {
            await entriesAPI.createEntry({ title, content });
            setTitle('');
            setContent('');
            loadEntries(); // Refresh list after submit
        } catch (error) {
            console.log('Error submitting entry:', error);
            Alert.alert('Error', 'Failed to submit entry');
        }
    };

    return(
        <View>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
            />
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Submit Entry</Text>
            </TouchableOpacity>
            <Text>Entries: </Text>
            {entries.map((entry) => (
                <View key={entry._id}>
                    <Text>{entry.title}</Text>
                    <Text>{entry.content}</Text>
                </View>
            ))}
        </View>
    )
}
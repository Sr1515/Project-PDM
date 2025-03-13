import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item:', error);
    }
};

const getItem = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
};

const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing item:', error);
    }
};

const mergeItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error merging item:', error);
    }
};

const clear = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};

const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        console.error('Error getting all keys:', error);
        return [];
    }
};

const getAllItems = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        return items.reduce((accumulator, [key, value]) => {
            //@ts-ignore
            accumulator[key] = JSON.parse(value);
            return accumulator;
        }, {});
    } catch (error) {
        console.error('Error getting all items:', error);
        return {};
    }
};

const localStorage = { setItem, getItem, clear, getAllItems, removeItem, mergeItem, getAllKeys }

export default localStorage;
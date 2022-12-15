import AsyncStorage from '@react-native-async-storage/async-storage';
import genarateData from '../constants/dummys';

export const setItem = (key, data) => {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
};

export const getItem = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then(data => {
            resolve(JSON.parse(data));
        });
    });
};

export const clearAsyncStorate = () => {
    return AsyncStorage.clear();
};

export const getData = () => {
    let data = genarateData();
    console.log('Data genarate');
    setItem('listData', data);
};

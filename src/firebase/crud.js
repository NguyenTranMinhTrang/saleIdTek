import db from './config';
import { collection, setDoc, updateDoc, getDoc, doc, Timestamp } from 'firebase/firestore';


export const getNotificationById = (id) => {

    return new Promise((resolve, reject) => {
        const docRef = doc(db, 'notification', id);
        getDoc(docRef)
            .then((value) => {
                console.log('Get success !');
                resolve({
                    code: 1,
                    data: value.data(),
                });
            })
            .catch((error) => {
                console.log('Get error');
                reject({
                    code: 0,
                    error: error,
                });
            });
    });
};


export const addNotification = (token, id) => {
    console.log('1');
    return new Promise((resolve, reject) => {
        let data = {
            token: token,
            date: Timestamp.fromDate(new Date()),
        };
        console.log('data: ', token, 'id: ', id);
        const docRef = doc(db, 'notification', id);
        setDoc(docRef, data)
            .then(() => {
                console.log('Add token success !');
                resolve({
                    code: 1,
                    message: 'Add success !',
                });
            })
            .catch((error) => {
                console.log('Add token error: ', error);
                reject({
                    code: 0,
                    error: error,
                });
            });
    });
};


export const updateNotification = (id, dataUpdate) => {
    return new Promise((resolve, reject) => {
        updateDoc(collection(db, `notification/${id}`), dataUpdate)
            .then(() => {
                console.log('Update success !');
                resolve({
                    code: 1,
                    message: 'Update success !',
                });
            })
            .catch((error) => {
                reject({
                    code: 0,
                    error: error,
                });
            });
    });
};


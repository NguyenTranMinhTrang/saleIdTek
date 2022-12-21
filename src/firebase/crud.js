import db from './config';
import { setDoc, updateDoc, getDoc, doc, Timestamp } from 'firebase/firestore';

export const getNotificationById = (id) => {

    return new Promise((resolve, reject) => {
        const docRef = doc(db, 'notification', id);
        getDoc(docRef)
            .then((value) => {
                resolve({
                    code: 1,
                    data: value.data(),
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


export const addNotification = (token, id) => {
    return new Promise((resolve, reject) => {
        let data = {
            token: token,
            date: Timestamp.fromDate(new Date()),
        };
        const docRef = doc(db, 'notification', id);
        setDoc(docRef, data)
            .then(() => {
                resolve({
                    code: 1,
                    message: 'Add success !',
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


export const updateNotification = (id, dataUpdate) => {
    return new Promise((resolve, reject) => {
        const docRef = doc(db, 'notification', id);
        updateDoc(docRef, dataUpdate)
            .then(() => {
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


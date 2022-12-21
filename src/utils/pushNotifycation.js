import messaging from '@react-native-firebase/messaging';
import { addNotification, updateNotification, getNotificationById } from '../firebase/crud';
import { getItem, setItem } from '../localStorage';
import { intervalToDuration } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

const FIREBASE_API_KEY = 'AAAAv0YTFEo:APA91bFaSDWQKIOITcMfCVFqitpDIKKNM3QbjaCe_KdqkfxudEYYmDq_FnMQw3VHMUn561JhRZDrgaNGbByBVDzb58xZtFeRtIDGmpLgzpAvlTpStrS923nqzKK2pxunhzdesC-ZXzm-';
let headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'key=' + FIREBASE_API_KEY,
});


let token;

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};

export const getToken = async () => {
    token = await getItem('fcmtoken');
    if (!token) {
        try {
            let fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                let id = (Date.now()).toString();
                token = {
                    id: id,
                    token: fcmtoken,
                };
                const result = await addNotification(fcmtoken, id);
                if (result.code === 1) {
                    await setItem('fcmtoken', {
                        id: id,
                        token: fcmtoken,
                    });
                }
            }
        } catch (error) {
            console.log('Error in fcmtoken', error);
        }
    }
    else {
        const tokenFromDatabase = await getNotificationById(token.id);
        if (tokenFromDatabase.code === 1) {
            let date = (tokenFromDatabase.data.date).toDate();

            const distance = intervalToDuration({
                start: date,
                end: new Date(),
            });

            if (distance.months >= 2) {
                let newToken = await messaging().getToken();
                const result = await updateNotification(token.id, {
                    token: newToken,
                    date: Timestamp.fromDate(new Date()),
                });
                if (result.code === 1) {
                    await setItem('fcmtoken', {
                        id: token.id,
                        token: newToken,
                    });
                }
                else {
                    console.log(result.error);
                }
            }
            else {
                const result = await updateNotification(token.id, {
                    date: Timestamp.fromDate(new Date()),
                });
                if (result.code === 1) {
                    console.log(result.message);
                }
                else {
                    console.log(result.error);
                }
            }

        }
        else {
            console.log('Get error: ', tokenFromDatabase.error);
        }
    }

    console.log('Done token: ', token);
};

export const sendNotification = async (title, body, data) => {
    const message = {
        registration_ids: [
            token.token,
        ],
        notification: {
            title: title,
            body: body,
            vibrate: 1,
            sound: 1,
            show_in_foreground: true,
            priority: 'high',
            content_available: true,
        },
        data: data,
    };

    let response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers,
        body: JSON.stringify(message),
    });
    response = await response.json();

    console.log('Send success: ', response);
};







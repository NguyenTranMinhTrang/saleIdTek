import messaging from '@react-native-firebase/messaging';
import { getItem, setItem } from '../localStorage';
import { sendNotificationLocal } from './pushNotificationLocal';

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
                console.log('New token: ', fcmtoken);
                token = fcmtoken;
                await setItem('fcmtoken', fcmtoken);
            }
        } catch (error) {
            console.log('Error in fcmtoken', error);
        }
    }
};

export const notificationListener = () => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async (remoteMessage) => {
        sendNotificationLocal(remoteMessage);
    });


};

export const sendNotification = async (title, body, data) => {
    const message = {
        registration_ids: [
            'dtK_DEayRO2QbMZlYzK1y0:APA91bFT6kjoNXsyXu708CrGRQg66JlfLs1_cshEwck_ibLjAGksooNa7OvkNyv7ARU5a6VRxlywgP4_vBdkH_TLnFroEIhBMYQiXZcuiv41kXWgVG0T3KQqH3wPet14FeUZ0sQM2ccu',
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







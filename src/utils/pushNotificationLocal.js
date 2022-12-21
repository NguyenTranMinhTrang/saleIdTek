import PushNotification, { Importance } from 'react-native-push-notification';
import { navigate } from '../RootNavigation';


PushNotification.configure({
    onNotification: function (notification) {
        console.log('Press on a new notification', notification);
        if (notification.userInteraction) {
            if (notification.data && notification.data.type === 'Detail') {
                navigate('Home', { id: Number(notification.data.id), screen: 'Detail' });
            }
        }
    },
    popInitialNotification: true,
    requestPermissions: true,
});

PushNotification.createChannel(
    {
        channelId: 'channel-id',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
        vibration: 1000,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

export const sendNotificationLocal = (remoteMessage) => {
    PushNotification.localNotification({
        channelId: 'channel-id',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
        vibration: 1000,
        autoCancel: true,
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        data: remoteMessage.data,
    });
};




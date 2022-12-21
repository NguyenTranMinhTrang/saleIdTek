import { PermissionsAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const LibraryLauch = async () => {

    const grantedstorage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
    );

    let options = {
        mediaType: 'mixed',
        storageOptions: {
            skipBackup: true,
            path: '../assets/images',
        },
    };

    return new Promise((resolve, reject) => {
        if (grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
            launchImageLibrary(options, (res) => {
                console.log('Response = ', res);
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                    resolve({
                        code: 0,
                        message: 'User cancelled image picker',
                    });
                } else if (res.error) {
                    console.log('ImagePicker Error: ', res.error);
                    resolve({
                        code: 0,
                        message: 'ImagePicker Error',
                    });
                } else {
                    resolve({
                        code: 1,
                        uri: res.assets[0].uri,
                    });
                }
            });
        }
        else {
            resolve({
                code: 0,
                message: 'Dont have permission',
            });
        }
    });
};

export default LibraryLauch;



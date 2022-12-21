import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import _ from 'lodash';

const PickFile = () => {

    const [fileResponse, setFileResponse] = React.useState([]);
    const [content, setContent] = React.useState([]);

    console.log('fileResponse: ', fileResponse);

    const handleDocumentSelection = React.useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                allowMultiSelection: true,
            });

            if (response) {
                const newContent = await Promise.all(_.map(response, async (file) => {
                    if (file.type === 'text/plain') {
                        const convertText = await RNFS.readFile(file.uri);
                        return convertText;
                    }
                    return false;
                }));
                setContent(newContent);
            }
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);


    return (
        <View style={styles.container}>
            {
                content &&
                <View style={styles.containerFile}>
                    {
                        content.map((cont, index) => {
                            return (
                                <Text key={index} style={{ ...FONTS.h3, color: COLORS.white }}>{cont}</Text>
                            );
                        })
                    }

                </View>
            }
            <TouchableOpacity
                style={styles.button}
                onPress={handleDocumentSelection}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>Pick file</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black,
    },
    button: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        width: 200,
    },
    containerFile: {
        width: '100%',
        padding: SIZES.padding,
    },
});

export default PickFile;

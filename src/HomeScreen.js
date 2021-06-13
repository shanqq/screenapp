import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { db, storage } from './firebase'
import firebase from 'firebase'
import 'firebase/firestore';
import styles from './Stylesheet';

const HomeScreen = ({ navigation }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [image, setImage] = React.useState({});
    const [video1, setVideo] = React.useState({});
    const [progress, setProgress] = React.useState(0);

    const UploadTask = storage.ref(`images/Cat03.jpg`);
    const UploadTask1 = storage.ref(`videos/sample-mp4-file.mp4`);

    UploadTask1.getDownloadURL()
        .then((url) => {
            setVideo(url);
        })
        .catch(
            (error) => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            }
        );

    UploadTask.getDownloadURL()
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }

        });

    return (
        <View style={styles.container}>
            <Text>
                <strong> SHAQUIB ANSARI</strong>
            </Text>
            <Image source={image} style={styles.imagestyle}>
            </Image>
            <Video
                ref={video}
                styles={styles.video}
                source={{ uri: video1 }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.buttons}>
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() :
                            video.current.playAsync()
                    } />
            </View>

            <Button
                title="Go to details"
                onPress={() =>
                    navigation.navigate('Profile', { name: 'shaquib' })
                }
            />
        </View>
    );
};
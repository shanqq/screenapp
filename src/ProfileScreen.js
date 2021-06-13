import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Platform, Text, View } from 'react-native';
import { db, storage } from './firebase'
import firebase from 'firebase'
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import styles from './Stylesheet'

const ProfileScreen = ({ navigation, route }) => {

    const [status, setStatus] = useState(null);
    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleUpload = () => {

        const UploadTask = storage.ref(`images/`).putFile(image)
            .then((snapshot) => {
                console.log('uploaded img');
            });

        UploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function...
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setProgress(progress);
            }, (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    // ..
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                UploadTask.snapshot.ref.getDownloadURL()
                    .then(
                        (url) => {
                            console.log('file Available at ' + url);
                        });
            }
        );

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        //console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            console.log(image);
        }
    }
    const pickVideo = async () => {
        let result1 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        console.log(result1);

        if (!result1.cancelled) {
            setVideo(result1.uri);
        }

    };

    // const handleChange = (e) => {
    //   if (e.target.files[0]) {
    //     setImage(e.target.files[0]);
    //   }
    // };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is {route.params.name}'s details </Text>
            {/* <progress className="imageupload_progress" value={progress} max="100" ></progress>
        <input type='file' onChange={handleChange} />
        <Button title="click" onClick={handleUpload} > </Button> */ }
            <Button title="Pick an image" onPress={pickImage}></Button>
            <Image source={image} style={{ width: 200, height: 200 }} />
            <Button title="Pick an video from camera roll" onPress={pickVideo} ></Button>

            {video &&
                <Video source={video} style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            }
            <Button title="click" onPress={this.handleUpload} >Upload Details </Button>

        </View>

    );
    // return (
    //   <Text>This is {route.params.name}'s details </Text>
    // );
};
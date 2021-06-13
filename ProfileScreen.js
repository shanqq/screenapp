import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Platform, Text, View } from 'react-native';
import { db, storage } from './firebase'
import firebase from 'firebase'
import 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import styles from './Stylesheet'
import { Video } from 'expo-av';
import DocumentPicker from "react-native-document-picker";

const ProfileScreen = ({ navigation, route }) => {

  const [status, setStatus] = useState(null);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage1] = useState(null);

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

    var metadata = {
      contentType: 'image/jpeg',
    };
    console.log(image);
    const UploadTask = storage.ref(`images/${image.name}`).put(image);
    UploadTask.on(
      'state_changed',
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

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

        setProgress(0);
        setImage1(null);
      }
    );

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0])
      const filename = e.target.files[0];
      //setImage1(filename);
      setImage1(filename);

    }

  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text >This is {route.params.name}'s details </Text>

      <progress value={progress} max="100" ></progress>

      <input type='file' onChange={handleChange} />

      {image && <Image source={image} style={{ width: 200, height: 200 }} />
      }

      <Button title="Pick an video from camera roll" onPress={pickVideo} ></Button>

      {video &&
        <Video source={video} style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      }
      <Button title="click" onPress={handleUpload} >Upload Details </Button>

    </View>

  );
  // return (
  //   <Text>This is {route.params.name}'s details </Text>
  // );
};

export default ProfileScreen;

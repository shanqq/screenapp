

  // const UploadFileScreen = () => {
  //     // State Defination
  //     const [loading, setLoading] = useState(false);
  //     const [filePath, setFilePath] = useState({});
  //     const [process, setProcess] = useState("");

  //     const _chooseFile = async () => {
  //       // Opening Document Picker to select one file
  //       try {
  //         const fileDetails = await DocumentPicker.pick({
  //           // Provide which type of file you want user to pick
  //           type: [DocumentPicker.types.allFiles],
  //         });
  //         console.log(
  //           "fileDetails : " + JSON.stringify(fileDetails)
  //         );
  //         // Setting the state for selected File
  //         setFilePath(fileDetails);
  //       } catch (error) {
  //         setFilePath({});
  //         // If user canceled the document selection
  //         alert(
  //           DocumentPicker.isCancel(error)
  //             ? "Canceled"
  //             : "Unknown Error: " + JSON.stringify(error)
  //         );
  //       }
  //     };


  //     const _uploadFile = async () => {
  //       try {
  //         // Check if file selected
  //         if (Object.keys(filePath).length == 0)
  //           return alert("Please Select any File");
  //         setLoading(true);

  //         // Create Reference
  //         console.log(filePath.uri.replace("file://", ""));
  //         console.log(filePath.name);
  //         const reference = storage().ref(
  //           `/myfiles/${filePath.name}`
  //         );

  //         // Put File
  //         const task = reference.putFile(
  //           filePath.uri.replace("file://", "")
  //         );
  //         // You can do different operation with task
  //         // task.pause();
  //         // task.resume();
  //         // task.cancel();

  //         task.on("state_changed", (taskSnapshot) => {
  //           setProcess(
  //             `${taskSnapshot.bytesTransferred} transferred 
  //              out of ${taskSnapshot.totalBytes}`
  //           );
  //           console.log(
  //             `${taskSnapshot.bytesTransferred} transferred 
  //              out of ${taskSnapshot.totalBytes}`
  //           );
  //         });
  //         task.then(() => {
  //           alert("Image uploaded to the bucket!");
  //           setProcess("");
  //         });
  //         setFilePath({});
  //       } catch (error) {
  //         console.log("Error->", error);
  //         alert(`Error-> ${error}`);
  //       }
  //       setLoading(false);
  //     };

  // }
  // const pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         aspect: [4, 3],
  //         quality: 1,
  //     });
  //     console.log(result);
  //     if (!result.cancelled) {
  //         setImage(result.uri);
  //     }
  // }
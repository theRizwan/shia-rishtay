import { useNavigation, useRouter } from "expo-router"
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native"
import { Picker } from "@react-native-picker/picker";
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from "../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function profile() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState();
    const [image, setImage] = useState();
    const [loader, setLoader] = useState(false)
    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Profile',
            headerStyle: {
                backgroundColor: '#000000', // Background color of the header
            },
            headerTintColor: '#fff', // Text color of the header
        })
    }, []);

    const handleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue)
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const onSubmit = () => {
        if(formData === undefined || Object.keys(formData).length !=8) {
            ToastAndroid.show('Enter All Details', ToastAndroid.SHORT)
            return;
        }
        setLoader(true)
        UploadImage()
    }

    const UploadImage = async () => {
        const resp = await fetch(image);
        const blobImage = await resp.blob();
        const storageRef = ref(storage, '/Profile' + Date.now() + '.jpg');
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('fileUploaded')
        }).then((resp) => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                console.log(downloadURL)
                SaveFormData(downloadURL)
            })
        })
    }

    const SaveFormData = async (imageURL) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, 'List', docId), {
            ...formData,
            image: imageURL,
            // username : user?.fullName,
            // email: user?.primaryEmailAddress?.emailAddress,
            id: docId
        })
        setLoader(false)
        router.replace('/(tabs)/home')
    }
    return (
        <ScrollView style={{
            padding: 20,
            backgroundColor: '#000000',
        }}>
            <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20
            }}>
                Add new Profile
            </Text>

            <Pressable onPress={pickImage}>
                {!image ? <Entypo name="images" size={100} color="grey" />: 
                <Image source={{uri:image}} style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                }} />
                }

            </Pressable>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('name', value)} />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender *</Text>
                <Picker style={styles.dropdown} selectedValue={formData?.gender} onValueChange={(item) =>  setFormData((prev) => ({
                    ...prev,
                    gender: item
                }))}>
                    <Picker.Item value="Male" label="Male"></Picker.Item>
                    <Picker.Item value="Female" label="Female"></Picker.Item>
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Martial Status *</Text>
                <Picker style={styles.dropdown} selectedValue={formData?.martialStatus} onValueChange={(item) => setFormData((prev) => ({
                    ...prev,
                    martialStatus: item
                }))}>
                <Picker.Item value="Single" label="Single"></Picker.Item>
                <Picker.Item value="Married" label="Married"></Picker.Item>
            </Picker>
            </View>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Height *</Text>
                <TextInput keyboardType="numeric-pad" style={styles.input} onChangeText={(value) => handleInputChange('height', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Qualification *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('qualification', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Occupation *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('occupation', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Religion *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('religion', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sect *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('sect', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Cast *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('cast', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address *</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={5} onChangeText={(value) => handleInputChange('address', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>City *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('city', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Father's Occupation *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('fatherOccupation', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Mother's Occupation *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('motherOccupation', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Brothers *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('brothers', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sisters *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('sisters', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Married *</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleInputChange('married', value)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Requirements *</Text>
                <TextInput style={styles.input} multiline={true} numberOfLines={5} onChangeText={(value) => handleInputChange('requirements', value)} />
            </View>

            <TouchableOpacity onPress={onSubmit} disabled={loader} style={styles.button} >
                {loader ? <ActivityIndicator size='large' /> : <Text style={{ textAlign: 'center'}}>Submit</Text>}
            </TouchableOpacity>
            <View style={{ height: 30}}>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5
    },
    input: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 7,

    },
    label: {
        marginVertical: 5,
        fontFamily: 'outfit',
        color: 'white'
    },
    button: {
        padding: 15,
        borderRadius: 7,
        backgroundColor: 'grey',
        borderRadius: 7,
        marginVertical: 10
    },
    dropdown: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 7
    }
})
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from "react-native";
import { UpdateSaved } from '../Shared/Shared';
import { useUser } from '@clerk/clerk-expo'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

export default function MarkedSaved({ profile }) {
    // const { user } = useUser()
    const [savedList, setSavedList] = useState([]);
    useEffect(() => {
        // user && GetSaved();
        GetSaved();
    }, [])

    const GetSaved = async () => {
        // pass user
        try {
            // const result =  await GetSavedList({ primaryEmailAdress: { emailAddress: 'rizwanxplorer@gmail.com'}})
            const docSnap = await getDoc(doc(db, 'UserSaveProfiles'));
            if (docSnap?.exists()) {
                console.log(docSnap.data())
                setSavedList(docSnap.data())
            } else {
                await setDoc(doc(db, 'UserSaveProfiles'), {
                    email: user?.primaryEmailAddress?.emailAddress,
                    favorites: []
                });
                setSavedList([])
            }
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    const AddToSaved = async () => {
        const SavResult = savedList;
        SavResult.push(profile?.id)
        await UpdateSaved({ primaryEmailAdress: { emailAddress: 'rizwanxplorer@gmail.com'}}, savedList)
        GetSaved()
    }
    return (
        <View>
        {savedList?.includes(profile?.id) ? <Pressable>
            <Ionicons name='bookmark' size={30} color={'white'} />
        </Pressable> :
        <Pressable onPress={() => AddToSaved()}>
            <Ionicons name='bookmark-outline' size={30} color={'white'} />
        </Pressable>}
        </View>
    )
}
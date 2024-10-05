import { Image, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useRouter } from "expo-router";

export default function GuardionInfo({ item }) {
    const {user} = useUser();
    const router = useRouter();
    const InitiateChat = async () => {
        const docId1 = user?.primaryEmailAddress?.emailAddress + '_' + item?.email
        const docId2 = user?.primaryEmailAddress?.emailAddress + '_' + item?.email

        const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            router.push({
                pathname: '/chat',
                params: {id: doc.id}
            })
        })
        if(querySnapshot.docs?.length === 0) {
            await setDoc(doc(db, 'Chat', docId1), {
                id: docId1,
                users: [{
                    email: user?.primaryEmailAddress?.emailAddress,
                    imageURL: user?.imageURL,
                    name: user?.fullName
                },
                {
                    email: item?.email,
                    imageURL: item?.userImage,
                    name: item?.username
                }],
                userIds: [user?.primaryEmailAddress?.emailAddress, item?.email]
            });
            router.push({
                pathname: '/chat',
                params: {
                    id: docId1
                }
            })
        }
    }
    return (
        <View style={{
            marginHorizontal: 10,
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            borderWidth: 1,
            borderRadius: 15,
            padding: 10,
            backgroundColor: 'white',
            justifyContent: 'space-between',
        }}>
        <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20
            }}>
            <Image source={{uri:item?.image}} style={{ width: 50, height: 50, borderRadius: 99}} />
                <View>
                    <Text style={{fontFamily: 'outfit', fontSize: 17 }}>{item?.name}</Text>
                    <Text style={{ fontFamily: 'outfit', color: 'grey'}}>Guardian/Parent</Text>
                </View>
            </View>
            <TouchableOpacity onPress={InitiateChat}>
                <Ionicons name="send-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
import { useLocalSearchParams, useNavigation } from "expo-router"
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { Text, View } from "react-native"
import { db } from "../../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from 'react-native-gifted-chat'
import moment from "moment";

export default function profile() {
    const [messages, setMessages] = useState([])
    const params = useLocalSearchParams();
    const { user } = useUser();
    const navigation = useNavigation();
    console.log(params);

    useEffect(() => {
        GetUserDetails();
        const unsubscribe = onSnapshot(collection(db, 'Chat', params?.id, 'Messages'), (snapshot) => {
            const messageData = snapshot.docs.map((doc) => ({
                _id: doc.id,
                ...doc.data()
            }))
            setMessages(messageData)
        })
        return () => unsubscribe()
    }, []);

    const GetUserDetails = async () => {
        const docRef = doc(db, 'Chat', params?.id);
        const docSnap = await getDoc(docRef);

        const result = docSnap.data();
        console.log(result)

        const otherUser = result?.users.filter(item => item?.email != user?.primaryEmailAddress?.emailAddress);
        console.log(otherUser)

        navigation.setOptions({
            headerTitle: otherUser?.[0]?.name
        })
    }

    const onSend = async (newMessage) => {
        setMessages((prev) => GiftedChat.append(prev, newMessage));
        newMessage[0].createdAt = moment().format('MM-DD-YYYY HH:mm:ss')
        await addDoc(collection(db, 'Chat', params?.id, 'Message'), newMessage[0])
    }
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user?.primaryEmailAddress?.emailAddress,
                name: user?.fullName,
                avatar: user?.imageUrl
            }}
        />
    )
}
import { collection, getDocs, query, where } from "firebase/firestore"
import { FlatList, Text, View } from "react-native"
import { db } from "../../config/FirebaseConfig"
import { useUser } from "@clerk/clerk-expo"
import { useEffect, useState } from "react";
import UserItem from "../../components/Inbox/UserItem";

export default function inbox() {

    const { user}  = useUser();
    const [userList, setUserList] = useState([]);
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        user && GetUserList();
    }, [])
    const GetUserList = async () => {
        try {
            setLoader(true)
            setUserList([])
            const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress))
            const querySnapshot = await getDocs(q);
    
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                setUserList((prevList) => [...prevList, doc.data()])
            })
        } catch(e) {
            console.log(e)
        } finally {
            setLoader(false)
        }
    }

    const MapOtherUserList = () => {
        try {
            const list = [];
            userList.forEach((record) => {
                const otherUser = record?.users?.filter(user => user?.email != user?.primaryEmailAddress?.emailAddress)
                const result = {
                    docId: record?.id,
                    ...otherUser[0]
                }
                list.push(result)
            })
            return list;
        } finally {
            return []
        }
    }
    return (
        <View style={{
            padding: 20,
            marginTop: 20,
            backgroundColor: 'black',
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                color: 'white',
                fontSize: 30
            }}>
                Inbox
            </Text>

            {MapOtherUserList().length !== 0 ? <FlatList
                data={MapOtherUserList()}
                refreshing={loader}
                onRefresh={GetUserList}
                renderItem={(item, index) => (
                    <UserItem userInfo={item} key={index} />
                )}
             />: 
             <View style={{ 
                flex: 1,
                backgroundColor: 'black'
                
             }}>
                <Text style={{ color: 'grey', fontFamily: 'outfit' }}>
                    No Person Contacted yet!
                </Text>
             </View>
             }
        </View>
    )
}
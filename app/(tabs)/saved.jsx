import { FlatList, Text, View } from "react-native"
import Shared from "../../Shared/Shared"
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Saved() {
    // const { user } = useUser();
    const [SavedIds, setSavedIds] = useState([])
    const [SavedList, setSavedList] = useState([])
    useEffect(() => {
        GetSavedIds();
    }, [])
    const GetSavedIds = async () => {
        const result = await Shared.GetSavedList();
        console.log(result)
        setSavedIds([]);
    }
    const GetSavedProfileList = async () => {
        const q = query(collection(db, 'List'), where('id', 'in', SavedIds));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSavedList(prev => [...prev, doc.data()])
        })
    }
    return (
        <View style={{
            padding: 20,
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 30
            }}>
                Saved Profiles
            </Text>
            <FlatList 
                data={SavedList}
                numColumns={2}
                renderItem={({item, index}) => (
                    <TouchableOpacity 
                        onPress={() => router.push({
                            pathname: '/profile-details',
                            params: item
                        })}
                        style={{
                            padding: 10,
                            marginRight: 10,
                            marginBottom: 20,
                            backgroundColor: COLORS.white,
                            borderRadius: 10,
                            backgroundColor: '#1f1f1f'
                        }}
                    >
                        <Image source={{uri:item?.image}} style={{
                            width: 150,
                            height: 135,
                            objectFit: 'cover',
                            borderRadius: 10
                        }} />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18,
                            color: 'white'
                        }}>{item?.name}</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <Text style={{
                            color: 'grey',
                            fontFamily: 'outfit'
                        }}>{item?.gender}</Text>
                            <Text style={{
                                fontFamily: 'outfit',
                                color: COLORS.black,
                                paddingHorizontal: 7,
                                borderRadius: 99,
                                fontSize: 11,
                                color: '#ffffff'
                            }}>{item?.age} YRS</Text>
                        </View>
                    </TouchableOpacity>
                )}
             />
        </View>
    )
}
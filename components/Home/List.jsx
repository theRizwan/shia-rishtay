import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { COLORS } from "../../core/theme";
import { useRouter } from "expo-router";


export default function List() {
    const router = useRouter();
    const [List, setList] = useState([])
    useEffect(() => {
        GetSlider();
    }, [])
    const GetSlider = async () => {
        const snapshot = await getDocs(query(collection(db, 'List'), where('gender', '==', 'female')))
        snapshot.forEach(doc => {
            setList(sliderList => [...sliderList, doc.data()])
        });
    }
    return (
        <View>
            <FlatList
                data={List}
                style={{
                    marginTop: 20,
                    marginBottom: 100,
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (<TouchableOpacity 
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
                )}}
            >

            </FlatList>
        </View>
    )
}
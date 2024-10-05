import { useAuth, useUser } from "@clerk/clerk-expo"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";


export default function profile() {
    const { user } = useUser();
    const navigation = useNavigation();
    const router = useRouter();
    const { signOut } = useAuth();
    useEffect(() => {
        navigation.setOptions({
           headerTransparent: true,
          headerTitle: ''
        })
    }, []);
    const Menu = [
        {
            id: 1,
            name: 'Profile',
            icon: 'add-circle',
            path: '/add-new-profile'
        },
        {
            id: 2,
            name: 'Saved',
            icon: 'save',
            path: '/(tabs)/saved'
        },
        {
            id: 3,
            name: 'Inbox',
            icon: 'chatbubble',
            path: '/(tabs)/inbox'
        },
        {
            id: 4,
            name: 'Logout',
            icon: 'exit',
            path: 'logout'
        }
    ]
    const onPressMenu= (menu) => {
        if(menu.path === 'logout') {
            signOut()
            return;
        }

        router.push(menu.path)
    }
    return (
        <View style={{
            padding: 20,
            marginTop: 20,
            flex:1,
            backgroundColor: 'black'
        }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 30,
                color: 'white'
            }}>
                Profile
            </Text>

            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: 25
            }}>
                <Image source={{uri:user?.imageUrl}} style={{
                    width: 60,
                    height: 60,
                    borderRadius: 99
                }} />
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                    marginTop: 6,
                    color: 'white'
                }}>{user?.fullName}</Text>
                <Text style={{
                   fontFamily: 'outfit-bold',
                    fontSize: 20,
                    color: 'white'
                }}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>

            <FlatList
                data={Menu}
                renderItem={({item}) => (
                    <TouchableOpacity key={item.id}
                     onPress={() => onPressMenu(item)}
                     style={{
                        marginVertical: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        backgroundColor: '#1f1f1f',
                        padding: 10,
                        borderRadius: 10
                    }}>
                        <Ionicons name={item.icon} size={30} color="white" style={{
                            padding: 10,
                            backgroundColor: '#1f1f1f',
                            borderRadius: 10
                        }} />
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: 'white'
                        }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
             />
        </View>
    )
}
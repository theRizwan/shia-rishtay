import { Tabs, useNavigation } from "expo-router"
import { Text, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../../core/theme";
import { useEffect } from "react";

export default function _layout() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
           headerTransparent: true,
          headerTitle: ''
        })
    }, []);
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarStyle: {
                backgroundColor: '#1f1f1f'
            }
        }}>
            <Tabs.Screen name="home" options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />
            }} />
            <Tabs.Screen name="saved" options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name="heart" size={24} color={color} />
            }} />
            <Tabs.Screen name="inbox" options={{
                title: 'Inbox',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name="chatbubble" size={24} color={color} />
            }} />
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color}) => <Ionicons name="people-circle" size={24} color={color} />
            }} />
        </Tabs>
    )
}
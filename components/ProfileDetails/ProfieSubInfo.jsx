import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileSubInfoItem from "./ProfileSubInfoItem";

export default function ProfileSubInfo({ sectionName, icon, profile }) {
    return (
    <View style={{
        padding: 20
    }}>
        <ScrollView>
        <View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 10,
                margin: 5,
                borderRadius: 8,
                gap: 10
            }}>
                <Ionicons name={icon} size={24} color="black" />
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 16}}>{sectionName}</Text>
                </View>
            </View>
        </View>
        <ProfileSubInfoItem property={'Gender'} value={'Female'} />
        <ProfileSubInfoItem property={'Age'} value={'22'} />
        <ProfileSubInfoItem property={'Height'} value={'5.2'} />
        </ScrollView>
    </View>
  );
}

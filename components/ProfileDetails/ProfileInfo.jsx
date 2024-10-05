import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import MarkedSaved from "../MarkedSaved";


export default function ProfileInfo({ profile }) {
    return (
    <View>
        
         <View style={{ padding: 20,
            display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'}}
            >
            <View>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 27, color: 'white'}}>{profile?.name}</Text>
                <Text style={{fontFamily: 'outfit', fontSize: 16, color: 'white'}}>{profile?.location}</Text>
            </View>
            <MarkedSaved profile={profile} />
         </View>
    </View>
  );
}

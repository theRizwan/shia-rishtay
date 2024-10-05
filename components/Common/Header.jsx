import { Image, Text, View } from "react-native";
import { db } from "../../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { COLORS } from "../../core/theme";


export default function Header() {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <View>
                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 18,
                    color: '#ffffff'
                }}>Welcome</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 25,
                     color: '#ffffff'
                }}>Ali</Text>
            </View>
            <Image source={require('../../assets/images/react-logo.png')} style={{
                width: 40,
                height: 40,
                borderRadius: 99
            }} />
        </View>
    )
}
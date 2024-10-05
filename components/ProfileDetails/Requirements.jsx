import { Image, Text, View } from "react-native";


export default function Requirements({ about }) {
    return (
        <View style={{
            padding: 10,
            gap: 10,
        }}>
            <Text style={{ fontFamily: 'outfit-medium', color: 'white', fontSize: 20}}>Requirements:</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: 'grey'}}>{about}</Text>
        </View>
    )
}
import { Image, Text, View } from "react-native";


export default function ProfileSubInfoItem({ property, value}) {
    return (
        <View style={{
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
        }}>
            <Text style={{ fontFamily: 'outfit-bold', color: 'white'}}>{property}:</Text>
            <Text style={{  color: 'white' }}>{value}</Text>
        </View>
    )
}
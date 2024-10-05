import { Link } from "expo-router"
import { Image, Text, View } from "react-native"

export default function UserItem({ userInfo}) {
    return (
        <Link href={'/chat?id=' + userInfo?.docId }>
        <View style={{
            marginVertical: 7,
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        }}>
            <Image source={{uri:userInfo?.imageURL}}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 99
                }}
            />
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 20,
            }}>{userInfo?.name}</Text>
            <View style={{
                borderWidth: 1,
                marginVertical: 7,
                borderColor: 'grey'
            }}>

            </View>
        </View>
        </Link>
    )
}
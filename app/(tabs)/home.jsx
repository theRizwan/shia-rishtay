import { Text, View } from "react-native"
import Header from "../../components/Common/Header"
import Slider from "../../components/Home/Slider"
import { COLORS } from "../../core/theme"
import List from "../../components/Home/List"

export default function home() {
    return (
        <View style={{
            padding: 20,
            marginTop: 20,
            backgroundColor: '#000000'
        }}>
            {/* Header */}
            <Header />

            {/* Slider */}
            {/* <Slider /> */}

            {/* Category */}
            <List />

            {/* List of Pets */}

            {/* Add New Pet Option */}
        </View>
    )
}
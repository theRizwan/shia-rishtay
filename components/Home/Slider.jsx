import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { db } from "../../config/FirebaseConfig";


export default function Slider() {
    const [sliderList, setSliderList] = useState([])
    useEffect(() => {
        GetSlider();
    }, [])
    const GetSlider = async () => {
        const snapshot = await getDocs(collection(db, 'Sliders'))
        snapshot.forEach(doc => {
            console.log(doc.data())
            setSliderList(sliderList => [...sliderList, doc.data()])
        });
    }
    return (
        <View style={{
            marginTop: 15
        }}>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <View>
                        <Image source={{uri:item?.imageUrl}} style={styles.sliderImage} />
                    </View>
                )}>

            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage: {
        width:  Dimensions.get('screen').width*0.9,
        height: 170,
        borderRadius: 15,
        marginRight: 15
    }
})
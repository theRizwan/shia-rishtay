import React, { useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AuroraButton from './Button';

const PopUp = (props)=>{

    const buttonClicked = ()=>{
        if(props.error){
            //close the overlay
            props.errorBtn();
        }else{
            // 
            props.successBtn();
        }
    }

    return (
        <>
            <View style={styles.popUp}>
                <Text style={{textAlign:'center',marginTop:10}}>
                    {props.text}
                </Text>
                <AuroraButton buttonFunction={()=>buttonClicked()} bgcolor="black" text="Okay" color={"white"} outline={false}/>
            </View>
        </>
    )
}

export default PopUp
const styles = StyleSheet.create({
    popUp:{
        width:300,
        height:300,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        borderTopRightRadius:100
    }
})
import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const { user, isLoaded } = useUser();
  if(!isLoaded) {
    return <ActivityIndicator style={{
      backgroundColor: 'black',
      flex: 1
    }} />
  }
  console.log('user', user)
  return (
    <View
      style={{
      }}
    >
        {user ? <Redirect href={'/home'} />: <Redirect href={'/login'} />}
    </View>
  );
}

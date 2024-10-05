import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useCallback, useEffect } from "react";
import { router, useRouter } from "expo-router";


export const useWarmUpBrowser = () => {
    useEffect(() => {
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()

  
export default function Index() {
    useWarmUpBrowser()
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/index', { scheme: 'myapp' }),
          })
    
          if (createdSessionId) {
          } else {
          }
        } catch (err) {
          console.error('OAuth error', err)
        }
      }, [])

  return (
    <View style={styles.container}>
        <ImageBackground source={require('./../../assets/images/bg.jpeg')} style={styles.image}>

        <LinearGradient
						 colors={['#00000000', '#000000']} 
                         style={{height : '100%', width : '100%'}}>
					</LinearGradient>
        </ImageBackground>
        <View style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center'
        }}>
            <Text style={styles.heading}>Shia Rishtay</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 18,
                textAlign: 'center',
                color: '#FAF9F6'
            }}>Let the marriage of Muslim woman be like the marriage of Lady Fatimah (س).</Text>
            <Pressable onPress={() => onPress()} style={{
                padding: 14,
                marginTop: 100,
                backgroundColor: '#8B0000',
                borderRadius: 14,
                width: '100%'
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                    textAlign: 'center',
                    color: '#FAF9F6'
                }}>Get Started</Text>
            </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        height: 850
    },
    image: {
        width: '100%',
        height: 500
    },
    heading: {
        color: '#FAF9F6',
        fontFamily: 'outfit-bold',
        fontSize: 30
    }
});
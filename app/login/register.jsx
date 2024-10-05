import { Button, TextInput, View, StyleSheet, Pressable, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { router, Stack } from 'expo-router';
import { Text } from 'react-native';

const register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
    const [login, setLogin] = useState(false)
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			// Create the user on Clerk
			await signUp.create({
				emailAddress,
				password
			});

			// Send verification Email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
        <View style={styles.container}>
            <View style={styles.img}>
                <Image
                    source={require("./../../assets/images/logo.png")}
                    style={{ width: 300, height: 200 }}
                />
            </View>
            <KeyboardAvoidingView style={styles.inputGroup}>
                {!login && <View style={styles.input_container}>
                    <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(text) => {}}
                    placeholderTextColor="#FFF"
                    />
                </View>}

                <View style={styles.input_container}>
                    <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => {}}
                    placeholderTextColor="#FFF"
                    />
                </View>
                <View style={styles.input_container}>
                    <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => {}}
                    placeholderTextColor="#FFF"
                    secureTextEntry
                    />
                </View>
            </KeyboardAvoidingView>
            <Pressable onPress={login ? () => router.replace('/(tabs)/home') : setLogin(!login)} style={{
                padding: 14,
                marginTop: 50,
                backgroundColor: '#8B0000',
                borderRadius: 14,
                width: '100%'
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                    textAlign: 'center',
                    color: '#FAF9F6'
                }}>{login ? 'login' : 'Register'}</Text>
            </Pressable>
            <View style={styles.account}>
                <Text style={{
                    fontFamily: 'outfit',
                textAlign: 'center',
                color: '#FAF9F6'
                }}>
                    {!login ? 'Have' : "Don't have"} an Account?
                        &nbsp;
                    <Text
                    style={[styles.acc, styles.link]}
                    onPress={() => router.replace("/(tabs/home")}
                    >
                    {!login ? 'Login' : 'Register'}
                    </Text>
                </Text>
            </View>
            <View style={styles.love_container}>
            <Text style={{
                fontFamily: 'outfit',
                textAlign: 'center',
                color: '#FAF9F6'
            }}>Built in ❤ with{" "} Hussain</Text>
                
            </View>
      </View>
	);
};

export default register;

const styles = StyleSheet.create({
   container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: '#000000',
    height: 900,
  },
  love_container: {
    alignItems: "center",
    marginTop: 60,
  },
  love: {
    fontSize: 10,
  },
  link:{
    color: "#FAF9F6",
  },
  img: {
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  signup_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signUp: {
    fontSize: 18,
    backgroundColor: "#FAF9F6",
    color: 'white',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  inputGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    },
    input_container: {
        // backgroundColor: "tomato",
        width: "100%",
    },
    input: {    
        padding: 15,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
        fontSize: 18,
        borderRadius: 20,
        width: '100%',
        color: 'white'
    },
    account: {
        alignItems: "center",
        marginTop: 20,
        fontSize: 18,
      },
    acc: {
    fontWeight: "bold",
    },
    link: {
        color: "#FAF9F6",
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 7,
        fontWeight: 'bold',
      }
});
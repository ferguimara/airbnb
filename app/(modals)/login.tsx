import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
}

const Login = () => {
    useWarmUpBrowser();
    const router = useRouter()

    const { startOAuthFlow: googleAuth } = useOAuth({strategy: 'oauth_google'}) 
    const { startOAuthFlow: appleAuth } = useOAuth({strategy: 'oauth_apple'}) 
    const { startOAuthFlow: facebookAuth } = useOAuth({strategy: 'oauth_facebook'}) 

    const onSelectAuth = async (strategy: Strategy) => {
        // When implementing google auth for real, you will need to go to social connections in google and do custom credentials. 
        // You can follow this video here at 1:06:00 for info https://www.youtube.com/watch?v=iWzUZiVoiR0
        // or go to google cloud > api > create new project
        // go to client
        // add info here to clerk
        // also check out clerks documentation

        const selectedAuth = {
            [Strategy.Apple]: appleAuth,
            [Strategy.Google]: googleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy];

        try {
            const response = await selectedAuth()
            // console.log('Oauth response:', response)
            const { createdSessionId, setActive } = response;
            // console.log('session id', createdSessionId)

            if (createdSessionId) {
                setActive!({ session: createdSessionId})
                router.back();
            }
        } catch (err){
            console.log('OAuth error:', err)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput 
                autoCapitalize='none' 
                placeholder='Email' 
                style={[defaultStyles.inputField, {marginBottom: 30}]} 
            />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.seperatorView}>
                <View 
                    style={{
                        flex: 1,
                        borderBottomColor: '#000',
                        borderBottomWidth: StyleSheet.hairlineWidth
                    }}
                />
                <Text style={styles.seperator}>or</Text>
                <View 
                    style={{
                        flex: 1,
                        borderBottomColor: '#000',
                        borderBottomWidth: StyleSheet.hairlineWidth
                    }}
                />
            </View>

            <View style={{ gap:20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name='call-outline' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name='logo-apple' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name='logo-google' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name='logo-facebook' size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    seperator: {
       color: Colors.grey 
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
    }
})
export default Login
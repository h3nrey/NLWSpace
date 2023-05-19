import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useRouter } from "expo-router"
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {useAuthRequest, makeRedirectUri,} from "expo-auth-session"
import { api } from '../src/lib/api';
import { styled } from "nativewind"

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"

import {
  BaiJamjuree_700Bold
} from "@expo-google-fonts/bai-jamjuree"


import blurBg from "../src/assets/bg-blur.png"
import Stripes from "../src/assets/stripes.svg"
import Logo from "../src/assets/logo.svg"


const StyledStripes = styled(Stripes )

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/24d71206d5aa1c207491',
};

export default function App() {
    const router = useRouter()
  const [hasLoaded, ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '24d71206d5aa1c207491',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspace'
      }),
    },
    discovery
  );

  async function handleGithubOauthCode(code: string) {
    const response = await api.post("/register", {
        code,
    })

    const { token } = response.data
    await SecureStore.setItemAsync("token", token)

    router.push('/memories')

  }

  useEffect(() => {
    // To find the correct url
    // console.log( makeRedirectUri({
    //   scheme: 'nlwspace'
    // }))
  if (response?.type === 'success') {
    const { code } = response.params;
    
    handleGithubOauthCode(code)
  }
  }, [response]);

  if(!hasLoaded) {
    return null;
  }
  return (
    <ImageBackground 
      source={blurBg} 
      className='relative px-8 py-10 bg-gray-900 flex-1 items-center'
      imageStyle={{ position: "absolute", left: "-100%"}}
      >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center  justify-center gap-6">
        <Logo />

        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sua cápsula do tempo</Text>
          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>

        <TouchableOpacity 
          activeOpacity={0.7}
          className='rounded-full bg-green-500 px-5 py-2'
          onPress={() => signInWithGithub()}
         >
          <Text className='font-alt text-sm uppercase text-black'>Cadastrar Lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com ❤️ no NLW da Rocketseat</Text>
      <StatusBar style="light" translucent/>
    </ImageBackground>
  );
}

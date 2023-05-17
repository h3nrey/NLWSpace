import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"

import {
  BaiJamjuree_700Bold
} from "@expo-google-fonts/bai-jamjuree"


import blurBg from "./src/assets/bg-blur.png"
import Stripes from "./src/assets/stripes.svg"
import Logo from "./src/assets/logo.svg"
import { styled } from "nativewind"

const StyledStripes = styled(Stripes )
export default function App() {
  const [hasLoaded, ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

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
         className='rounded-full bg-green-500 px-5 py-2'>
          <Text className='font-alt text-sm uppercase text-black'>Cadastrar Lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com ❤️ no NLW da Rocketseat</Text>
      <StatusBar style="light" translucent/>
    </ImageBackground>
  );
}
import { ImageBackground } from "react-native";
import { styled } from "nativewind";
import { SplashScreen, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store"
const StyledStripes = styled(Stripes )

import blurBg from "../src/assets/bg-blur.png"
import Stripes from "../src/assets/stripes.svg"

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto"

import {
  BaiJamjuree_700Bold
} from "@expo-google-fonts/bai-jamjuree"
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";


export default function Layout() {
	const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

	const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

	useEffect(() => {
		SecureStore.getItemAsync("token").then(token => {
			setIsUserAuthenticated(!!token) //!! -> convert token to boolean
		})
	}, [])

	if(!hasLoadedFonts) {
    return <SplashScreen />;
  }

	return (
		<ImageBackground 
			source={blurBg} 
			className='relative bg-gray-900 flex-1'
			imageStyle={{ position: "absolute", left: "-100%"}}
		>
		<StyledStripes className="absolute left-2" />


		<Stack screenOptions={{ 
			headerShown: false, 
			animation: "slide_from_left",
			contentStyle: { backgroundColor: 'transparent'} }}
		>
			<Stack.Screen name="index" redirect={isUserAuthenticated}/>
			<Stack.Screen name="new"/>
			<Stack.Screen name="memories"/>
		</Stack>
		<StatusBar style="light" translucent/>
		</ImageBackground>
	)
}
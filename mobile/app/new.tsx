import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import Icon from "@expo/vector-icons/Feather"
import Logo from "../src/assets/logo.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export default function New() {
    const { bottom, top} = useSafeAreaInsets()

		const [isPublic, setIsPublic] = useState(false)
    return (
      <ScrollView 
				className="flex-1 px-8" 
				contentContainerStyle={{ paddingTop: top, paddingBottom: bottom}}
			>
        <View className="flex-row items-center justify-between mt-4">
					<Logo />
					<Link 
							href="/memories" 
							asChild
					>
							<TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
									<Icon name="arrow-left" size={16} color="#fff"/>
							</TouchableOpacity>
					</Link>
        </View>

				<View className="mt-6 space-y-6">
					<View className="flex-row items-center gap-2">
						<Switch 
							value={isPublic} 
							onValueChange={setIsPublic} 
							trackColor={{false: "#767577", true: "#372560"}}
							thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
						/>
						<Text className="font-body text-base text-gray-200">
							Tornar memória publica
						</Text>
					</View>

					<TouchableOpacity
					activeOpacity={0.6}
						className="h-32 justify-center items-center rounded-lg border border-dashed border-gray-500 bg-black/20">
							<View className="flex-row items-center gap-2">
								<Icon name="image" color={"#aaa"} />
								<Text className="font-body text-sm text-gray-200"
									> 
									Adicionar Midia
								</Text>
							</View>
					</TouchableOpacity>

					<TextInput 
						multiline 
						className="p-0 font-body text-lg  text-gray-100"
						placeholderTextColor="#56565a"
						placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
						/>

					<TouchableOpacity 
						activeOpacity={0.7}
						className='rounded-full self-end items-center bg-green-500 px-5 py-2'
					>
						<Text className='font-alt text-sm uppercase text-black'>Salvar</Text>
					</TouchableOpacity>
				</View>
      </ScrollView>
    )
}
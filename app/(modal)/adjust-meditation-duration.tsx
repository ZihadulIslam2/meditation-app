import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { TimeContext } from '@/contex/Timercontex'

const AdjustMeditationDuration = () => {
    const { setDuration } = useContext(TimeContext)


  const handlePress = (duration: number) => {
    setDuration(duration)
    router.back()
  }

  return (
    <View className="flex-1 relative ">
      <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
        <Pressable
          onPress={() => router.back()}
          className="absolute top-8 left-6 z-10 "
        >
          <AntDesign name="leftcircleo" size={50} color="white" />
        </Pressable>
        <View className="justify-center h-4/5">
          <Text className="test-center font-bold text-font text-3xl text-white mb-8">
            Adjust your mediation duration
          </Text>

          <View>
            <CustomButton
              title="10 second"
              onPress={() => handlePress(10)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 minutes"
              onPress={() => handlePress(15 * 60)}
              containerStyles="mb-5"
            />
          </View>
        </View>
      </AppGradient>
    </View>
  )
}

export default AdjustMeditationDuration

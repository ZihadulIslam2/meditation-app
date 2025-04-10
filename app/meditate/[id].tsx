import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MEDITATION_Images from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/meditation-data'
import { TimeContext } from '@/contex/Timercontex'

const Meditate = () => {
  const { id } = useLocalSearchParams()
  const { duration: secondsRemaining, setDuration } = useContext(TimeContext)
  const [initialDuration, setInitialDuration] = useState(secondsRemaining) // Store initial duration

  const [isMeditating, setIsMeditating] = useState(false)
  const [audioSound, setSound] = useState<Audio.Sound>()
  const [isPlayingAudio, setPlayingAudio] = useState(false)
  const [timerCompleted, setTimerCompleted] = useState(false)

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus()
    router.push('/(modal)/adjust-meditation-duration')
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout

    if (secondsRemaining === 0 && isMeditating) {
      setIsMeditating(false)
      setTimerCompleted(true)
      audioSound?.stopAsync()
      setPlayingAudio(false)
      return
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1)
      }, 1000)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [secondsRemaining, isMeditating])

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, '0')

  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0')

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) {
      setDuration(initialDuration)
      setTimerCompleted(false)
    }

    setIsMeditating(!isMeditating)
    await toggleSound()
  }

  const toggleSound = async () => {
    try {
      if (!audioSound) {
        const sound = await initializeSound()
        await sound.playAsync()
        setPlayingAudio(true)
        return
      }

      const status = await audioSound.getStatusAsync()

      if (status.isLoaded) {
        if (isPlayingAudio) {
          await audioSound.pauseAsync()
          setPlayingAudio(false)
        } else {
          await audioSound.playAsync()
          setPlayingAudio(true)
        }
      }
    } catch (error) {
      console.error('Error toggling sound:', error)
    }
  }

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName])
    setSound(sound)
    return sound
  }

  const resetTimer = () => {
    setDuration(initialDuration)
    setTimerCompleted(false)
    if (isMeditating) {
      setIsMeditating(false)
      audioSound?.stopAsync()
      setPlayingAudio(false)
    }
  }

  useEffect(() => {
    // Store the initial duration when component mounts
    setInitialDuration(secondsRemaining)

    return () => {
      audioSound?.unloadAsync()
    }
  }, [])

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_Images[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={24} color="black" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust duration"
              onPress={handleAdjustDuration}
            />

            {timerCompleted ? (
              <CustomButton
                title="Reset Timer"
                onPress={resetTimer}
                containerStyles="mt-4"
              />
            ) : (
              <CustomButton
                title={isMeditating ? 'Pause Meditation' : 'Start Meditation'}
                onPress={toggleMeditationSessionStatus}
                containerStyles="mt-4"
              />
            )}
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}

export default Meditate

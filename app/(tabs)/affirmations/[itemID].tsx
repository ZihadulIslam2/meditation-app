import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons'
import beachImage from '@/assets/meditation-images/beach.webp'

const AffirmationPractice = () => {
  const { itemID } = useLocalSearchParams()
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>()

  const [sentences, setSentences] = useState<string[]>([])

  // useEffect(() => {
  //   for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
  //     const affirmationsData = AFFIRMATION_GALLERY[idx].data

  //     const affirmationToStart = affirmationsData.find(
  //       (a) => a.id === Number(itemID)
  //     )

  //     if (affirmationToStart) {
  //       setAffirmation(affirmationToStart)

  //       const affirmationArray = affirmationToStart.text.split('.')

  //       // ** remove the last element if it's an empty string
  //       if (affirmationArray[affirmationArray.length - 1] === '') {
  //         affirmationArray.pop()
  //       }

  //       setSentences(affirmationArray)

  //       return
  //     }
  //   }
  // }, [itemID])

  useEffect(() => {
    if (!itemID) return

    // Flatten all affirmation data from every category
    const allAffirmations = AFFIRMATION_GALLERY.flatMap(
      (category) => category.data
    )

    // Find the affirmation with matching ID
    const affirmationToStart = allAffirmations.find(
      (a) => a.id === Number(itemID)
    )

    // If found, update states
    if (affirmationToStart) {
      setAffirmation(affirmationToStart)

      // Split text into sentences for progressive display
      const splitSentences = affirmationToStart.text.match(
        /[^.!?]+[.!?]+/g
      ) || [affirmationToStart.text]
      setSentences(splitSentences.map((s) => s.trim()))
    }
  }, [itemID])


  if (!affirmation) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Loading affirmation...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation.image}
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        <AppGradient colors={['rgb(0, 0, 0, 0.3)', 'rgb(0, 0, 0, 0.9)']}>
          <View className="p-6">
            <Pressable
              className="mt-6 self-start flex-row items-center"
              onPress={() => router.back()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
              <Text className="ml-2 text-white text-lg">Back</Text>
            </Pressable>
            <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
              <View className="justify-center">
                <View className="h-4/5 justify-center">
                  {sentences.map((sentence, idx) => (
                    <Text
                      key={idx}
                      className="text-white text-3xl mb-12 font-bold text-center"
                    >
                      {sentence}.
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}
export default AffirmationPractice

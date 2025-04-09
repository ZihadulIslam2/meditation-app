import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons'

const { height } = Dimensions.get('window')

const AffirmationPractice = () => {
  const { itemID } = useLocalSearchParams()
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>()
  const [sentences, setSentences] = useState<string[]>([])

  useEffect(() => {
    if (!itemID) return

    const allAffirmations = AFFIRMATION_GALLERY.flatMap(
      (category) => category.data
    )

    const affirmationToStart = allAffirmations.find(
      (a) => a.id === Number(itemID)
    )

    if (affirmationToStart) {
      setAffirmation(affirmationToStart)
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
    <View style={styles.container}>
      <ImageBackground
        source={affirmation.image}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <AppGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.9)']}>
          <View style={styles.contentContainer}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={24} color="white" />
              <Text style={styles.backText}>Back</Text>
            </Pressable>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.textContainer}>
                {sentences.map((sentence, idx) => (
                  <Text key={idx} style={styles.sentenceText}>
                    {sentence}.
                  </Text>
                ))}
              </View>
            </ScrollView>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 60, // Extra space at the top
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40, // Extra space at the bottom
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sentenceText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 36, // Better line spacing
  },
})

export default AffirmationPractice

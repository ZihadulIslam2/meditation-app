import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'

const AffirmationPractice = () => {
  const { itemID } = useLocalSearchParams()

  const [affirmation, setAffirmation] = useState<GalleryPreviewData>()

  useEffect(() => {
    for (let idx; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationsData = AFFIRMATION_GALLERY[idx].data

      const affirmationToStart = affirmationsData.find(
        (a) => a.id === Number(itemID)
      )

      if (affirmationToStart) {
        setAffirmation(affirmationToStart)

        return
      }
    }
  }, [])

  return (
    <View className="flex-1">
      <Text>AffirmationPractice</Text>
    </View>
  )
}

export default AffirmationPractice

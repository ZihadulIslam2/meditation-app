import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import GuidedAffirmationGallery from '@/components/GuidedAffirmationGallery'

const Affirmations = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={['#2e1f5a', '#54426b', '#a790af']}>
        <ScrollView showsVerticalScrollIndicator={false} className="p-4">
          <View className="p-4">
            <Text className="text-white text-3xl font-bold">
              Change your belief with affirmations
            </Text>
            <View>
              {AFFIRMATION_GALLERY.map((g) => (
                <GuidedAffirmationGallery
                  key={g.title}
                  title={g.title}
                  previews={g.data}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  )
}

export default Affirmations

import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import TimerProvider from '@/contex/Timercontex';

// this will prevent the splash screen from auto hiding until loading all the font assets
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ fontLoaded, error ] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf")
  })

  useEffect(()=>{
    if (error) throw error
    if(fontLoaded) SplashScreen.hideAsync()
  },[fontLoaded, error])

  if (!fontLoaded) return null 
  if ( !fontLoaded && !error ) return null

  return (
    <TimerProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)/adjust-meditation-duration"
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </Stack>
    </TimerProvider>
  )
}

import { StyleSheet, TouchableOpacity } from 'react-native'
import { YStack, Paragraph, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Info } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function GenericSubScreen() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={20} gap={24}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>App Settings</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Configure language, theme, and data preferences.</Paragraph>
        </YStack>

        <YStack flex={1} justifyContent="center" alignItems="center" gap={12} opacity={0.5}>
          <Info size={48} color={C.muted} />
          <Paragraph color={C.muted} textAlign="center">
            This module is structured and ready for backend data integration.
          </Paragraph>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.bg } })

import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { YStack, XStack, Paragraph, Switch } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function GenSettings() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8} marginBottom={24}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Notifications</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Manage your preferences.</Paragraph>
        </YStack>

        <YStack gap={12}>
          {[1, 2, 3].map(i => (
            <XStack key={i} style={s.card} justifyContent="space-between" alignItems="center">
              <Paragraph fontSize={15} fontWeight="600" color={C.text}>Setting Option {i}</Paragraph>
              <Switch size="$3" checked={i !== 2} backgroundColor={i !== 2 ? C.primary : C.border}>
                <Switch.Thumb backgroundColor="white" />
              </Switch>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: C.bg },
  card: { backgroundColor: C.white, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 16 }
})

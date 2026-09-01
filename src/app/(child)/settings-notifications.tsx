import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { YStack, XStack, Paragraph, Switch } from 'tamagui'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function GenSettings() {
  const router = useRouter()
  // Generate state for each option
  const [states, setStates] = useState([true,true,false])
  
  const toggle = (index: number) => {
    const newStates = [...states];
    newStates[index] = !newStates[index];
    setStates(newStates);
  }

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
          {["Push Notifications","Spend Alerts","Goal Reminders"].map((opt, i) => (
            <XStack key={i} style={s.card} justifyContent="space-between" alignItems="center">
              <Paragraph fontSize={15} fontWeight="600" color={C.text}>{opt}</Paragraph>
              <Switch size="$3" checked={states[i]} onCheckedChange={() => toggle(i)} backgroundColor={states[i] ? C.primary : C.border}>
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
  card: { backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.border, padding: 16 }
})

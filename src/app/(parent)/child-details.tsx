import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, User } from 'lucide-react-native'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function ChildDetails() {
  const router = useRouter()
  const { children, updateChild } = useParentStore()
  const child = children[0] // Mocking the first child

  const [daily, setDaily] = useState(child.dailyLimit.toString())
  const [monthly, setMonthly] = useState(child.monthlyLimit.toString())

  const handleSave = () => {
    updateChild(child.id, {
      dailyLimit: parseFloat(daily) || child.dailyLimit,
      monthlyLimit: parseFloat(monthly) || child.monthlyLimit
    })
    alert('Limits updated successfully')
    router.back()
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack alignItems="center" gap={12} marginBottom={24}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: C.primaryLight, justifyContent: 'center', alignItems: 'center' }}>
            <User size={40} color={C.primary} />
          </View>
          <Paragraph fontSize={24} fontWeight="bold" color={C.text}>{child.name}</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Balance: {child.balance.toFixed(2)} SAR</Paragraph>
        </YStack>

        <YStack gap={16}>
          <YStack gap={8}>
            <Paragraph fontSize={13} fontWeight="600" color={C.text}>Daily Limit (SAR)</Paragraph>
            <Input keyboardType="numeric" value={daily} onChangeText={setDaily} size="$5" borderRadius={12} focusStyle={{ borderColor: C.primary }} />
          </YStack>
          
          <YStack gap={8}>
            <Paragraph fontSize={13} fontWeight="600" color={C.text}>Monthly Limit (SAR)</Paragraph>
            <Input keyboardType="numeric" value={monthly} onChangeText={setMonthly} size="$5" borderRadius={12} focusStyle={{ borderColor: C.primary }} />
          </YStack>

          <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} marginTop={16} backgroundColor={C.primary} color="white" size="$5" borderRadius={14} onPress={handleSave}>
            Save Changes
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

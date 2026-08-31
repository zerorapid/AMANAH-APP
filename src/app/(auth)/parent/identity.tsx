import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ParentIdentity() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleNext = () => {
    if (!name) return alert("Please enter your name");
    router.push('/(auth)/parent/security');
  }

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
            <ChevronLeft size={28} color={C.text} />
          </TouchableOpacity>
          <Paragraph fontSize={28} fontWeight="bold" color={C.text} marginBottom={8}>Who are you?</Paragraph>
          <Paragraph color={C.muted} fontSize={15} marginBottom={32}>We need some basic details to set up your parent wallet.</Paragraph>
          
          <YStack gap={16} marginBottom={32}>
            <YStack gap={8}>
              <Paragraph fontSize={14} fontWeight="600" color={C.text}>Full Name</Paragraph>
              <Input value={name} onChangeText={setName} placeholder="John Doe" size="$5"
                borderRadius={12} borderColor={C.border} backgroundColor={C.white} focusStyle={{ borderColor: C.primary }} />
            </YStack>
            <YStack gap={8}>
              <Paragraph fontSize={14} fontWeight="600" color={C.text}>Email Address</Paragraph>
              <Input placeholder="john@example.com" keyboardType="email-address" size="$5"
                borderRadius={12} borderColor={C.border} backgroundColor={C.white} focusStyle={{ borderColor: C.primary }} />
            </YStack>
            <YStack gap={8}>
              <Paragraph fontSize={14} fontWeight="600" color={C.text}>Date of Birth</Paragraph>
              {/* Mock Date Picker UI */}
              <Input placeholder="MM/DD/YYYY" size="$5"
                borderRadius={12} borderColor={C.border} backgroundColor={C.white} focusStyle={{ borderColor: C.primary }} />
            </YStack>
          </YStack>
          
          <Button backgroundColor={C.primary} color="white" size="$5" borderRadius={14} onPress={handleNext}>
            Continue
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.bg } })

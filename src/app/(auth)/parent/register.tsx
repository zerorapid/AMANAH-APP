import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ParentRegister() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  
  const handleNext = () => {
    if (phone.length < 5) return alert("Please enter a valid phone number");
    router.push('/(auth)/parent/identity');
  }

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
            <ChevronLeft size={28} color={C.text} />
          </TouchableOpacity>
          <Paragraph fontSize={28} fontWeight="bold" color={C.text} marginBottom={8}>Create Account</Paragraph>
          <Paragraph color={C.muted} fontSize={15} marginBottom={32}>Enter your mobile number to receive an OTP.</Paragraph>
          
          <YStack gap={16} marginBottom={32}>
            <YStack gap={8}>
              <Paragraph fontSize={14} fontWeight="600" color={C.text}>Mobile Number</Paragraph>
              <Input value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="+966 50 123 4567" size="$5"
                borderRadius={12} borderColor={C.border} backgroundColor={C.white} focusStyle={{ borderColor: C.primary }} />
            </YStack>
            <YStack gap={8}>
              <Paragraph fontSize={14} fontWeight="600" color={C.text}>Country</Paragraph>
              <Input placeholder="Saudi Arabia" size="$5" value="Saudi Arabia" disabled={true} opacity={0.7}
                borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
            </YStack>
          </YStack>
          
          <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} backgroundColor={C.primary} color="white" size="$5" borderRadius={14} onPress={handleNext}>
            Send OTP
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.bg } })

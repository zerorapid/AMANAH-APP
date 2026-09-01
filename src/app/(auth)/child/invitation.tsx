import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { YStack, Paragraph, Button, Input, XStack } from 'tamagui'
import { useRouter } from 'expo-router'
import { useState, useRef } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ChildInvitation() {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  
  const handleNext = () => {
    if (code.join('').length < 6) return alert("Please enter the full 6-digit code");
    router.push('/(auth)/child/security');
  }

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
            <ChevronLeft size={28} color={C.text} />
          </TouchableOpacity>
          <Paragraph fontSize={28} fontWeight="bold" color={C.text} marginBottom={8}>Invitation Code</Paragraph>
          <Paragraph color={C.muted} fontSize={15} marginBottom={32}>Ask your parent for your unique 6-digit invitation code to link your wallets.</Paragraph>
          
          <XStack gap={8} justifyContent="center" marginBottom={32}>
            {code.map((char, index) => (
              <Input
                key={index}
                value={char}
                onChangeText={(text) => {
                  let newCode = [...code]
                  newCode[index] = text
                  setCode(newCode)
                }}
                maxLength={1}
                keyboardType="default"
                autoCapitalize="characters"
                size="$6"
                width={45}
                height={55}
                textAlign="center"
                fontSize={24}
                fontWeight="bold"
                borderRadius={8}
                borderColor={char ? C.primary : C.border}
                backgroundColor={C.white}
                focusStyle={{ borderColor: C.primary }}
              />
            ))}
          </XStack>
          
          <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} backgroundColor={C.primary} color="white" size="$5" borderRadius={6} onPress={handleNext}>
            Verify Code
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.bg } })

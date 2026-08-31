import { StyleSheet } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ParentRegister() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={48} gap={20}>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Create Account</Paragraph>
        <Paragraph color={C.muted} fontSize={14}>Enter your mobile number to receive an OTP.</Paragraph>
        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Mobile Number</Paragraph>
          <Input keyboardType="phone-pad" placeholder="+1 234 567 8900" size="$5"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>
        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Country</Paragraph>
          <Input placeholder="United States" size="$5"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>
        <Button marginTop={8} backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          onPress={() => router.push('/(auth)/parent/identity')}>
          Send OTP
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

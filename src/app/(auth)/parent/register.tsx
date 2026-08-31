import { YStack, H2, Paragraph, Button, Input, Label } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ParentRegister() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <YStack flex={1} padding="$4" gap="$4" justifyContent="center">
        <H2 color="$color9">Create Account</H2>
        <Paragraph color="$color" marginBottom="$4">Enter your mobile number to get started.</Paragraph>
        
        <YStack gap="$2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input id="mobile" keyboardType="phone-pad" placeholder="+1 234 567 8900" size="$4" />
        </YStack>

        <Button backgroundColor="$color9" color="white" size="$5" onPress={() => router.push('/(auth)/parent/identity')} marginTop="$4">
          Send OTP
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

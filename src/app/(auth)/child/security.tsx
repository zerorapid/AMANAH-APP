import { YStack, H2, Paragraph, Button, Input, Label } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChildSecurity() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <YStack flex={1} padding="$4" gap="$4" justifyContent="center">
        <H2 color="$color9">Secure Your App</H2>
        <Paragraph color="$color" marginBottom="$4">Create a PIN to keep your money safe.</Paragraph>
        
        <YStack gap="$2">
          <Label htmlFor="pin">4-Digit PIN</Label>
          <Input id="pin" keyboardType="numeric" secureTextEntry maxLength={4} placeholder="****" size="$4" textAlign="center" letterSpacing={10} />
        </YStack>

        <Button backgroundColor="$color9" color="white" size="$5" onPress={() => router.push('/(child)')} marginTop="$4">
          Go to Wallet
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

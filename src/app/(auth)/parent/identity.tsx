import { YStack, H2, Paragraph, Button, Input, Label } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ParentIdentity() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <YStack flex={1} padding="$4" gap="$4" justifyContent="center">
        <H2 color="$color9">Identity & Profile</H2>
        <Paragraph color="$color" marginBottom="$4">Tell us about yourself.</Paragraph>
        
        <YStack gap="$2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" size="$4" />
        </YStack>

        <YStack gap="$2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" keyboardType="email-address" placeholder="john@example.com" size="$4" />
        </YStack>

        <Button backgroundColor="$color9" color="white" size="$5" onPress={() => router.push('/(auth)/parent/security')} marginTop="$4">
          Continue
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

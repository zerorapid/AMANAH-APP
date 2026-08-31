import { YStack, H2, Paragraph, Button, Input, Label } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChildInvitation() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <YStack flex={1} padding="$4" gap="$4" justifyContent="center">
        <H2 color="$color9">Parent Invitation</H2>
        <Paragraph color="$color" marginBottom="$4">Enter the invitation code provided by your parent.</Paragraph>
        
        <YStack gap="$2">
          <Label htmlFor="code">Invitation Code</Label>
          <Input id="code" autoCapitalize="characters" placeholder="ABC-123" size="$4" />
        </YStack>

        <Button backgroundColor="$color9" color="white" size="$5" onPress={() => router.push('/(auth)/child/register')} marginTop="$4">
          Verify Code
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

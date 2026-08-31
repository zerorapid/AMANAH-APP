import { YStack, H1, Paragraph, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChildWelcome() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$4">
        <H1 color="$color9">Child App</H1>
        <Paragraph color="$color" textAlign="center" marginBottom="$6">
          Learn to manage your money, track your spending, and achieve your goals.
        </Paragraph>
        <Button backgroundColor="$color9" color="white" size="$5" onPress={() => router.push('/(auth)/child/invitation')} width="100%">
          I Have an Invitation
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

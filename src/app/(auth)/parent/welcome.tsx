import { YStack, H1, Paragraph, Button, Image } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ParentWelcome() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" gap="$4">
        <H1 color="\$color9">Parent App</H1>
        <Paragraph color="\$color" textAlign="center" marginBottom="$6">
          Take control of your family's finances and guide your children's spending.
        </Paragraph>
        <Button backgroundColor="\$color9" color="white" size="$5" onPress={() => router.push('/(auth)/parent/register')} width="100%">
          Get Started
        </Button>
      </YStack>
    </SafeAreaView>
  )
}

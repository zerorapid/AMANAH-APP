import { StyleSheet } from 'react-native'
import { YStack, Paragraph, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ParentWelcome() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} justifyContent="center" alignItems="center" paddingHorizontal={24} gap={16}>
        <YStack width={80} height={80} borderRadius={22} backgroundColor={C.orange}
          justifyContent="center" alignItems="center">
          <Paragraph fontSize={36} color="white" fontWeight="bold">👨‍👧</Paragraph>
        </YStack>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text} textAlign="center">
          Parent Account
        </Paragraph>
        <Paragraph color={C.muted} textAlign="center" fontSize={15} lineHeight={22}>
          Take control of your family's finances. Set allowances, limits, and approve your children's spending.
        </Paragraph>
        <Button
          marginTop={16}
          width="100%"
          backgroundColor={C.orange}
          color="white"
          size="$5"
          borderRadius={14}
          onPress={() => router.push('/(auth)/parent/register')}
        >
          Get Started
        </Button>
        <Button
          width="100%"
          backgroundColor="transparent"
          color={C.orange}
          size="$4"
          borderRadius={14}
          borderWidth={1.5}
          borderColor={C.orange}
          onPress={() => router.push('/(parent)')}
        >
          Skip (Demo)
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

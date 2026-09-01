import { StyleSheet } from 'react-native'
import { YStack, XStack, H1, Paragraph, Card } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Shield, User } from 'lucide-react-native'
import { C } from '../constants/theme'

export default function RoleSelector() {
  const router = useRouter()

  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} justifyContent="space-between" paddingVertical={40}>

        {/* Logo */}
        <YStack alignItems="center" gap={12}>
          <YStack width={72} height={72} borderRadius={10} backgroundColor={C.primary}
            justifyContent="center" alignItems="center">
            <Paragraph fontSize={32} color="white" fontWeight="bold">A</Paragraph>
          </YStack>
          <H1 color={C.primary} marginTop={8}>Amanah</H1>
          <Paragraph color={C.muted} textAlign="center" fontSize={15}>
            Smart family finance — built on trust.
          </Paragraph>
        </YStack>

        {/* Role Cards */}
        <YStack gap={16}>
          <Paragraph color={C.muted} textAlign="center" fontSize={13} marginBottom={4}>
            Choose your role to continue
          </Paragraph>

          <Card
            onPress={() => router.push('/(auth)/parent/welcome')}
            pressStyle={{ opacity: 0.8, scale: 0.98 }}
            backgroundColor={C.white}
            borderRadius={8}
            borderWidth={2}
            borderColor={C.primary}
            padding={20}
          >
            <XStack gap={16} alignItems="center">
              <YStack backgroundColor={C.primaryLight} padding={12} borderRadius={8}>
                <Shield color={C.primary} size={26} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" fontSize={17} color={C.text}>Parent</Paragraph>
                <Paragraph color={C.muted} fontSize={13}>
                  Control allowances, limits & approvals
                </Paragraph>
              </YStack>
              <Paragraph color={C.primary} fontSize={20}>›</Paragraph>
            </XStack>
          </Card>

          <Card
            onPress={() => router.push('/(auth)/child/welcome')}
            pressStyle={{ opacity: 0.8, scale: 0.98 }}
            backgroundColor={C.white}
            borderRadius={8}
            borderWidth={1.5}
            borderColor={C.border}
            padding={20}
          >
            <XStack gap={16} alignItems="center">
              <YStack backgroundColor={C.primaryLight} padding={12} borderRadius={8}>
                <User color={C.primary} size={26} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" fontSize={17} color={C.text}>Child</Paragraph>
                <Paragraph color={C.muted} fontSize={13}>
                  Spend, request & track your money
                </Paragraph>
              </YStack>
              <Paragraph color={C.muted} fontSize={20}>›</Paragraph>
            </XStack>
          </Card>
        </YStack>

        {/* Footer */}
        <Paragraph color={C.muted} textAlign="center" fontSize={12}>
          Amanah App · Light Mode · v1.0
        </Paragraph>
      </YStack>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
})

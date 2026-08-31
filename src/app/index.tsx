import { View, StyleSheet } from 'react-native'
import { YStack, XStack, H1, H2, Paragraph, Button, Card } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Shield, User } from '@tamagui/lucide-icons'
import { COLORS } from '../constants/theme'

export default function RoleSelector() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <YStack flex={1} padding="$5" justifyContent="space-between">
        {/* Logo & Tagline */}
        <YStack alignItems="center" marginTop="$8" gap="$2">
          <YStack
            backgroundColor={COLORS.primary}
            width={72} height={72}
            borderRadius={20}
            justifyContent="center"
            alignItems="center"
          >
            <H2 color="white" fontSize={30}>A</H2>
          </YStack>
          <H1 color={COLORS.primary} marginTop="$3">Amanah</H1>
          <Paragraph color={COLORS.textMuted} textAlign="center" size="$4">
            Smart family finance — built on trust.
          </Paragraph>
        </YStack>

        {/* Role Cards */}
        <YStack gap="$4">
          <Card
            borderColor={COLORS.primary}
            borderWidth={2}
            borderRadius={16}
            padding="$5"
            backgroundColor="white"
            pressStyle={{ opacity: 0.85 }}
            onPress={() => router.push('/(auth)/parent/welcome')}
          >
            <XStack gap="$4" alignItems="center">
              <YStack backgroundColor={COLORS.primaryLight} padding="$3" borderRadius={12}>
                <Shield color={COLORS.primary} size={28} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" fontSize={17} color={COLORS.text}>Parent</Paragraph>
                <Paragraph color={COLORS.textMuted} size="$3">
                  Control allowances, limits & approvals
                </Paragraph>
              </YStack>
            </XStack>
          </Card>

          <Card
            borderColor={COLORS.border}
            borderWidth={1.5}
            borderRadius={16}
            padding="$5"
            backgroundColor="white"
            pressStyle={{ opacity: 0.85 }}
            onPress={() => router.push('/(auth)/child/welcome')}
          >
            <XStack gap="$4" alignItems="center">
              <YStack backgroundColor={COLORS.primaryLight} padding="$3" borderRadius={12}>
                <User color={COLORS.primary} size={28} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" fontSize={17} color={COLORS.text}>Child</Paragraph>
                <Paragraph color={COLORS.textMuted} size="$3">
                  Spend, request & track your money
                </Paragraph>
              </YStack>
            </XStack>
          </Card>
        </YStack>

        {/* Footer note */}
        <Paragraph color={COLORS.textMuted} textAlign="center" size="$2" marginBottom="$2">
          Light mode · White & Orange · v1.0
        </Paragraph>
      </YStack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
})

import { StyleSheet } from 'react-native'
import { YStack, XStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Shield } from 'lucide-react-native'
import { C } from '../../../constants/theme'

export default function ParentSecurity() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={48} gap={20}>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Security Setup</Paragraph>
        <Paragraph color={C.muted} fontSize={14}>Create a PIN to protect your account.</Paragraph>

        <YStack backgroundColor={C.primaryLight} borderRadius={16} padding={20} alignItems="center" gap={8}>
          <Shield color={C.primary} size={36} />
          <Paragraph color={C.primary} fontWeight="bold" fontSize={15}>Enter 4-Digit PIN</Paragraph>
        </YStack>

        <Input
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          placeholder="• • • •"
          size="$6"
          borderRadius={12}
          borderColor={C.border}
          backgroundColor={C.white}
          textAlign="center"
          fontSize={28}
          letterSpacing={16}
        />
        <Input
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          placeholder="Confirm PIN"
          size="$6"
          borderRadius={12}
          borderColor={C.border}
          backgroundColor={C.white}
          textAlign="center"
          fontSize={28}
          letterSpacing={16}
        />

        <XStack gap={12} alignItems="center" backgroundColor={C.successBg} borderRadius={12} padding={12}>
          <Lightbulb size={18} color={C.primary} />
          <Paragraph color={C.success} fontSize={13} flex={1}>
            Biometric authentication can be enabled after setup in Settings.
          </Paragraph>
        </XStack>

        <Button backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          onPress={() => router.replace('/(parent)')}>
          Complete Setup & Enter App
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

import { Mail } from "lucide-react-native";
import { StyleSheet } from 'react-native'
import { YStack, XStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ChildInvitation() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={48} gap={20}>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Enter Invitation</Paragraph>
        <Paragraph color={C.muted} fontSize={14}>Your parent sent you an invitation code. Enter it below.</Paragraph>
        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Invitation Code</Paragraph>
          <Input autoCapitalize="characters" placeholder="e.g. ABC-123" size="$6"
            borderRadius={12} borderColor={C.primary} borderWidth={2}
            backgroundColor={C.white} textAlign="center" fontSize={22} letterSpacing={4} />
        </YStack>
        <XStack backgroundColor={C.primaryLight} borderRadius={12} padding={12} gap={10}>
          <Mail size={18} color={C.primary} />
          <Paragraph color={C.primary} fontSize={13} flex={1}>
            Ask your parent to generate a code from their Parent App → Children → Add Child.
          </Paragraph>
        </XStack>
        <Button backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          onPress={() => router.push('/(auth)/child/register')}>
          Verify Code
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

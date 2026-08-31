import { StyleSheet } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ParentIdentity() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={48} gap={20}>
      <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 8 }}>
        <ChevronLeft size={28} color={C.text} />
      </TouchableOpacity>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Identity & Profile</Paragraph>
        <Paragraph color={C.muted} fontSize={14}>Tell us about yourself to verify your account.</Paragraph>
        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Full Name</Paragraph>
          <Input placeholder="John Doe" size="$5" borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>
        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Email Address</Paragraph>
          <Input keyboardType="email-address" placeholder="john@example.com" size="$5"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>
        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Date of Birth</Paragraph>
          <Input placeholder="DD / MM / YYYY" size="$5" borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>
        <Button marginTop={8} backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          onPress={() => router.push('/(auth)/parent/security')}>
          Continue
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

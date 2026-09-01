import { StyleSheet } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ChildSecurity() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={48} gap={20}>
      <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 8 }}>
        <ChevronLeft size={28} color={C.text} />
      </TouchableOpacity>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Set Your PIN</Paragraph>
        <Paragraph color={C.muted} fontSize={14}>Create a 4-digit PIN to secure your wallet.</Paragraph>
        <Input keyboardType="numeric" secureTextEntry maxLength={4}
          placeholder="• • • •" size="$6" borderRadius={8} borderColor={C.border}
          backgroundColor={C.white} textAlign="center" fontSize={28} letterSpacing={16} />
        <Input keyboardType="numeric" secureTextEntry maxLength={4}
          placeholder="Confirm PIN" size="$6" borderRadius={8} borderColor={C.border}
          backgroundColor={C.white} textAlign="center" fontSize={28} letterSpacing={16} />
        <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} marginTop={8} backgroundColor={C.primary} color="white" size="$5" borderRadius={6}
          onPress={() => router.replace('/(child)')}>
          Go to My Wallet
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

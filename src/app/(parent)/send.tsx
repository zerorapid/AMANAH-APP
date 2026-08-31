import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { YStack, XStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Send as SendIcon } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function SendMoneyScreen() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={20} gap={24}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Send Money</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Instantly transfer funds to your child's wallet.</Paragraph>
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Select Child</Paragraph>
          <View style={s.dropdown}>
            <Paragraph color={C.text}>Alex (Balance: 120.00 SAR)</Paragraph>
          </View>
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Amount (SAR)</Paragraph>
          <Input keyboardType="numeric" placeholder="0.00" size="$6" fontSize={24} fontWeight="bold"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Note (Optional)</Paragraph>
          <Input placeholder="e.g. For lunch" size="$5"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>

        <Button marginTop={16} backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          icon={<SendIcon size={18} />} onPress={() => router.back()}>
          Confirm Transfer
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: C.bg },
  dropdown: { backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 16 }
})

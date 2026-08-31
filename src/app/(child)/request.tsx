import { StyleSheet, TouchableOpacity } from 'react-native'
import { YStack, Paragraph, Button, Input } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Send } from 'lucide-react-native'
import { C } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

export default function RequestFunds() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={20} gap={24}>
        <TouchableOpacity onPress={() => { alert("Request sent successfully!"); router.back(); }} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Request Funds</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Ask your parent for extra allowance or a specific purchase.</Paragraph>
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Amount (SAR)</Paragraph>
          <Input keyboardType="numeric" placeholder="0.00" size="$6" fontSize={24} fontWeight="bold"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Reason / Merchant</Paragraph>
          <Input placeholder="e.g. School trip" size="$5"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} />
        </YStack>

        <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} marginTop={16} backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          icon={<Send size={18} />} onPress={() => { alert("Request sent successfully!"); router.back(); }}>
          Send Request to Parent
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.bg } })

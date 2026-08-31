import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { YStack, XStack, Paragraph } from 'tamagui'
import { QrCode, ArrowRightLeft, CreditCard, ChevronRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'

const items = [
  { icon: <QrCode color={C.orange} size={26} />, title: 'Scan & Pay', sub: 'Pay a merchant via QR code' },
  { icon: <ArrowRightLeft color={C.orange} size={26} />, title: 'Send Money', sub: 'Transfer funds to your children' },
  { icon: <CreditCard color={C.orange} size={26} />, title: 'Funding Sources', sub: 'Manage linked bank accounts & cards' },
]

export default function ParentPayments() {
  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Paragraph fontSize={20} fontWeight="bold" color={C.text} marginBottom={16}>
          Payments & Transfers
        </Paragraph>
        <YStack gap={12}>
          {items.map((item) => (
            <TouchableOpacity key={item.title} style={s.card} activeOpacity={0.7}>
              <XStack gap={14} alignItems="center">
                <YStack backgroundColor={C.orangeLight} padding={12} borderRadius={12}>
                  {item.icon}
                </YStack>
                <YStack flex={1}>
                  <Paragraph fontSize={16} fontWeight="bold" color={C.text}>{item.title}</Paragraph>
                  <Paragraph fontSize={13} color={C.muted}>{item.sub}</Paragraph>
                </YStack>
                <ChevronRight size={18} color={C.muted} />
              </XStack>
            </TouchableOpacity>
          ))}
        </YStack>

        {/* Payment approval settings card */}
        <Paragraph fontSize={14} fontWeight="bold" color={C.muted} marginTop={28} marginBottom={12}>
          APPROVAL SETTINGS
        </Paragraph>
        <TouchableOpacity style={[s.card, { backgroundColor: C.orangeLight }]} activeOpacity={0.7}>
          <XStack gap={14} alignItems="center">
            <Paragraph fontSize={28}>⚡</Paragraph>
            <YStack flex={1}>
              <Paragraph fontSize={15} fontWeight="bold" color={C.orange}>Approve Every Payment</Paragraph>
              <Paragraph fontSize={13} color={C.orange} opacity={0.8}>Switch approval mode for each child</Paragraph>
            </YStack>
            <ChevronRight size={18} color={C.orange} />
          </XStack>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
  scroll: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: C.white, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14 },
})

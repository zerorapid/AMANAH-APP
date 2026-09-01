import { ScrollView, StyleSheet, View } from 'react-native'
import { YStack, XStack, Paragraph } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'
import { ShoppingCart, Wallet, Gamepad2, HelpCircle } from "lucide-react-native";
const getIcon = (name?: string) => {
  switch(name) {
    case "ShoppingCart": return <ShoppingCart size={24} color={C.text} />;
    case "Wallet": return <Wallet size={24} color={C.text} />;
    case "Gamepad2": return <Gamepad2 size={24} color={C.text} />;
    default: return <HelpCircle size={24} color={C.text} />;
  }
};


export default function ChildActivity() {
  const { transactions } = useChildStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Paragraph fontSize={20} fontWeight="bold" color={C.text} marginBottom={16}>All Activity</Paragraph>
        <YStack gap={8}>
          
          {transactions.length === 0 && (
            <YStack padding={40} alignItems="center" gap={12} opacity={0.5}>
              <HelpCircle size={48} color={C.muted} />
              <Paragraph color={C.muted}>No recent activity.</Paragraph>
            </YStack>
          )}
          {transactions.map((tx) => (
            <View key={tx.id} style={s.card}>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={12} alignItems="center" flex={1}>
                  {getIcon(tx.icon)}
                  <YStack flex={1}>
                    <Paragraph fontSize={15} fontWeight="bold" color={C.text}>{tx.merchant}</Paragraph>
                    <Paragraph fontSize={12} color={C.muted}>{tx.date}</Paragraph>
                    {tx.status === 'blocked' && (
                      <Paragraph fontSize={12} color={C.error} fontWeight="bold">Blocked by parent</Paragraph>
                    )}
                  </YStack>
                </XStack>
                <Paragraph fontSize={15} fontWeight="bold"
                  color={tx.amount > 0 ? C.success : tx.status === 'blocked' ? C.error : C.text}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)} SAR
                </Paragraph>
              </XStack>
            </View>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
  scroll: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.border, padding: 14 },
})

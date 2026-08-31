import { ScrollView, StyleSheet, View } from 'react-native'
import { YStack, XStack, Paragraph } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

export default function ChildActivity() {
  const { transactions } = useChildStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Paragraph fontSize={20} fontWeight="bold" color={C.text} marginBottom={16}>All Activity</Paragraph>
        <YStack gap={8}>
          {transactions.map((tx) => (
            <View key={tx.id} style={s.card}>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={12} alignItems="center" flex={1}>
                  <Paragraph fontSize={24}>{tx.icon}</Paragraph>
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
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
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
  card: { backgroundColor: C.white, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 14 },
})

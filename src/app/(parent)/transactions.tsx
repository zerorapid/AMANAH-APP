import { ScrollView, StyleSheet, View } from 'react-native'
import { YStack, XStack, Paragraph } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function ParentTransactions() {
  const { transactions } = useParentStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Paragraph fontSize={20} fontWeight="bold" color={C.text} marginBottom={16}>
          All Transactions
        </Paragraph>

        {/* Filter tabs */}
        <XStack gap={8} marginBottom={16}>
          {['All', 'Completed', 'Blocked'].map((tab) => (
            <View key={tab} style={[s.tab, tab === 'All' && s.tabActive]}>
              <Paragraph fontSize={13} fontWeight="600" color={tab === 'All' ? C.white : C.muted}>{tab}</Paragraph>
            </View>
          ))}
        </XStack>

        <YStack gap={8}>
          {transactions.map((tx) => (
            <View key={tx.id} style={s.card}>
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap={12} alignItems="center" flex={1}>
                  <Paragraph fontSize={24}>{tx.icon}</Paragraph>
                  <YStack flex={1}>
                    <Paragraph fontSize={15} fontWeight="bold" color={C.text}>{tx.merchant}</Paragraph>
                    <Paragraph fontSize={12} color={C.muted}>
                      {tx.childId ? (tx.childId === 'c1' ? 'Alex' : 'Sarah') : 'Parent'} · {tx.date}
                    </Paragraph>
                  </YStack>
                </XStack>
                <YStack alignItems="flex-end">
                  <Paragraph fontSize={15} fontWeight="bold"
                    color={tx.amount > 0 ? C.success : C.text}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </Paragraph>
                  <View style={[s.badge,
                    tx.status === 'blocked' ? s.badgeRed :
                    tx.status === 'completed' ? s.badgeGreen : s.badgeGray]}>
                    <Paragraph fontSize={10} fontWeight="bold"
                      color={tx.status === 'blocked' ? C.error : tx.status === 'completed' ? C.success : C.muted}>
                      {tx.status.toUpperCase()}
                    </Paragraph>
                  </View>
                </YStack>
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
  tab: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: C.bg },
  tabActive: { backgroundColor: C.orange },
  card: { backgroundColor: C.white, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 12 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 2 },
  badgeRed: { backgroundColor: C.errorBg },
  badgeGreen: { backgroundColor: C.successBg },
  badgeGray: { backgroundColor: C.bg },
})

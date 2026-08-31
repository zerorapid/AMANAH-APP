import { ScrollView, StyleSheet } from 'react-native'
import { YStack, XStack, H4, Paragraph, Card } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

export default function ChildActivity() {
  const { transactions } = useChildStore()

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <H4 color={COLORS.primary} marginBottom="$4">All Activity</H4>
        <YStack gap="$2">
          {transactions.map((tx) => (
            <Card key={tx.id} borderColor={COLORS.border} borderWidth={1} borderRadius={12} padding="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap="$3" alignItems="center">
                  <Paragraph fontSize={22}>{tx.icon}</Paragraph>
                  <YStack>
                    <Paragraph fontWeight="bold" size="$3" color={COLORS.text}>{tx.merchant}</Paragraph>
                    <Paragraph size="$2" color={COLORS.textMuted}>{tx.date}</Paragraph>
                    {tx.status === 'blocked' && (
                      <Paragraph size="$2" color={COLORS.error} fontWeight="bold">Blocked by parent</Paragraph>
                    )}
                  </YStack>
                </XStack>
                <Paragraph fontWeight="bold"
                  color={tx.amount > 0 ? COLORS.success : tx.status === 'blocked' ? COLORS.error : COLORS.text}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </Paragraph>
              </XStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { padding: 16, paddingBottom: 40 },
})

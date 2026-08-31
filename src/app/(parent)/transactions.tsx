import { ScrollView } from 'react-native'
import { YStack, XStack, H4, Paragraph, Card, Separator } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ParentTransactions() {
  const transactions = [
    { id: 1, merchant: 'Amazon', amount: '-$12.50', child: 'Alex', date: 'Today, 10:42 AM', status: 'Completed' },
    { id: 2, merchant: 'PlayStation', amount: '-$5.00', child: 'Sarah', date: 'Yesterday', status: 'Completed' },
    { id: 3, merchant: 'Steam Games', amount: '-$20.00', child: 'Alex', date: 'Aug 24', status: 'Blocked' },
    { id: 4, merchant: 'Allowance', amount: '+$50.00', child: 'Alex', date: 'Aug 20', status: 'Completed' },
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <H4 color="$color9" marginBottom="$4">Recent Transactions</H4>
        
        <YStack gap="$3">
          {transactions.map((tx) => (
            <Card key={tx.id} borderColor="$borderColor" padding="$3" borderRadius="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <YStack>
                  <Paragraph fontWeight="bold" color="$color9">{tx.merchant}</Paragraph>
                  <Paragraph size="$2" color="$color">{tx.child} • {tx.date}</Paragraph>
                  {tx.status === 'Blocked' && (
                    <Paragraph size="$2" color="red" fontWeight="bold">Blocked</Paragraph>
                  )}
                </YStack>
                <Paragraph fontWeight="bold" color={tx.amount.startsWith('+') ? 'green' : '$color9'}>
                  {tx.amount}
                </Paragraph>
              </XStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

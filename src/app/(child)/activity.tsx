import { ScrollView } from 'react-native'
import { YStack, XStack, H4, Paragraph, Card } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'

const transactions = [
  { id: 1, merchant: 'Amazon', amount: '-$12.50', date: 'Today, 10:42 AM', status: 'Completed', icon: '🛒' },
  { id: 2, merchant: 'Allowance', amount: '+$50.00', date: 'Yesterday', status: 'Completed', icon: '💰' },
  { id: 3, merchant: 'Steam Games', amount: '-$20.00', date: 'Aug 24', status: 'Blocked', icon: '🎮' },
  { id: 4, merchant: 'McDonald\'s', amount: '-$8.00', date: 'Aug 22', status: 'Completed', icon: '🍔' },
  { id: 5, merchant: 'Extra Request', amount: '+$15.00', date: 'Aug 20', status: 'Approved', icon: '✅' },
  { id: 6, merchant: 'Parent Transfer', amount: '+$25.00', date: 'Aug 18', status: 'Completed', icon: '💸' },
]

export default function ChildActivity() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <H4 color="$color9" marginBottom="$4">Activity</H4>

        <YStack gap="$3">
          {transactions.map((tx) => (
            <Card key={tx.id} borderColor="$borderColor" padding="$3" borderRadius="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap="$3" alignItems="center">
                  <Paragraph fontSize={24}>{tx.icon}</Paragraph>
                  <YStack>
                    <Paragraph fontWeight="bold" color="$color9">{tx.merchant}</Paragraph>
                    <Paragraph size="$2" color="$color">{tx.date}</Paragraph>
                    {tx.status === 'Blocked' && (
                      <Paragraph size="$2" color="red">Blocked by parent</Paragraph>
                    )}
                  </YStack>
                </XStack>
                <Paragraph fontWeight="bold" color={tx.amount.startsWith('+') ? 'green' : tx.status === 'Blocked' ? 'red' : '$color9'}>
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

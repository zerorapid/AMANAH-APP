import { ScrollView, StyleSheet } from 'react-native'
import { YStack, XStack, H2, H4, Paragraph, Button, Card, Avatar, Separator, Progress } from 'tamagui'
import { Bell, QrCode, Send } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

export default function ChildWalletHome() {
  const { child, transactions } = useChildStore()
  const pct = Math.min((child.spent / child.monthlyLimit) * 100, 100)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$5">
          <XStack gap="$3" alignItems="center">
            <Avatar circular size="$5">
              <Avatar.Image src={child.avatar} />
              <Avatar.Fallback backgroundColor={COLORS.primaryLight} />
            </Avatar>
            <YStack>
              <Paragraph size="$2" color={COLORS.textMuted}>Hey there 👋</Paragraph>
              <H4 color={COLORS.primary}>{child.name}</H4>
            </YStack>
          </XStack>
          <Button circular size="$3" backgroundColor={COLORS.primaryLight}
            icon={<Bell size={18} color={COLORS.primary} />} />
        </XStack>

        {/* Balance Card */}
        <Card backgroundColor={COLORS.primary} borderRadius={20} padding="$5" marginBottom="$5">
          <YStack gap="$2">
            <Paragraph color="white" opacity={0.85}>Available Balance</Paragraph>
            <H2 color="white" fontSize={40}>${child.balance.toFixed(2)}</H2>
            <Separator borderColor="rgba(255,255,255,0.25)" marginVertical="$2" />
            <XStack justifyContent="space-between">
              <YStack gap="$1">
                <Paragraph color="white" opacity={0.75} size="$2">Spent this month</Paragraph>
                <Paragraph color="white" fontWeight="bold">${child.spent.toFixed(2)}</Paragraph>
              </YStack>
              <YStack gap="$1" alignItems="flex-end">
                <Paragraph color="white" opacity={0.75} size="$2">Remaining limit</Paragraph>
                <Paragraph color="white" fontWeight="bold">${(child.monthlyLimit - child.spent).toFixed(2)}</Paragraph>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        {/* Quick Actions */}
        <XStack gap="$3" marginBottom="$5">
          <Button flex={1} icon={<QrCode size={16} />} backgroundColor={COLORS.primary} color="white" fontWeight="bold">
            Scan & Pay
          </Button>
          <Button flex={1} icon={<Send size={16} />} backgroundColor={COLORS.primaryLight} color={COLORS.primary} fontWeight="bold">
            Request
          </Button>
        </XStack>

        {/* My Limits */}
        <H4 color={COLORS.text} marginBottom="$3">My Limits</H4>
        <Card borderColor={COLORS.border} borderWidth={1} borderRadius={14} padding="$4" marginBottom="$5">
          <YStack gap="$3">
            <YStack gap="$1">
              <XStack justifyContent="space-between">
                <Paragraph size="$3" color={COLORS.textMuted}>Monthly</Paragraph>
                <Paragraph size="$3" color={COLORS.text} fontWeight="bold">
                  ${child.spent} / ${child.monthlyLimit}
                </Paragraph>
              </XStack>
              <Progress value={pct} size="$1" backgroundColor={COLORS.primaryLight}>
                <Progress.Indicator backgroundColor={pct > 85 ? COLORS.error : COLORS.primary} />
              </Progress>
            </YStack>
            <Separator borderColor={COLORS.border} />
            <XStack justifyContent="space-between">
              <Paragraph size="$3" color={COLORS.textMuted}>Daily Limit</Paragraph>
              <Paragraph size="$3" color={COLORS.primary} fontWeight="bold">${child.dailyLimit}</Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph size="$3" color={COLORS.textMuted}>Payment Mode</Paragraph>
              <Paragraph size="$3" color={child.paymentMode === 'auto' ? COLORS.success : COLORS.warning} fontWeight="bold">
                {child.paymentMode === 'auto' ? 'Auto-Approved ✓' : 'Parent Approval Required'}
              </Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph size="$3" color={COLORS.textMuted}>Restricted</Paragraph>
              <Paragraph size="$3" color={COLORS.error} fontWeight="bold">
                {child.restrictedCategories.join(', ')}
              </Paragraph>
            </XStack>
          </YStack>
        </Card>

        {/* Recent Activity */}
        <H4 color={COLORS.text} marginBottom="$3">Recent Activity</H4>
        <YStack gap="$2">
          {transactions.slice(0, 4).map((tx) => (
            <Card key={tx.id} borderColor={COLORS.border} borderWidth={1} borderRadius={12} padding="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap="$3" alignItems="center">
                  <Paragraph fontSize={22}>{tx.icon}</Paragraph>
                  <YStack>
                    <Paragraph fontWeight="bold" size="$3" color={COLORS.text}>{tx.merchant}</Paragraph>
                    <Paragraph size="$2" color={COLORS.textMuted}>{tx.date}</Paragraph>
                  </YStack>
                </XStack>
                <YStack alignItems="flex-end">
                  <Paragraph fontWeight="bold" color={tx.amount > 0 ? COLORS.success : COLORS.text}>
                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                  </Paragraph>
                  {tx.status === 'blocked' && (
                    <Paragraph size="$2" color={COLORS.error}>Blocked</Paragraph>
                  )}
                </YStack>
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

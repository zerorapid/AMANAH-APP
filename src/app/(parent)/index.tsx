import { ScrollView, StyleSheet } from 'react-native'
import { YStack, XStack, H2, H4, Paragraph, Button, Card, Avatar, Separator, Progress } from 'tamagui'
import { Bell, Plus, Send, ArrowDownCircle, CheckCircle, Clock } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/theme'

const pendingApprovals = [
  { id: 1, child: 'Alex', merchant: 'Steam Games', amount: '$15.00' },
]

export default function ParentDashboard() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$5">
          <XStack gap="$3" alignItems="center">
            <Avatar circular size="$5">
              <Avatar.Image src="https://i.pravatar.cc/150?u=parent" />
              <Avatar.Fallback backgroundColor={COLORS.primaryLight} />
            </Avatar>
            <YStack>
              <Paragraph size="$2" color={COLORS.textMuted}>Welcome back</Paragraph>
              <H4 color={COLORS.primary}>John Doe</H4>
            </YStack>
          </XStack>
          <Button
            circular size="$3"
            backgroundColor={COLORS.primaryLight}
            icon={<Bell size={18} color={COLORS.primary} />}
          />
        </XStack>

        {/* Balance Card */}
        <Card backgroundColor={COLORS.primary} borderRadius={20} padding="$5" marginBottom="$5">
          <YStack gap="$2">
            <Paragraph color="white" opacity={0.85}>Available Balance</Paragraph>
            <H2 color="white" fontSize={36}>$2,450.00</H2>
            <Separator borderColor="rgba(255,255,255,0.25)" marginVertical="$2" />
            <XStack justifyContent="space-between">
              <YStack gap="$1">
                <Paragraph color="white" opacity={0.75} size="$2">Total Allocated</Paragraph>
                <Paragraph color="white" fontWeight="bold">$300.00</Paragraph>
              </YStack>
              <YStack gap="$1" alignItems="flex-end">
                <Paragraph color="white" opacity={0.75} size="$2">Next Allowance</Paragraph>
                <Paragraph color="white" fontWeight="bold">in 3 days</Paragraph>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        {/* Quick Actions */}
        <XStack gap="$3" marginBottom="$5">
          <Button flex={1} icon={<Send size={15} />} backgroundColor={COLORS.primaryLight} color={COLORS.primary} fontWeight="bold">
            Send
          </Button>
          <Button flex={1} icon={<Plus size={15} />} backgroundColor={COLORS.primaryLight} color={COLORS.primary} fontWeight="bold">
            Add Funds
          </Button>
          <Button flex={1} icon={<ArrowDownCircle size={15} />} backgroundColor={COLORS.primaryLight} color={COLORS.primary} fontWeight="bold">
            Top Up
          </Button>
        </XStack>

        {/* Pending Approvals */}
        {pendingApprovals.length > 0 && (
          <Card borderColor={COLORS.warning} borderWidth={1.5} borderRadius={14} padding="$4" backgroundColor="#FFFBEB" marginBottom="$5">
            <XStack gap="$2" alignItems="center" marginBottom="$3">
              <Clock size={16} color={COLORS.warning} />
              <Paragraph fontWeight="bold" color={COLORS.warning}>Pending Approval</Paragraph>
            </XStack>
            {pendingApprovals.map(p => (
              <XStack key={p.id} justifyContent="space-between" alignItems="center">
                <YStack>
                  <Paragraph fontWeight="bold" color={COLORS.text}>{p.child} → {p.merchant}</Paragraph>
                  <Paragraph size="$2" color={COLORS.textMuted}>{p.amount}</Paragraph>
                </YStack>
                <XStack gap="$2">
                  <Button size="$2" backgroundColor={COLORS.success} color="white">✓</Button>
                  <Button size="$2" backgroundColor={COLORS.error} color="white">✗</Button>
                </XStack>
              </XStack>
            ))}
          </Card>
        )}

        {/* Children */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
          <H4 color={COLORS.text}>Your Children</H4>
          <Button size="$2" backgroundColor={COLORS.primaryLight} color={COLORS.primary} icon={<Plus size={13} />}>
            Add
          </Button>
        </XStack>

        <YStack gap="$3" marginBottom="$5">
          {[
            { name: 'Alex', balance: '$45', spent: 55, limit: 150, avatar: 'child1' },
            { name: 'Sarah', balance: '$30', spent: 70, limit: 100, avatar: 'child2' },
          ].map(child => (
            <Card key={child.name} borderColor={COLORS.border} borderWidth={1} borderRadius={14} padding="$4">
              <XStack gap="$3" alignItems="center" marginBottom="$2">
                <Avatar circular size="$4">
                  <Avatar.Image src={`https://i.pravatar.cc/150?u=${child.avatar}`} />
                  <Avatar.Fallback backgroundColor={COLORS.primaryLight} />
                </Avatar>
                <YStack flex={1}>
                  <Paragraph fontWeight="bold" color={COLORS.primary}>{child.name}</Paragraph>
                  <Paragraph size="$2" color={COLORS.textMuted}>Balance: {child.balance}</Paragraph>
                </YStack>
                <Button size="$2" backgroundColor={COLORS.primaryLight} color={COLORS.primary}>
                  Manage
                </Button>
              </XStack>
              <YStack gap="$1">
                <XStack justifyContent="space-between">
                  <Paragraph size="$2" color={COLORS.textMuted}>Spent this month</Paragraph>
                  <Paragraph size="$2" color={COLORS.textMuted}>${child.spent} / ${child.limit}</Paragraph>
                </XStack>
                <Progress value={(child.spent / child.limit) * 100} size="$1" backgroundColor={COLORS.primaryLight}>
                  <Progress.Indicator backgroundColor={COLORS.primary} />
                </Progress>
              </YStack>
            </Card>
          ))}
        </YStack>

        {/* Recent Transactions */}
        <H4 color={COLORS.text} marginBottom="$3">Recent Activity</H4>
        <YStack gap="$2">
          {[
            { icon: '🛒', merchant: 'Amazon', child: 'Alex', amount: '-$12.50', status: 'Completed' },
            { icon: '🎮', merchant: 'Steam', child: 'Alex', amount: '-$20.00', status: 'Blocked' },
            { icon: '💰', merchant: 'Allowance', child: 'Sarah', amount: '+$50.00', status: 'Completed' },
          ].map((tx, i) => (
            <Card key={i} borderColor={COLORS.border} borderWidth={1} borderRadius={12} padding="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap="$3" alignItems="center">
                  <Paragraph fontSize={22}>{tx.icon}</Paragraph>
                  <YStack>
                    <Paragraph fontWeight="bold" size="$3" color={COLORS.text}>{tx.merchant}</Paragraph>
                    <Paragraph size="$2" color={COLORS.textMuted}>{tx.child}</Paragraph>
                  </YStack>
                </XStack>
                <YStack alignItems="flex-end">
                  <Paragraph fontWeight="bold" color={tx.amount.startsWith('+') ? COLORS.success : COLORS.text}>
                    {tx.amount}
                  </Paragraph>
                  {tx.status === 'Blocked' && (
                    <Paragraph size="$2" color={COLORS.error} fontWeight="bold">Blocked</Paragraph>
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

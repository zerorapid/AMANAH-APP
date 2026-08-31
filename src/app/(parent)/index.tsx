import { ScrollView, StyleSheet } from 'react-native'
import { YStack, XStack, H2, H4, Paragraph, Button, Card, Avatar, Separator, Progress } from 'tamagui'
import { Bell, Plus, Send, ArrowDownCircle, Clock } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function ParentDashboard() {
  const { parent, children, transactions, approvalRequests, approveRequest, declineRequest } = useParentStore()
  const pending = approvalRequests.filter((r) => r.status === 'pending')

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$5">
          <XStack gap="$3" alignItems="center">
            <Avatar circular size="$5">
              <Avatar.Image src={parent.avatar} />
              <Avatar.Fallback backgroundColor={COLORS.primaryLight} />
            </Avatar>
            <YStack>
              <Paragraph size="$2" color={COLORS.textMuted}>Welcome back</Paragraph>
              <H4 color={COLORS.primary}>{parent.name}</H4>
            </YStack>
          </XStack>
          <Button circular size="$3" backgroundColor={COLORS.primaryLight}
            icon={<Bell size={18} color={COLORS.primary} />} />
        </XStack>

        {/* Balance Card */}
        <Card backgroundColor={COLORS.primary} borderRadius={20} padding="$5" marginBottom="$5">
          <YStack gap="$2">
            <Paragraph color="white" opacity={0.85}>Available Balance</Paragraph>
            <H2 color="white" fontSize={36}>${parent.balance.toFixed(2)}</H2>
            <Separator borderColor="rgba(255,255,255,0.25)" marginVertical="$2" />
            <XStack justifyContent="space-between">
              <YStack gap="$1">
                <Paragraph color="white" opacity={0.75} size="$2">Total Allocated</Paragraph>
                <Paragraph color="white" fontWeight="bold">
                  ${children.reduce((sum, c) => sum + c.balance, 0).toFixed(2)}
                </Paragraph>
              </YStack>
              <YStack gap="$1" alignItems="flex-end">
                <Paragraph color="white" opacity={0.75} size="$2">Pending Approvals</Paragraph>
                <Paragraph color="white" fontWeight="bold">{pending.length}</Paragraph>
              </YStack>
            </XStack>
          </YStack>
        </Card>

        {/* Quick Actions */}
        <XStack gap="$3" marginBottom="$5">
          {[
            { label: 'Send', icon: <Send size={15} /> },
            { label: 'Add Funds', icon: <Plus size={15} /> },
            { label: 'Top Up', icon: <ArrowDownCircle size={15} /> },
          ].map((a) => (
            <Button key={a.label} flex={1} icon={a.icon} backgroundColor={COLORS.primaryLight} color={COLORS.primary} fontWeight="bold">
              {a.label}
            </Button>
          ))}
        </XStack>

        {/* Pending Approvals */}
        {pending.length > 0 && (
          <Card borderColor={COLORS.warning} borderWidth={1.5} borderRadius={14}
            padding="$4" backgroundColor="#FFFBEB" marginBottom="$5">
            <XStack gap="$2" alignItems="center" marginBottom="$3">
              <Clock size={16} color={COLORS.warning} />
              <Paragraph fontWeight="bold" color={COLORS.warning}>Pending Approvals ({pending.length})</Paragraph>
            </XStack>
            <YStack gap="$3">
              {pending.map((r) => (
                <XStack key={r.id} justifyContent="space-between" alignItems="center">
                  <YStack flex={1}>
                    <Paragraph fontWeight="bold" color={COLORS.text}>{r.childName} → {r.merchant}</Paragraph>
                    <Paragraph size="$2" color={COLORS.textMuted}>${r.amount.toFixed(2)} · {r.createdAt}</Paragraph>
                  </YStack>
                  <XStack gap="$2">
                    <Button size="$2" backgroundColor={COLORS.success} color="white" onPress={() => approveRequest(r.id)}>✓</Button>
                    <Button size="$2" backgroundColor={COLORS.error} color="white" onPress={() => declineRequest(r.id)}>✗</Button>
                  </XStack>
                </XStack>
              ))}
            </YStack>
          </Card>
        )}

        {/* Children */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
          <H4 color={COLORS.text}>Your Children</H4>
          <Button size="$2" backgroundColor={COLORS.primaryLight} color={COLORS.primary} icon={<Plus size={13} />}>Add</Button>
        </XStack>
        <YStack gap="$3" marginBottom="$5">
          {children.map((child) => (
            <Card key={child.id} borderColor={COLORS.border} borderWidth={1} borderRadius={14} padding="$4">
              <XStack gap="$3" alignItems="center" marginBottom="$2">
                <Avatar circular size="$4">
                  <Avatar.Image src={child.avatar} />
                  <Avatar.Fallback backgroundColor={COLORS.primaryLight} />
                </Avatar>
                <YStack flex={1}>
                  <Paragraph fontWeight="bold" color={COLORS.primary}>{child.name}</Paragraph>
                  <Paragraph size="$2" color={COLORS.textMuted}>Balance: ${child.balance.toFixed(2)}</Paragraph>
                </YStack>
                <Button size="$2" backgroundColor={COLORS.primaryLight} color={COLORS.primary}>Manage</Button>
              </XStack>
              <YStack gap="$1">
                <XStack justifyContent="space-between">
                  <Paragraph size="$2" color={COLORS.textMuted}>Monthly spending</Paragraph>
                  <Paragraph size="$2" color={COLORS.textMuted}>${child.spent} / ${child.monthlyLimit}</Paragraph>
                </XStack>
                <Progress value={(child.spent / child.monthlyLimit) * 100} size="$1" backgroundColor={COLORS.primaryLight}>
                  <Progress.Indicator backgroundColor={COLORS.primary} />
                </Progress>
              </YStack>
            </Card>
          ))}
        </YStack>

        {/* Recent Transactions */}
        <H4 color={COLORS.text} marginBottom="$3">Recent Activity</H4>
        <YStack gap="$2">
          {transactions.slice(0, 5).map((tx) => (
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

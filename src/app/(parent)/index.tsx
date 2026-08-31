import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native"
import { YStack, XStack, Paragraph, Button, Card, Avatar, Progress } from 'tamagui'
import { Bell, Plus, Send, ArrowDownCircle, Clock } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

import { ShoppingCart, Wallet, Gamepad2, HelpCircle } from "lucide-react-native";
const getIcon = (name?: string) => {
  switch(name) {
    case "ShoppingCart": return <ShoppingCart size={22} color={C.text} />;
    case "Wallet": return <Wallet size={22} color={C.text} />;
    case "Gamepad2": return <Gamepad2 size={22} color={C.text} />;
    default: return <HelpCircle size={22} color={C.text} />;
  }
};


import { useRouter } from "expo-router";
export default function ParentDashboard() {
  const router = useRouter();
  const { parent, children, transactions, approvalRequests, approveRequest, declineRequest } = useParentStore()
  const pending = approvalRequests.filter((r) => r.status === 'pending')

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom={20}>
          <XStack gap={12} alignItems="center">
            <Avatar circular size="$5">
              <Avatar.Image src={parent.avatar} />
              <Avatar.Fallback backgroundColor={C.primaryLight} />
            </Avatar>
            <YStack>
              <Paragraph fontSize={13} color={C.muted}>Welcome back</Paragraph>
              <Paragraph fontSize={17} fontWeight="bold" color={C.primary}>{parent.name}</Paragraph>
            </YStack>
          </XStack>
          <View style={s.iconBtn}>
            <Bell color={C.primary} size={20} />
          </View>
        </XStack>

        {/* Balance Card */}
        <View style={s.balanceCard}>
          <Paragraph style={s.balLabel}>Available Balance</Paragraph>
          <Paragraph style={s.balAmount}>${parent.balance.toFixed(2)} SAR</Paragraph>
          <View style={s.divider} />
          <XStack justifyContent="space-between">
            <YStack gap={2}>
              <Paragraph style={s.balSub}>Total Allocated</Paragraph>
              <Paragraph style={s.balVal}>${children.reduce((s, c) => s + c.balance, 0).toFixed(2)} SAR</Paragraph>
            </YStack>
            <YStack gap={2} alignItems="flex-end">
              <Paragraph style={s.balSub}>Pending Approvals</Paragraph>
              <Paragraph style={s.balVal}>{pending.length}</Paragraph>
            </YStack>
          </XStack>
        </View>

        {/* Quick Actions */}
        <XStack gap={10} marginBottom={20}>
          {[{ label: 'Send', icon: <Send size={14} color={C.primary} /> },
            { label: 'Add Funds', icon: <Plus size={14} color={C.primary} /> },
            { label: 'Top Up', icon: <ArrowDownCircle size={14} color={C.primary} /> }
          ].map((a) => (
            <TouchableOpacity key={a.label} style={s.quickBtn} activeOpacity={0.7} onPress={() => {
                if (a.label === 'Send') router.push('/(parent)/send' as any);
                else router.push('/(parent)/top-up' as any);
              }}>
              {a.icon}
              <Paragraph style={s.quickLabel}>{a.label}</Paragraph>
            </TouchableOpacity>
          ))}
        </XStack>

        {/* Pending Approvals */}
        {pending.length > 0 && (
          <View style={[s.card, s.warnCard]}>
            <XStack gap={8} alignItems="center" marginBottom={12}>
              <Clock size={16} color={C.warning} />
              <Paragraph fontSize={14} fontWeight="bold" color={C.warning}>
                Pending Approvals ({pending.length})
              </Paragraph>
            </XStack>
            {pending.map((r) => (
              <XStack key={r.id} justifyContent="space-between" alignItems="center" marginBottom={8}>
                <YStack flex={1}>
                  <Paragraph fontSize={14} fontWeight="bold" color={C.text}>{r.childName} → {r.merchant}</Paragraph>
                  <Paragraph fontSize={12} color={C.muted}>${r.amount.toFixed(2)} SAR · {r.createdAt}</Paragraph>
                </YStack>
                <XStack gap={8}>
                  <Button size="$2" backgroundColor={C.success} color="white" onPress={() => approveRequest(r.id)}>✓</Button>
                  <Button size="$2" backgroundColor={C.error} color="white" onPress={() => declineRequest(r.id)}>✗</Button>
                </XStack>
              </XStack>
            ))}
          </View>
        )}

        {/* Children */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
          <Paragraph fontSize={16} fontWeight="bold" color={C.text}>Your Children</Paragraph>
          <Button onPress={() => alert("This feature is scheduled for backend integration in the next phase.")} size="$2" backgroundColor={C.primaryLight} color={C.primary} icon={<Plus size={13} />}>Add</Button>
        </XStack>

        <YStack gap={12} marginBottom={20}>
          {children.map((child) => (
            <View key={child.id} style={s.card}>
              <XStack gap={12} alignItems="center" marginBottom={10}>
                <Avatar circular size="$4">
                  <Avatar.Image src={child.avatar} />
                  <Avatar.Fallback backgroundColor={C.primaryLight} />
                </Avatar>
                <YStack flex={1}>
                  <Paragraph fontSize={15} fontWeight="bold" color={C.primary}>{child.name}</Paragraph>
                  <Paragraph fontSize={13} color={C.muted}>Balance: ${child.balance.toFixed(2)} SAR</Paragraph>
                </YStack>
                <Button onPress={() => alert("This feature is scheduled for backend integration in the next phase.")} size="$2" backgroundColor={C.primaryLight} color={C.primary}>Manage</Button>
              </XStack>
              <XStack justifyContent="space-between" marginBottom={4}>
                <Paragraph fontSize={12} color={C.muted}>Monthly spending</Paragraph>
                <Paragraph fontSize={12} color={C.muted}>${child.spent} SAR / ${child.monthlyLimit} SAR</Paragraph>
              </XStack>
              <Progress value={(child.spent / child.monthlyLimit) * 100} size="$1" backgroundColor={C.primaryLight}>
                <Progress.Indicator backgroundColor={C.primary} />
              </Progress>
            </View>
          ))}
        </YStack>

        {/* Recent Transactions */}
        <Paragraph fontSize={16} fontWeight="bold" color={C.text} marginBottom={12}>Recent Activity</Paragraph>
        <YStack gap={8}>
          {transactions.slice(0, 5).map((tx) => (
            <View key={tx.id} style={s.txRow}>
              <XStack gap={12} alignItems="center" flex={1}>
                {getIcon(tx.icon)}
                <YStack flex={1}>
                  <Paragraph fontSize={14} fontWeight="bold" color={C.text}>{tx.merchant}</Paragraph>
                  <Paragraph fontSize={12} color={C.muted}>{tx.date}</Paragraph>
                </YStack>
              </XStack>
              <YStack alignItems="flex-end">
                <Paragraph fontSize={14} fontWeight="bold"
                  color={tx.amount > 0 ? C.success : C.text}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)} SAR
                </Paragraph>
                {tx.status === 'blocked' && (
                  <Paragraph fontSize={11} color={C.error} fontWeight="bold">Blocked</Paragraph>
                )}
              </YStack>
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
  balanceCard: { backgroundColor: C.primary, borderRadius: 20, padding: 20, marginBottom: 20 },
  balLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  balAmount: { color: 'white', fontSize: 36, fontWeight: 'bold', marginVertical: 4 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 12 },
  balSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  balVal: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  iconBtn: { backgroundColor: C.primaryLight, width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center' },
  quickBtn: { flex: 1, backgroundColor: C.primaryLight, borderRadius: 12, padding: 12,
    alignItems: 'center', gap: 4 },
  quickLabel: { color: C.primary, fontSize: 12, fontWeight: '600' },
  card: { backgroundColor: C.white, borderRadius: 14, borderWidth: 1,
    borderColor: C.border, padding: 14 },
  warnCard: { borderColor: C.warning, backgroundColor: C.warningBg, marginBottom: 20 },
  txRow: { backgroundColor: C.white, borderRadius: 12, borderWidth: 1,
    borderColor: C.border, padding: 12, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between' },
})

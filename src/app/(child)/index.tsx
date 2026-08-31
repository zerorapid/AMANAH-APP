import { ScrollView, StyleSheet, View } from 'react-native'
import { YStack, XStack, Paragraph, Button, Avatar } from 'tamagui'
import { Bell, QrCode, Send } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { C } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'
import { ShoppingCart, Wallet, Gamepad2, HelpCircle } from 'lucide-react-native'

const getIcon = (name?: string) => {
  switch(name) {
    case 'ShoppingCart': return <ShoppingCart size={22} color={C.text} />;
    case 'Wallet': return <Wallet size={22} color={C.text} />;
    case 'Gamepad2': return <Gamepad2 size={22} color={C.text} />;
    default: return <HelpCircle size={22} color={C.text} />;
  }
}

export default function ChildWalletHome() {
  const router = useRouter()
  const { child, transactions } = useChildStore()
  const pct = Math.min((child.spent / child.monthlyLimit) * 100, 100)

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom={20}>
          <XStack gap={12} alignItems="center">
            <Avatar circular size="$5">
              <Avatar.Image src={child.avatar} />
              <Avatar.Fallback backgroundColor={C.primaryLight} />
            </Avatar>
            <YStack>
              <Paragraph fontSize={13} color={C.muted}>Hey there!</Paragraph>
              <Paragraph fontSize={17} fontWeight="bold" color={C.primary}>{child.name}</Paragraph>
            </YStack>
          </XStack>
          <View style={s.iconBtn}>
            <Bell color={C.primary} size={20} />
          </View>
        </XStack>

        {/* Balance Card */}
        <View style={s.balanceCard}>
          <Paragraph style={s.balLabel}>Available Balance</Paragraph>
          <Paragraph style={s.balAmount}>${child.balance.toFixed(2)} SAR</Paragraph>
          <View style={s.divider} />
          <XStack justifyContent="space-between">
            <YStack gap={2}>
              <Paragraph style={s.balSub}>Spent this month</Paragraph>
              <Paragraph style={s.balVal}>${child.spent.toFixed(2)} SAR</Paragraph>
            </YStack>
            <YStack gap={2} alignItems="flex-end">
              <Paragraph style={s.balSub}>Remaining limit</Paragraph>
              <Paragraph style={s.balVal}>${(child.monthlyLimit - child.spent).toFixed(2)} SAR</Paragraph>
            </YStack>
          </XStack>
        </View>

        {/* Quick Actions */}
        <XStack gap={12} marginBottom={20}>
          <Button flex={1} icon={<QrCode size={16} />} backgroundColor={C.primary} color="white" fontWeight="bold" borderRadius={12} onPress={() => router.push('/(child)/scan')}>
            Scan & Pay
          </Button>
          <Button onPress={() => alert("This feature is scheduled for backend integration in the next phase.")} flex={1} icon={<Send size={16} />} backgroundColor={C.primaryLight} color={C.primary} fontWeight="bold" borderRadius={12}>
            Request
          </Button>
        </XStack>

        {/* My Limits */}
        <Paragraph fontSize={16} fontWeight="bold" color={C.text} marginBottom={12}>My Limits</Paragraph>
        <View style={[s.card, { marginBottom: 20 }]}>
          <YStack gap={12}>
            <YStack gap={6}>
              <XStack justifyContent="space-between">
                <Paragraph fontSize={14} color={C.muted}>Monthly</Paragraph>
                <Paragraph fontSize={14} color={C.text} fontWeight="bold">
                  ${child.spent} SAR / ${child.monthlyLimit} SAR
                </Paragraph>
              </XStack>
              <View style={s.progressBarBg}>
                <View style={[s.progressBarFill, { width: `${pct}%`, backgroundColor: pct > 85 ? C.error : C.primary }]} />
              </View>
            </YStack>
            <View style={{ height: 1, backgroundColor: C.border }} />
            <XStack justifyContent="space-between">
              <Paragraph fontSize={14} color={C.muted}>Daily Limit</Paragraph>
              <Paragraph fontSize={14} color={C.primary} fontWeight="bold">${child.dailyLimit} SAR</Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph fontSize={14} color={C.muted}>Payment Mode</Paragraph>
              <Paragraph fontSize={14} color={child.paymentMode === 'auto' ? C.success : C.warning} fontWeight="bold">
                {child.paymentMode === 'auto' ? 'Auto-Approved ✓' : 'Approval Required'}
              </Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph fontSize={14} color={C.muted}>Restricted</Paragraph>
              <Paragraph fontSize={14} color={C.error} fontWeight="bold">
                {child.restrictedCategories.join(', ')}
              </Paragraph>
            </XStack>
          </YStack>
        </View>

        {/* Recent Activity */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom={12}>
          <Paragraph fontSize={16} fontWeight="bold" color={C.text}>Recent Activity</Paragraph>
          <Button size="$2" backgroundColor="transparent" color={C.primary} onPress={() => router.push('/(child)/activity')}>View All</Button>
        </XStack>

        <YStack gap={8}>
          {transactions.slice(0, 4).map((tx) => (
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
  iconBtn: { backgroundColor: C.primaryLight, width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center' },
  balanceCard: { backgroundColor: C.primary, borderRadius: 20, padding: 20, marginBottom: 20 },
  balLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  balAmount: { color: 'white', fontSize: 40, fontWeight: 'bold', marginVertical: 4 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 12 },
  balSub: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  balVal: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  card: { backgroundColor: C.white, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 16 },
  progressBarBg: { height: 8, backgroundColor: C.primaryLight, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  txRow: { backgroundColor: C.white, borderRadius: 12, borderWidth: 1,
    borderColor: C.border, padding: 12, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between' },
})

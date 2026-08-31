import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { YStack, XStack, Paragraph, Button, Avatar } from 'tamagui'
import { Bell, ShieldAlert, LogOut, User, ChevronRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { C } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

export default function ChildMore() {
  const router = useRouter()
  const { child } = useChildStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Profile Card */}
        <View style={s.profileCard}>
          <Avatar circular size="$6">
            <Avatar.Image src={child.avatar} />
            <Avatar.Fallback backgroundColor={C.primaryLight} />
          </Avatar>
          <YStack flex={1} gap={4}>
            <Paragraph fontSize={18} fontWeight="bold" color={C.white}>{child.name}</Paragraph>
            <Paragraph fontSize={13} color="rgba(255,255,255,0.8)">Parent: John Doe</Paragraph>
            <View style={s.badge}>
              <Paragraph fontSize={11} color={C.white} fontWeight="600">
                {child.status === 'active' ? '✓ Active Account' : child.status}
              </Paragraph>
            </View>
          </YStack>
        </View>

        {/* Limits — READ ONLY */}
        <Paragraph fontSize={13} fontWeight="600" color={C.muted} marginBottom={10}>
          MY LIMITS (VIEW ONLY)
        </Paragraph>
        <View style={[s.card, { marginBottom: 20 }]}>
          {[
            { label: 'Daily Limit', value: `$${child.dailyLimit} SAR.00`, color: C.text },
            { label: 'Monthly Limit', value: `$${child.monthlyLimit} SAR.00`, color: C.text },
            { label: 'Per Transaction', value: `$${child.perTransactionLimit} SAR.00`, color: C.text },
            { label: 'Payment Mode', value: child.paymentMode === 'auto' ? 'Auto-Approved ✓' : 'Parent Approval Required', color: child.paymentMode === 'auto' ? C.success : C.warning },
            { label: 'Restricted', value: child.restrictedCategories.join(', '), color: C.error },
          ].map((row, i, arr) => (
            <View key={row.label}>
              <XStack justifyContent="space-between" alignItems="center" paddingVertical={10}>
                <Paragraph fontSize={14} color={C.muted}>{row.label}</Paragraph>
                <Paragraph fontSize={14} fontWeight="bold" color={row.color}>{row.value}</Paragraph>
              </XStack>
              {i < arr.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </View>

        {/* Settings Menu */}
        <Paragraph fontSize={13} fontWeight="600" color={C.muted} marginBottom={10}>SETTINGS</Paragraph>
        <YStack gap={8} marginBottom={24}>
          {[
            { icon: <Bell color={C.primary} size={20} />, label: 'Notifications' },
            { icon: <ShieldAlert color={C.primary} size={20} />, label: 'Security & PIN' },
            { icon: <User color={C.primary} size={20} />, label: 'My Profile' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={s.row} activeOpacity={0.7}>
              <XStack gap={14} alignItems="center" flex={1}>
                <View style={s.iconWrap}>{item.icon}</View>
                <Paragraph fontSize={15} fontWeight="600" color={C.text}>{item.label}</Paragraph>
              </XStack>
              <ChevronRight size={16} color={C.muted} />
            </TouchableOpacity>
          ))}
        </YStack>

        <Button
          icon={<LogOut size={18} />}
          backgroundColor={C.errorBg}
          color={C.error}
          size="$4"
          borderRadius={12}
          onPress={() => router.replace('/')}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  profileCard: { backgroundColor: C.primary, borderRadius: 16, padding: 20, flexDirection: 'row',
    gap: 14, alignItems: 'center', marginBottom: 24 },
  badge: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, paddingHorizontal: 8,
    paddingVertical: 2, alignSelf: 'flex-start', marginTop: 2 },
  card: { backgroundColor: C.white, borderRadius: 14, borderWidth: 1, borderColor: C.border, paddingHorizontal: 14 },
  divider: { height: 1, backgroundColor: C.border },
  row: { backgroundColor: C.white, borderRadius: 12, padding: 14, flexDirection: 'row',
    alignItems: 'center', borderWidth: 1, borderColor: C.border },
  iconWrap: { backgroundColor: C.primaryLight, padding: 8, borderRadius: 10 },
})

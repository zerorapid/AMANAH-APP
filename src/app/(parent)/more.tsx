import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { YStack, XStack, Paragraph, Button, Avatar } from 'tamagui'
import { ShieldAlert, Bell, Settings, LogOut, CheckCircle, User, ChevronRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

const menuItems = [
  { icon: <CheckCircle color={C.orange} size={20} />, label: 'Approvals & Requests' },
  { icon: <ShieldAlert color={C.orange} size={20} />, label: 'Spending Controls' },
  { icon: <Bell color={C.orange} size={20} />, label: 'Notifications' },
  { icon: <User color={C.orange} size={20} />, label: 'My Profile' },
  { icon: <Settings color={C.orange} size={20} />, label: 'App Settings' },
]

export default function ParentMore() {
  const router = useRouter()
  const { parent } = useParentStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Profile Card */}
        <View style={s.profileCard}>
          <Avatar circular size="$6">
            <Avatar.Image src={parent.avatar} />
            <Avatar.Fallback backgroundColor={C.orangeLight} />
          </Avatar>
          <YStack flex={1} gap={2}>
            <Paragraph fontSize={18} fontWeight="bold" color={C.white}>{parent.name}</Paragraph>
            <Paragraph fontSize={13} color="rgba(255,255,255,0.8)">{parent.email}</Paragraph>
            <View style={s.badge}>
              <Paragraph fontSize={11} color={C.white} fontWeight="600">✓ Verified Parent</Paragraph>
            </View>
          </YStack>
        </View>

        {/* Menu */}
        <Paragraph fontSize={13} fontWeight="600" color={C.muted} marginBottom={10}>ACCOUNT</Paragraph>
        <YStack gap={8} marginBottom={24}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.label} style={s.row} activeOpacity={0.7}>
              <XStack gap={14} alignItems="center" flex={1}>
                <View style={s.iconWrap}>{item.icon}</View>
                <Paragraph fontSize={15} fontWeight="600" color={C.text}>{item.label}</Paragraph>
              </XStack>
              <ChevronRight size={16} color={C.muted} />
            </TouchableOpacity>
          ))}
        </YStack>

        {/* Logout */}
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
        <Paragraph fontSize={12} color={C.muted} textAlign="center" marginTop={12}>
          Amanah App · v1.0 · Light Mode
        </Paragraph>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  profileCard: { backgroundColor: C.orange, borderRadius: 16, padding: 20, flexDirection: 'row',
    gap: 14, alignItems: 'center', marginBottom: 24 },
  badge: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, paddingHorizontal: 8,
    paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4 },
  row: { backgroundColor: C.white, borderRadius: 12, padding: 14, flexDirection: 'row',
    alignItems: 'center', borderWidth: 1, borderColor: C.border },
  iconWrap: { backgroundColor: C.orangeLight, padding: 8, borderRadius: 10 },
})

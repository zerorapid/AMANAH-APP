import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { YStack, XStack, Paragraph, Button, Avatar } from 'tamagui'
import { Plus, ChevronRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function ParentChildren() {
  const { children } = useParentStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
          <Paragraph fontSize={20} fontWeight="bold" color={C.text}>Manage Children</Paragraph>
          <Button size="$3" icon={<Plus size={14} />} backgroundColor={C.primary} color="white" borderRadius={10}>
            Add Child
          </Button>
        </XStack>

        <Paragraph fontSize={13} fontWeight="600" color={C.muted} marginBottom={10}>
          ACTIVE ({children.length})
        </Paragraph>
        <YStack gap={10} marginBottom={24}>
          {children.map((child) => (
            <TouchableOpacity key={child.id} style={s.card} activeOpacity={0.7}>
              <XStack gap={12} alignItems="center">
                <Avatar circular size="$5">
                  <Avatar.Image src={child.avatar} />
                  <Avatar.Fallback backgroundColor={C.primaryLight} />
                </Avatar>
                <YStack flex={1}>
                  <Paragraph fontSize={16} fontWeight="bold" color={C.primary}>{child.name}</Paragraph>
                  <Paragraph fontSize={13} color={C.muted}>Monthly limit: ${child.monthlyLimit} SAR</Paragraph>
                  <Paragraph fontSize={12} color={child.paymentMode === 'auto' ? C.success : C.warning}>
                    {child.paymentMode === 'auto' ? 'Auto-Approved' : 'Approval Required'}
                  </Paragraph>
                </YStack>
                <YStack alignItems="flex-end" gap={4}>
                  <Paragraph fontSize={16} fontWeight="bold" color={C.text}>${child.balance} SAR</Paragraph>
                  <ChevronRight size={18} color={C.muted} />
                </YStack>
              </XStack>
            </TouchableOpacity>
          ))}
        </YStack>

        <Paragraph fontSize={13} fontWeight="600" color={C.muted} marginBottom={10}>
          PENDING INVITATIONS
        </Paragraph>
        <View style={[s.card, { backgroundColor: C.bg }]}>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              <Paragraph fontSize={15} fontWeight="bold" color={C.text}>Leo</Paragraph>
              <Paragraph fontSize={13} color={C.muted}>Invitation sent · Code: XYZ-789</Paragraph>
            </YStack>
            <Button size="$2" backgroundColor={C.primaryLight} color={C.primary}>Resend</Button>
          </XStack>
        </View>

        <TouchableOpacity style={s.addCard} activeOpacity={0.7}>
          <Plus size={20} color={C.primary} />
          <Paragraph fontSize={15} color={C.primary} fontWeight="600">Invite Another Child</Paragraph>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
  scroll: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: C.white, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: 14, marginBottom: 0 },
  addCard: { borderRadius: 14, borderWidth: 1.5, borderColor: C.primary, borderStyle: 'dashed',
    padding: 16, alignItems: 'center', flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 12 },
})

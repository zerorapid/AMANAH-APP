import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { YStack, XStack, Paragraph, Button, Avatar, Sheet, H2 } from "tamagui"
import { Plus, ChevronRight } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

import { useRouter } from 'expo-router'
import { useState } from 'react'
export default function ParentChildren() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { children } = useParentStore()

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
          <Paragraph fontSize={20} fontWeight="bold" color={C.text}>Manage Children</Paragraph>
          <Button onPress={() => alert("This feature is scheduled for backend integration in the next phase.")} size="$3" icon={<Plus size={14} />} backgroundColor={C.primary} color="white" borderRadius={10}>
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
            <Button onPress={() => alert("This feature is scheduled for backend integration in the next phase.")} size="$2" backgroundColor={C.primaryLight} color={C.primary}>Resend</Button>
          </XStack>
        </View>

        <TouchableOpacity style={s.addCard} activeOpacity={0.7}>
          <Plus size={20} color={C.primary} />
          <Paragraph fontSize={15} color={C.primary} fontWeight="600">Invite Another Child</Paragraph>
        </TouchableOpacity>
      
      {/* Add Child Sheet */}
      <Sheet modal open={open} onOpenChange={setOpen} snapPoints={[40]} dismissOnSnapToBottom>
        <Sheet.Overlay enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} backgroundColor="rgba(0,0,0,0.5)" />
        <Sheet.Frame padding={24} justifyContent="center" alignItems="center" backgroundColor={C.white} borderTopLeftRadius={24} borderTopRightRadius={24}>
          <Sheet.Handle backgroundColor={C.border} />
          <YStack gap={16} alignItems="center" marginTop={20} width="100%">
            <Paragraph fontSize={20} fontWeight="bold" color={C.text}>Invite Your Child</Paragraph>
            <Paragraph color={C.muted} textAlign="center">
              Give your child this unique code. They will enter it during their registration to link to your wallet.
            </Paragraph>
            <YStack backgroundColor={C.primaryLight} padding={20} borderRadius={16} width="100%" alignItems="center" marginTop={10}>
              <H2 fontWeight="bold" color={C.primary} letterSpacing={4}>XYZ-789</H2>
            </YStack>
            <Button marginTop={20} backgroundColor={C.primary} color="white" size="$5" borderRadius={14} width="100%" onPress={() => setOpen(false)}>
              Done
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>

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

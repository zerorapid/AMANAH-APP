import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { YStack, XStack, Paragraph, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Clock, Check, X } from 'lucide-react-native'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function ApprovalsQueue() {
  const router = useRouter()
  const { approvalRequests, approveRequest, declineRequest } = useParentStore()
  const pending = approvalRequests.filter(r => r.status === 'pending')

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8} marginBottom={24}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Pending Approvals</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Review requests from your children.</Paragraph>
        </YStack>

        {pending.length === 0 ? (
          <YStack padding={40} alignItems="center" gap={12} opacity={0.5}>
            <Check size={48} color={C.success} />
            <Paragraph color={C.muted}>You are all caught up!</Paragraph>
          </YStack>
        ) : (
          <YStack gap={12}>
            {pending.map(r => (
              <YStack key={r.id} style={s.card} gap={16}>
                <XStack justifyContent="space-between" alignItems="center">
                  <YStack flex={1}>
                    <Paragraph fontSize={16} fontWeight="bold" color={C.text}>{r.childName}</Paragraph>
                    <Paragraph fontSize={13} color={C.muted}>Requests {r.amount.toFixed(2)} SAR for {r.merchant}</Paragraph>
                  </YStack>
                  <Clock size={20} color={C.warning} />
                </XStack>
                <Paragraph fontSize={13} color={C.text} opacity={0.8} backgroundColor={C.bg} padding={12} borderRadius={8}>
                  "{r.reason}"
                </Paragraph>
                <XStack gap={12}>
                  <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} flex={1} backgroundColor={C.errorBg} color={C.error} borderRadius={8} icon={<X size={16}/>} onPress={() => declineRequest(r.id)}>Decline</Button>
                  <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} flex={1} backgroundColor={C.success} color="white" borderRadius={8} icon={<Check size={16}/>} onPress={() => approveRequest(r.id)}>Approve</Button>
                </XStack>
              </YStack>
            ))}
          </YStack>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: C.bg },
  card: { backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.border, padding: 16 }
})

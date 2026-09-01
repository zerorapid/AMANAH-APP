import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { YStack, XStack, Paragraph, Switch } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft } from 'lucide-react-native'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function ApprovalSettings() {
  const router = useRouter()
  const { children, updateChild } = useParentStore()

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 16 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8} marginBottom={24}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Approval Settings</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Choose which children require manual approval for purchases.</Paragraph>
        </YStack>

        <YStack gap={12}>
          {children.map(c => (
            <XStack key={c.id} style={s.card} justifyContent="space-between" alignItems="center">
              <YStack flex={1}>
                <Paragraph fontSize={16} fontWeight="bold" color={C.text}>{c.name}</Paragraph>
                <Paragraph fontSize={13} color={C.muted}>
                  {c.paymentMode === 'auto' ? 'Auto-approved up to limit' : 'Requires approval'}
                </Paragraph>
              </YStack>
              <Switch 
                size="$3" 
                checked={c.paymentMode === 'auto'} 
                onCheckedChange={(val) => updateChild(c.id, { paymentMode: val ? 'auto' : 'approval_required' })}
                backgroundColor={c.paymentMode === 'auto' ? C.success : C.border}
              >
                <Switch.Thumb backgroundColor="white" />
              </Switch>
            </XStack>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: C.bg },
  card: { backgroundColor: C.white, borderRadius: 8, borderWidth: 1, borderColor: C.border, padding: 16 }
})

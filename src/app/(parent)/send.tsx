import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { YStack, Paragraph, Button, Input, XStack } from 'tamagui'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, Send as SendIcon } from 'lucide-react-native'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'

export default function SendMoneyScreen() {
  const router = useRouter()
  const { parent, children, updateBalance, updateChild, addTransaction } = useParentStore()
  
  // Local state
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || '')

  const handleSend = () => {
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) return alert('Enter a valid amount')
    if (amt > parent.balance) return alert('Insufficient funds in master wallet')
    if (!selectedChildId) return alert('Select a child')

    const child = children.find(c => c.id === selectedChildId)
    if (!child) return
    
    // Wire to store
    updateBalance(-amt)
    updateChild(selectedChildId, { balance: child.balance + amt })
    addTransaction({
      id: Math.random().toString(),
      merchant: 'Transfer to ' + child.name,
      amount: -amt, // Parent perspective
      date: 'Just now',
      status: 'completed',
      category: 'transfer',
      childId: selectedChildId,
      icon: 'Send'
    })

    alert(`Successfully sent ${amt} SAR to ${child.name}`)
    router.back()
  }

  const activeChild = children.find(c => c.id === selectedChildId)

  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} paddingHorizontal={24} paddingTop={20} gap={24}>
        <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8 }}>
          <ChevronLeft size={28} color={C.text} />
        </TouchableOpacity>
        
        <YStack gap={8}>
          <Paragraph fontSize={26} fontWeight="bold" color={C.text}>Send Money</Paragraph>
          <Paragraph color={C.muted} fontSize={14}>Instantly transfer funds to your child's wallet.</Paragraph>
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Select Child</Paragraph>
          <View style={s.dropdown}>
            <Paragraph color={C.text}>{activeChild?.name || 'No child selected'} (Balance: {activeChild?.balance.toFixed(2)} SAR)</Paragraph>
          </View>
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Amount (SAR)</Paragraph>
          <Input keyboardType="numeric" placeholder="0.00" value={amount} onChangeText={setAmount} size="$6" fontSize={24} fontWeight="bold"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} focusStyle={{ borderColor: C.primary }} />
        </YStack>

        <YStack gap={8}>
          <Paragraph fontSize={13} fontWeight="600" color={C.text}>Note (Optional)</Paragraph>
          <Input placeholder="e.g. For lunch" value={note} onChangeText={setNote} size="$5"
            borderRadius={12} borderColor={C.border} backgroundColor={C.white} focusStyle={{ borderColor: C.primary }} />
        </YStack>

        <Button marginTop={16} backgroundColor={C.primary} color="white" size="$5" borderRadius={14}
          icon={<SendIcon size={18} />} onPress={handleSend}>
          Confirm Transfer
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: C.bg },
  dropdown: { backgroundColor: C.white, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 16 }
})

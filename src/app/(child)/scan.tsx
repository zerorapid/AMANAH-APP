import { StyleSheet, View } from 'react-native'
import { YStack, XStack, Paragraph, Button } from 'tamagui'
import { QrCode, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { C } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

type ScanState = 'idle' | 'scanned' | 'approved' | 'blocked' | 'insufficient' | 'pending'

const DEMO_MERCHANTS = [
  { name: "McDonald's", category: 'food', amount: 12, icon: '🍔' },
  { name: 'Steam Games', category: 'gaming', amount: 15, icon: '🎮' },
  { name: 'Amazon', category: 'shopping', amount: 25, icon: '🛒' },
]

export default function ChildScan() {
  const { child, validatePayment, addTransaction, sendRequest } = useChildStore()
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [merchant, setMerchant] = useState(DEMO_MERCHANTS[0])

  const simulateScan = () => {
    const m = DEMO_MERCHANTS[Math.floor(Math.random() * DEMO_MERCHANTS.length)]
    setMerchant(m)
    setScanState('scanned')
  }

  const handlePay = () => {
    const result = validatePayment(merchant.amount, merchant.category)
    if (result === 'approved') {
      addTransaction({
        id: Date.now().toString(),
        merchant: merchant.name,
        amount: -merchant.amount,
        date: 'Just now',
        status: 'completed',
        category: merchant.category,
        icon: merchant.icon,
      })
      setScanState('approved')
    } else if (result === 'blocked') {
      setScanState('blocked')
    } else if (result === 'insufficient_balance') {
      setScanState('insufficient')
    } else {
      sendRequest({
        id: Date.now().toString(),
        childId: child.id,
        childName: child.name,
        merchant: merchant.name,
        amount: merchant.amount,
        reason: 'Exceeds auto-approval limit',
        status: 'pending',
        createdAt: 'Just now',
      })
      setScanState('pending')
    }
  }

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <YStack flex={1} padding={20}>
        <Paragraph fontSize={20} fontWeight="bold" color={C.text} marginBottom={24}>Scan & Pay</Paragraph>

        {scanState === 'idle' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap={32}>
            <View style={s.qrBox}>
              <QrCode color={C.orange} size={72} />
              <Paragraph color={C.orangeDark} fontSize={14} textAlign="center" marginTop={12}>
                Point at a merchant QR code
              </Paragraph>
            </View>
            <Button backgroundColor={C.orange} color="white" size="$5" borderRadius={14} onPress={simulateScan}>
              Simulate Scan (Demo)
            </Button>
          </YStack>
        )}

        {scanState === 'scanned' && (
          <YStack flex={1} justifyContent="center" gap={20}>
            <View style={s.card}>
              <XStack gap={16} alignItems="center">
                <Paragraph fontSize={36}>{merchant.icon}</Paragraph>
                <YStack>
                  <Paragraph fontWeight="bold" fontSize={18} color={C.text}>{merchant.name}</Paragraph>
                  <Paragraph fontSize={14} color={C.muted}>
                    Category: {merchant.category} {child.restrictedCategories.includes(merchant.category) ? '🚫' : '✅'}
                  </Paragraph>
                </YStack>
              </XStack>
            </View>

            <YStack gap={8} alignItems="center" marginVertical={24}>
              <Paragraph color={C.muted} fontSize={15}>Amount to pay</Paragraph>
              <Paragraph color={C.orange} fontSize={48} fontWeight="bold">${merchant.amount.toFixed(2)}</Paragraph>
              <Paragraph fontSize={13} color={C.muted}>
                Daily limit: ${child.dailyLimit} · Balance: ${child.balance}
              </Paragraph>
            </YStack>

            <XStack gap={12} marginTop={16}>
              <Button flex={1} backgroundColor={C.bg} color={C.text} borderRadius={14} onPress={() => setScanState('idle')}>
                Cancel
              </Button>
              <Button flex={2} backgroundColor={C.orange} color="white" borderRadius={14} onPress={handlePay}>
                Confirm Pay
              </Button>
            </XStack>
          </YStack>
        )}

        {/* Results States */}
        {['approved', 'blocked', 'insufficient', 'pending'].includes(scanState) && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap={20}>
            {scanState === 'approved' && <CheckCircle color={C.success} size={90} />}
            {scanState === 'blocked' && <XCircle color={C.error} size={90} />}
            {scanState === 'insufficient' && <XCircle color={C.warning} size={90} />}
            {scanState === 'pending' && <AlertCircle color={C.orange} size={90} />}

            <Paragraph fontSize={22} fontWeight="bold" color={
              scanState === 'approved' ? C.success :
              scanState === 'blocked' ? C.error :
              scanState === 'insufficient' ? C.warning : C.orange
            }>
              {scanState === 'approved' && 'Payment Successful!'}
              {scanState === 'blocked' && 'Payment Blocked'}
              {scanState === 'insufficient' && 'Insufficient Balance'}
              {scanState === 'pending' && 'Approval Requested'}
            </Paragraph>

            <Paragraph color={C.muted} textAlign="center" fontSize={15} lineHeight={22} paddingHorizontal={20}>
              {scanState === 'approved' && `$${merchant.amount.toFixed(2)} paid to ${merchant.name}`}
              {scanState === 'blocked' && `${merchant.name} is in a restricted category (${merchant.category}).\nContact your parent to unlock.`}
              {scanState === 'insufficient' && `You need $${merchant.amount.toFixed(2)} but only have $${child.balance.toFixed(2)}.`}
              {scanState === 'pending' && `A request has been sent to your parent.\nYou'll be notified when they respond.`}
            </Paragraph>

            <Button backgroundColor={scanState === 'pending' ? C.orangeLight : C.orange}
                    color={scanState === 'pending' ? C.orange : 'white'}
                    size="$5" borderRadius={14} width="100%" marginTop={20}
                    onPress={() => setScanState('idle')}>
              {scanState === 'approved' ? 'Done' : scanState === 'pending' ? 'Cancel Request' : 'Go Back'}
            </Button>
          </YStack>
        )}
      </YStack>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.white },
  qrBox: { width: 240, height: 240, backgroundColor: C.orangeLight, borderRadius: 24, borderWidth: 2,
    borderColor: C.orange, borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: C.white, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 20 },
})

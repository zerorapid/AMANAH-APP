import { StyleSheet } from 'react-native'
import { YStack, XStack, H4, H2, Paragraph, Button, Card } from 'tamagui'
import { QrCode, CheckCircle, XCircle, AlertCircle } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { COLORS } from '../../constants/theme'
import { useChildStore } from '../../store/childStore'

type ScanState = 'idle' | 'scanned' | 'approved' | 'blocked' | 'insufficient' | 'pending'

// Demo merchants to simulate scanning
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
    // Pick a random merchant for demo
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
      // approval_required
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <YStack flex={1} padding="$4">
        <H4 color={COLORS.primary} marginBottom="$4">Scan & Pay</H4>

        {scanState === 'idle' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$6">
            <YStack
              width={240} height={240}
              backgroundColor={COLORS.primaryLight}
              borderRadius={20}
              borderWidth={2}
              borderColor={COLORS.primary}
              borderStyle="dashed"
              justifyContent="center"
              alignItems="center"
              gap="$2"
            >
              <QrCode color={COLORS.primary} size={72} />
              <Paragraph color={COLORS.textMuted} size="$3" textAlign="center">
                Point at a merchant QR code
              </Paragraph>
            </YStack>
            <Button backgroundColor={COLORS.primary} color="white" size="$5" onPress={simulateScan}>
              Simulate Scan (Demo)
            </Button>
          </YStack>
        )}

        {scanState === 'scanned' && (
          <YStack flex={1} justifyContent="center" gap="$4">
            <Card borderColor={COLORS.border} borderWidth={1} borderRadius={14} padding="$4">
              <XStack gap="$3" alignItems="center">
                <Paragraph fontSize={32}>{merchant.icon}</Paragraph>
                <YStack>
                  <Paragraph fontWeight="bold" fontSize={17} color={COLORS.text}>{merchant.name}</Paragraph>
                  <Paragraph size="$3" color={COLORS.textMuted}>
                    Category: {merchant.category} {child.restrictedCategories.includes(merchant.category) ? '🚫 Restricted' : '✅ Allowed'}
                  </Paragraph>
                </YStack>
              </XStack>
            </Card>

            <YStack gap="$1">
              <Paragraph color={COLORS.textMuted} size="$3">Amount</Paragraph>
              <H2 color={COLORS.primary}>${merchant.amount.toFixed(2)}</H2>
              <Paragraph size="$2" color={COLORS.textMuted}>
                Daily limit: ${child.dailyLimit} · Balance: ${child.balance}
              </Paragraph>
            </YStack>

            <XStack gap="$3" marginTop="$4">
              <Button flex={1} borderColor={COLORS.border} borderWidth={1} color={COLORS.text}
                onPress={() => setScanState('idle')}>
                Cancel
              </Button>
              <Button flex={2} backgroundColor={COLORS.primary} color="white" onPress={handlePay}>
                Pay ${merchant.amount.toFixed(2)}
              </Button>
            </XStack>
          </YStack>
        )}

        {scanState === 'approved' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <CheckCircle color={COLORS.success} size={90} />
            <H4 color={COLORS.success}>Payment Successful!</H4>
            <Paragraph color={COLORS.textMuted} textAlign="center">
              ${merchant.amount.toFixed(2)} paid to {merchant.name}
            </Paragraph>
            <Button backgroundColor={COLORS.primary} color="white" size="$5" onPress={() => setScanState('idle')}>
              Done
            </Button>
          </YStack>
        )}

        {scanState === 'blocked' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <XCircle color={COLORS.error} size={90} />
            <H4 color={COLORS.error}>Payment Blocked</H4>
            <Paragraph color={COLORS.textMuted} textAlign="center">
              {merchant.name} is in a restricted category ({merchant.category}).{'\n'}Contact your parent to unlock.
            </Paragraph>
            <Button backgroundColor={COLORS.primary} color="white" onPress={() => setScanState('idle')}>
              Go Back
            </Button>
          </YStack>
        )}

        {scanState === 'insufficient' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <XCircle color={COLORS.warning} size={90} />
            <H4 color={COLORS.warning}>Insufficient Balance</H4>
            <Paragraph color={COLORS.textMuted} textAlign="center">
              You need ${merchant.amount.toFixed(2)} but only have ${child.balance.toFixed(2)}.
            </Paragraph>
            <Button backgroundColor={COLORS.primary} color="white" onPress={() => setScanState('idle')}>
              Go Back
            </Button>
          </YStack>
        )}

        {scanState === 'pending' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <AlertCircle color={COLORS.primary} size={90} />
            <H4 color={COLORS.primary}>Approval Requested</H4>
            <Paragraph color={COLORS.textMuted} textAlign="center">
              A request has been sent to your parent.{'\n'}You'll be notified when they respond.
            </Paragraph>
            <Button backgroundColor={COLORS.primaryLight} color={COLORS.primary} onPress={() => setScanState('idle')}>
              Cancel Request
            </Button>
          </YStack>
        )}
      </YStack>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
})

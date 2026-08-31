import { YStack, H4, H2, Paragraph, Button, Card, XStack } from 'tamagui'
import { QrCode, CheckCircle, XCircle, AlertCircle } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

type ScanState = 'idle' | 'scanned' | 'approved' | 'blocked' | 'pending'

export default function ChildScan() {
  const [scanState, setScanState] = useState<ScanState>('idle')

  const simulateScan = () => {
    setScanState('scanned')
  }

  const handlePay = () => {
    // Simulate validation engine: amount $12 is within $20 daily limit → approved
    setScanState('approved')
  }

  const handleRequestApproval = () => {
    setScanState('pending')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <YStack flex={1} padding="$4">
        <H4 color="$color9" marginBottom="$4">Scan & Pay</H4>

        {scanState === 'idle' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$6">
            <YStack
              width={240} height={240}
              backgroundColor="$color2"
              borderRadius="$6"
              borderWidth={2}
              borderColor="$color9"
              borderStyle="dashed"
              justifyContent="center"
              alignItems="center"
            >
              <QrCode color="$color9" size={80} />
              <Paragraph color="$color" marginTop="$3">Point camera at QR code</Paragraph>
            </YStack>
            <Button backgroundColor="$color9" color="white" size="$5" onPress={simulateScan}>
              Simulate Scan (Demo)
            </Button>
          </YStack>
        )}

        {scanState === 'scanned' && (
          <YStack flex={1} justifyContent="center" gap="$4">
            <Card borderColor="$borderColor" borderRadius="$4" padding="$4">
              <YStack gap="$3">
                <Paragraph fontWeight="bold" color="$color9">Merchant Detected</Paragraph>
                <Paragraph color="$color">McDonald's</Paragraph>
                <Paragraph size="$2" color="$color" opacity={0.7}>Category: Food & Dining ✅ Allowed</Paragraph>
              </YStack>
            </Card>

            <YStack gap="$2">
              <Paragraph color="$color">Amount</Paragraph>
              <H2 color="$color9">$12.00</H2>
              <Paragraph size="$2" color="$color" opacity={0.7}>Within daily limit ($20.00 remaining)</Paragraph>
            </YStack>

            <XStack gap="$3" marginTop="$4">
              <Button flex={1} variant="outlined" borderColor="$borderColor" color="$color" onPress={() => setScanState('idle')}>
                Cancel
              </Button>
              <Button flex={2} backgroundColor="$color9" color="white" onPress={handlePay}>
                Pay $12.00
              </Button>
            </XStack>
          </YStack>
        )}

        {scanState === 'approved' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <CheckCircle color="green" size={80} />
            <H4 color="green">Payment Successful!</H4>
            <Paragraph color="$color" textAlign="center">$12.00 paid to McDonald's</Paragraph>
            <Button backgroundColor="$color9" color="white" onPress={() => setScanState('idle')}>
              Done
            </Button>
          </YStack>
        )}

        {scanState === 'blocked' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <XCircle color="red" size={80} />
            <H4 color="red">Payment Blocked</H4>
            <Paragraph color="$color" textAlign="center">This merchant or category is restricted by your parent.</Paragraph>
            <Button backgroundColor="$color9" color="white" onPress={() => setScanState('idle')}>
              Go Back
            </Button>
          </YStack>
        )}

        {scanState === 'pending' && (
          <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
            <AlertCircle color="$color9" size={80} />
            <H4 color="$color9">Waiting for Parent</H4>
            <Paragraph color="$color" textAlign="center">A request has been sent to your parent for approval.</Paragraph>
            <Button backgroundColor="$color3" color="$color9" onPress={() => setScanState('idle')}>
              Cancel Request
            </Button>
          </YStack>
        )}
      </YStack>
    </SafeAreaView>
  )
}

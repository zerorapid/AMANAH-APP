import { ScrollView } from 'react-native'
import { YStack, XStack, H4, Paragraph, Button, Card } from 'tamagui'
import { QrCode, CreditCard, ArrowRightLeft } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ParentPayments() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <H4 color="$color9" marginBottom="$4">Payments & Transfers</H4>
        
        <YStack gap="$4">
          <Card size="$4" borderColor="$borderColor" padding="$4" borderRadius="$4">
            <XStack gap="$4" alignItems="center">
              <YStack backgroundColor="$color3" padding="$3" borderRadius="$10">
                <QrCode color="$color9" size={24} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" color="$color9">Scan & Pay</Paragraph>
                <Paragraph size="$2" color="$color">Pay a merchant via QR code</Paragraph>
              </YStack>
            </XStack>
          </Card>

          <Card size="$4" borderColor="$borderColor" padding="$4" borderRadius="$4">
            <XStack gap="$4" alignItems="center">
              <YStack backgroundColor="$color3" padding="$3" borderRadius="$10">
                <ArrowRightLeft color="$color9" size={24} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" color="$color9">Send Money</Paragraph>
                <Paragraph size="$2" color="$color">Transfer funds to your children</Paragraph>
              </YStack>
            </XStack>
          </Card>

          <Card size="$4" borderColor="$borderColor" padding="$4" borderRadius="$4">
            <XStack gap="$4" alignItems="center">
              <YStack backgroundColor="$color3" padding="$3" borderRadius="$10">
                <CreditCard color="$color9" size={24} />
              </YStack>
              <YStack flex={1}>
                <Paragraph fontWeight="bold" color="$color9">Funding Sources</Paragraph>
                <Paragraph size="$2" color="$color">Manage linked bank accounts</Paragraph>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

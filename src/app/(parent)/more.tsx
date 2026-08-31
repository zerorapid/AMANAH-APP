import { ScrollView } from 'react-native'
import { YStack, XStack, H4, Paragraph, Card, Button } from 'tamagui'
import { ShieldAlert, Bell, Settings, LogOut, CheckCircle } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function ParentMore() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <H4 color="$color9" marginBottom="$4">More Options</H4>
        
        <YStack gap="$4" marginBottom="$6">
          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <CheckCircle color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">Approvals & Requests</Paragraph>
            </XStack>
          </Card>

          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <ShieldAlert color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">Spending Controls</Paragraph>
            </XStack>
          </Card>

          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <Bell color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">Notifications</Paragraph>
            </XStack>
          </Card>

          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <Settings color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">App Settings</Paragraph>
            </XStack>
          </Card>
        </YStack>

        <Button 
          icon={<LogOut size={18} />} 
          variant="outlined" 
          borderColor="red" 
          color="red"
          onPress={() => router.replace('/')}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

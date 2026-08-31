import { ScrollView } from 'react-native'
import { YStack, XStack, H4, Paragraph, Button, Card, Avatar } from 'tamagui'
import { Bell, ShieldAlert, LogOut, User } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function ChildMore() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Profile */}
        <XStack gap="$4" alignItems="center" marginBottom="$6" padding="$4" backgroundColor="$color2" borderRadius="$4">
          <Avatar circular size="$5">
            <Avatar.Image src="https://i.pravatar.cc/150?u=alex" />
            <Avatar.Fallback backgroundColor="$color5" />
          </Avatar>
          <YStack>
            <H4 color="$color9">Alex</H4>
            <Paragraph size="$2" color="$color">Parent: John Doe</Paragraph>
          </YStack>
        </XStack>

        <H4 color="$color" marginBottom="$3">My Limits (View Only)</H4>
        <Card borderColor="$borderColor" borderRadius="$4" padding="$4" marginBottom="$6">
          <YStack gap="$3">
            <XStack justifyContent="space-between">
              <Paragraph color="$color">Daily Limit</Paragraph>
              <Paragraph color="$color9" fontWeight="bold">$20.00</Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph color="$color">Monthly Limit</Paragraph>
              <Paragraph color="$color9" fontWeight="bold">$150.00</Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph color="$color">Restricted</Paragraph>
              <Paragraph color="red" fontWeight="bold">Gaming, Adult</Paragraph>
            </XStack>
            <XStack justifyContent="space-between">
              <Paragraph color="$color">Payment Mode</Paragraph>
              <Paragraph color="green" fontWeight="bold">Auto-Approved</Paragraph>
            </XStack>
          </YStack>
        </Card>

        <H4 color="$color" marginBottom="$3">Settings</H4>
        <YStack gap="$3" marginBottom="$6">
          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <Bell color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">Notifications</Paragraph>
            </XStack>
          </Card>

          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <ShieldAlert color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">Security & PIN</Paragraph>
            </XStack>
          </Card>

          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center">
              <User color="$color9" size={20} />
              <Paragraph fontWeight="bold" color="$color9">My Profile</Paragraph>
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

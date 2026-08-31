import { ScrollView } from 'react-native'
import { YStack, XStack, H4, Paragraph, Button, Card, Avatar, Separator } from 'tamagui'
import { Plus, ChevronRight, Settings } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ParentChildren() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <H4 color="$color9">Manage Children</H4>
          <Button size="$3" icon={<Plus size={16} />} backgroundColor="$color9" color="white">Add Child</Button>
        </XStack>

        <YStack gap="$4" marginBottom="$6">
          <Paragraph color="$color" size="$3" fontWeight="bold">Active</Paragraph>
          
          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center" justifyContent="space-between">
              <XStack gap="$3" alignItems="center">
                <Avatar circular size="$4">
                  <Avatar.Image src="https://i.pravatar.cc/150?u=child1" />
                  <Avatar.Fallback backgroundColor="$color5" />
                </Avatar>
                <YStack>
                  <Paragraph fontWeight="bold" color="$color9">Alex</Paragraph>
                  <Paragraph size="$2" color="$color">Monthly Limit: $150.00</Paragraph>
                </YStack>
              </XStack>
              <ChevronRight size={20} color="$color" />
            </XStack>
          </Card>

          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4">
            <XStack gap="$3" alignItems="center" justifyContent="space-between">
              <XStack gap="$3" alignItems="center">
                <Avatar circular size="$4">
                  <Avatar.Image src="https://i.pravatar.cc/150?u=child2" />
                  <Avatar.Fallback backgroundColor="$color5" />
                </Avatar>
                <YStack>
                  <Paragraph fontWeight="bold" color="$color9">Sarah</Paragraph>
                  <Paragraph size="$2" color="$color">Monthly Limit: $100.00</Paragraph>
                </YStack>
              </XStack>
              <ChevronRight size={20} color="$color" />
            </XStack>
          </Card>
        </YStack>

        <Separator borderColor="$borderColor" marginBottom="$6" />

        <YStack gap="$4">
          <Paragraph color="$color" size="$3" fontWeight="bold">Pending Invitations</Paragraph>
          <Card size="$3" borderColor="$borderColor" padding="$3" borderRadius="$4" backgroundColor="$color2">
            <XStack gap="$3" alignItems="center" justifyContent="space-between">
              <YStack>
                <Paragraph fontWeight="bold" color="$color">Leo (Invitation Sent)</Paragraph>
                <Paragraph size="$2" color="$color" opacity={0.7}>Code: XYZ-789</Paragraph>
              </YStack>
              <Button size="$2" variant="outlined" borderColor="$color" color="$color">Resend</Button>
            </XStack>
          </Card>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

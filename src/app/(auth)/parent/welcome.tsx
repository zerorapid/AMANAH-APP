import { StyleSheet } from 'react-native'
import { YStack, Paragraph, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { Users } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../../constants/theme'

export default function ParentWelcome() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1} justifyContent="center" alignItems="center" paddingHorizontal={24} gap={16}>
      <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 8 }}>
        <ChevronLeft size={28} color={C.text} />
      </TouchableOpacity>
        <YStack width={80} height={80} borderRadius={22} backgroundColor={C.primary}
          justifyContent="center" alignItems="center">
          <Users size={36} color="white" />
        </YStack>
        <Paragraph fontSize={26} fontWeight="bold" color={C.text} textAlign="center">
          Parent Account
        </Paragraph>
        <Paragraph color={C.muted} textAlign="center" fontSize={15} lineHeight={22}>
          Take control of your family's finances. Set allowances, limits, and approve your children's spending.
        </Paragraph>
        <Button pressStyle={{ scale: 0.97, opacity: 0.9 }}
          marginTop={16}
          width="100%"
          backgroundColor={C.primary}
          color="white"
          size="$5"
          borderRadius={6}
          onPress={() => router.push('/(auth)/parent/register')}
        >
          Get Started
        </Button>
        <Button pressStyle={{ scale: 0.97, opacity: 0.9 }}
          width="100%"
          backgroundColor="transparent"
          color={C.primary}
          size="$4"
          borderRadius={6}
          borderWidth={1.5}
          borderColor={C.primary}
          onPress={() => router.push('/(parent)')}
        >
          Skip (Demo)
        </Button>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ container: { flex: 1, backgroundColor: C.white } })

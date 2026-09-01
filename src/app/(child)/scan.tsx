import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { YStack, Paragraph, Button } from 'tamagui'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft, ScanLine } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function ScannerScreen() {
  const router = useRouter()
  return (
    <SafeAreaView style={s.container}>
      <YStack flex={1}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
            <ChevronLeft size={28} color="white" />
          </TouchableOpacity>
          <Paragraph fontSize={20} fontWeight="bold" color="white" flex={1} textAlign="center" marginRight={40}>
            Scan & Pay
          </Paragraph>
        </View>

        <View style={s.cameraSim}>
          <View style={s.frame}>
            <ScanLine size={120} color={C.primary} opacity={0.8} />
          </View>
          <Paragraph color="white" marginTop={24} fontSize={16}>Align QR Code within the frame</Paragraph>
        </View>

        <View style={s.footer}>
          <Button pressStyle={{ scale: 0.97, opacity: 0.8 }} backgroundColor={C.primary} color="white" size="$5" borderRadius={6} onPress={() => {
            alert('Scan successful! Payment processing...');
            router.back();
          }}>
            Simulate Scan (Web/Mock)
          </Button>
        </View>
      </YStack>
    </SafeAreaView>
  )
}
const s = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: 'black' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 20, zIndex: 10 },
  cameraSim: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  frame: { width: 250, height: 250, borderWidth: 4, borderColor: C.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  footer: { padding: 24, paddingBottom: 40, backgroundColor: 'black' }
})

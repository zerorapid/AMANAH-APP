import { Tabs } from 'expo-router'
import { Wallet, QrCode, Activity, Menu } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function ChildLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: C.orange,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: { borderTopColor: C.border, backgroundColor: C.white }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Wallet', tabBarIcon: ({ color }) => <Wallet color={color as string} size={22} /> }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan & Pay', tabBarIcon: ({ color }) => <QrCode color={color as string} size={22} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color }) => <Activity color={color as string} size={22} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Menu color={color as string} size={22} /> }} />
    </Tabs>
  )
}

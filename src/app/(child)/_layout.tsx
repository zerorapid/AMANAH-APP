import { Tabs } from 'expo-router'
import { Wallet, QrCode, Activity, Menu } from '@tamagui/lucide-icons'

export default function ChildLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: true,
        tabBarActiveTintColor: '#FF6B00',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Wallet', tabBarIcon: ({ color }) => <Wallet color={color as string} /> }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan & Pay', tabBarIcon: ({ color }) => <QrCode color={color as string} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color }) => <Activity color={color as string} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Menu color={color as string} /> }} />
    </Tabs>
  )
}

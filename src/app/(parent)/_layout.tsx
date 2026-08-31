import { Tabs } from 'expo-router'
import { Home, Users, CreditCard, Activity, Settings } from '@tamagui/lucide-icons'

export default function ParentLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: true,
        tabBarActiveTintColor: '#FF6B00',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ color }) => <Home color={color as string} /> }} />
      <Tabs.Screen name="children" options={{ title: 'Children', tabBarIcon: ({ color }) => <Users color={color as string} /> }} />
      <Tabs.Screen name="payments" options={{ title: 'Payments', tabBarIcon: ({ color }) => <CreditCard color={color as string} /> }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transactions', tabBarIcon: ({ color }) => <Activity color={color as string} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Settings color={color as string} /> }} />
    </Tabs>
  )
}

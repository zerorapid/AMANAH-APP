import { Tabs } from 'expo-router'
import { Home, Users, CreditCard, Activity, Settings } from 'lucide-react-native'
import { C } from '../../constants/theme'

export default function ParentLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: { borderTopColor: C.border, backgroundColor: C.white }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Dashboard', tabBarIcon: ({ color }) => <Home color={color as string} size={22} /> }} />
      <Tabs.Screen name="children" options={{ title: 'Children', tabBarIcon: ({ color }) => <Users color={color as string} size={22} /> }} />
      <Tabs.Screen name="payments" options={{ title: 'Payments', tabBarIcon: ({ color }) => <CreditCard color={color as string} size={22} /> }} />
      <Tabs.Screen name="transactions" options={{ title: 'Activity', tabBarIcon: ({ color }) => <Activity color={color as string} size={22} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Settings color={color as string} size={22} /> }} />
    </Tabs>
  )
}

import { Tabs } from 'expo-router'
import { Home, Users, CreditCard, Activity, Settings } from 'lucide-react-native'
import { Platform } from 'react-native'
import { C } from '../../constants/theme'

export default function ParentLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: { 
          borderTopColor: C.border, 
          backgroundColor: C.white,
          height: Platform.OS === 'web' ? 65 : 85,
          paddingBottom: Platform.OS === 'web' ? 10 : 25,
          paddingTop: 10
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Home color={color as string} size={24} /> }} />
      <Tabs.Screen name="children" options={{ title: 'Children', tabBarIcon: ({ color }) => <Users color={color as string} size={24} /> }} />
      <Tabs.Screen name="payments" options={{ title: 'Payments', tabBarIcon: ({ color }) => <CreditCard color={color as string} size={24} /> }} />
      <Tabs.Screen name="transactions" options={{ title: 'Activity', tabBarIcon: ({ color }) => <Activity color={color as string} size={24} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Settings color={color as string} size={24} /> }} />
      
      {/* HIDDEN SUB-PAGES */}
      <Tabs.Screen name="send" options={{ href: null }} />
      <Tabs.Screen name="top-up" options={{ href: null }} />
      <Tabs.Screen name="scan" options={{ href: null }} />
      <Tabs.Screen name="approvals" options={{ href: null }} />
      <Tabs.Screen name="approval-settings" options={{ href: null }} />
      <Tabs.Screen name="child-details" options={{ href: null }} />
      <Tabs.Screen name="settings-app" options={{ href: null }} />
      <Tabs.Screen name="settings-notifications" options={{ href: null }} />
      <Tabs.Screen name="settings-profile" options={{ href: null }} />
      <Tabs.Screen name="settings-security" options={{ href: null }} />
    </Tabs>
  )
}

import { Tabs } from 'expo-router'
import { Wallet, QrCode, Activity, Menu } from 'lucide-react-native'
import { Platform } from 'react-native'
import { C } from '../../constants/theme'

export default function ChildLayout() {
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
      <Tabs.Screen name="index" options={{ title: 'Wallet', tabBarIcon: ({ color }) => <Wallet color={color as string} size={24} /> }} />
      <Tabs.Screen name="scan" options={{ title: 'Scan & Pay', tabBarIcon: ({ color }) => <QrCode color={color as string} size={24} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color }) => <Activity color={color as string} size={24} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color }) => <Menu color={color as string} size={24} /> }} />
      
      {/* HIDDEN SUB-PAGES */}
      <Tabs.Screen name="request" options={{ href: null }} />
      <Tabs.Screen name="settings-notifications" options={{ href: null }} />
      <Tabs.Screen name="settings-profile" options={{ href: null }} />
      <Tabs.Screen name="settings-security" options={{ href: null }} />
    </Tabs>
  )
}

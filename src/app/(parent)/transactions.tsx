import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { YStack, XStack, Paragraph } from 'tamagui'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { C } from '../../constants/theme'
import { useParentStore } from '../../store/parentStore'
import { ShoppingCart, Wallet, Gamepad2, HelpCircle } from "lucide-react-native"

const getIcon = (name?: string) => {
  switch(name) {
    case "ShoppingCart": return <ShoppingCart size={24} color={C.text} />;
    case "Wallet": return <Wallet size={24} color={C.text} />;
    case "Gamepad2": return <Gamepad2 size={24} color={C.text} />;
    default: return <HelpCircle size={24} color={C.text} />;
  }
};

export default function Transactions() {
  const { transactions } = useParentStore()
  const [activeTab, setActiveTab] = useState('All')
  
  const tabs = ['All', 'Completed', 'Blocked']
  
  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'All') return true;
    return tx.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Paragraph fontSize={20} fontWeight="bold" color={C.text} marginBottom={16}>Transactions</Paragraph>
        
        {/* Tabs */}
        <XStack gap={10} marginBottom={20}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} activeOpacity={0.7}>
              <View style={[s.tab, activeTab === tab && s.tabActive]}>
                <Paragraph fontSize={14} fontWeight="600" color={activeTab === tab ? C.white : C.muted}>
                  {tab}
                </Paragraph>
              </View>
            </TouchableOpacity>
          ))}
        </XStack>

        <YStack gap={8}>
          {filteredTransactions.length === 0 ? (
            <YStack padding={40} alignItems="center" gap={12} opacity={0.5}>
              <HelpCircle size={48} color={C.muted} />
              <Paragraph color={C.muted}>No {activeTab.toLowerCase()} transactions found.</Paragraph>
            </YStack>
          ) : (
            filteredTransactions.map((tx) => (
              <View key={tx.id} style={s.card}>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack gap={12} alignItems="center" flex={1}>
                    {getIcon(tx.icon)}
                    <YStack flex={1}>
                      <Paragraph fontSize={15} fontWeight="bold" color={C.text}>{tx.merchant}</Paragraph>
                      <Paragraph fontSize={12} color={C.muted}>{tx.date}</Paragraph>
                      {tx.status === 'blocked' && (
                        <Paragraph fontSize={12} color={C.error} fontWeight="bold">Blocked</Paragraph>
                      )}
                    </YStack>
                  </XStack>
                  <Paragraph fontSize={15} fontWeight="bold"
                    color={tx.amount > 0 ? C.success : tx.status === 'blocked' ? C.error : C.text}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}{Math.abs(tx.amount).toFixed(2)} SAR
                  </Paragraph>
                </XStack>
              </View>
            ))
          )}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: C.cardBg, borderRadius: 8, borderWidth: 1, borderColor: C.border, padding: 14 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: C.primaryLight },
  tabActive: { backgroundColor: C.primary }
})

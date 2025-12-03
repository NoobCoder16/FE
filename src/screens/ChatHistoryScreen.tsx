// src/screens/ChatHistoryScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Users,
  Clock,
  MoreHorizontal,
} from 'lucide-react-native';
import { conversationApi } from '../api/Services';
import { ConversationHistoryItem } from '../types/api';

type Props = {
  navigation: any;
};

export default function ChatHistoryScreen({ navigation }: Props) {
  const [chats, setChats] = useState<ConversationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await conversationApi.getHistory();
      if (res.data.success && res.data.data) {
        setChats(res.data.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', '대화 내역을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePressItem = (item: ConversationHistoryItem) => {
    // 여기서 특정 대화 id를 회화 스크립트 화면으로 넘김
    navigation.navigate('Script', { chatId: item.sessionId });
  };

  const handleClearAll = async () => {
    Alert.alert(
      '대화 내역 삭제',
      '모든 대화 내역을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await conversationApi.deleteAllConversations();
              setChats([]);
              Alert.alert('완료', '모든 대화 내역이 삭제되었습니다.');
            } catch (error) {
              console.error(error);
              Alert.alert('Error', '삭제 중 오류가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: ConversationHistoryItem }) => (
    <Pressable style={styles.card} onPress={() => handlePressItem(item)}>
      <View style={styles.cardInner}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.cardMetaRow}>
          <View style={styles.metaGroup}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.messageCount} msgs</Text>
          </View>

          <View style={[styles.metaGroup, { marginLeft: 12 }]}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>

          <View style={{ flex: 1 }} />

          <MoreHorizontal size={18} color="#9CA3AF" />
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#111827" />
          </Pressable>
          <Text style={styles.headerTitle}>대화 내역</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 상단 타이틀 + 서브텍스트 */}
        <View style={styles.titleBlock}>
          <Text style={styles.chatsLabel}>Chats ({chats.length})</Text>
        </View>

        {/* 리스트 */}
        {loading ? (
          <ActivityIndicator size="large" color="#2c303c" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.sessionId}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#6B7280' }}>
                대화 내역이 없습니다.
              </Text>
            }
          />
        )}

        {/* 하단 "대화 내역 비우기" 버튼 */}
        <View style={styles.bottom}>
          <Pressable style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearButtonText}>대화 내역 비우기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },
  root: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    backgroundColor: '#E5E7ED',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  titleBlock: {
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  chatsLabel: {
    fontSize: 14,
    color: '#6B7280',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
    rowGap: 10,
  },

  card: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardInner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
  },

  bottom: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  clearButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(191, 195, 208, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#111827',
  },
});

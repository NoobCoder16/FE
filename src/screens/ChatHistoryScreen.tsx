// src/screens/ChatHistoryScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Users,
  Clock,
  MoreHorizontal,
} from 'lucide-react-native';

type ChatItem = {
  id: string;
  title: string;
  turns: number;      // 대화 턴 수
  timeAgo: string;    // "5 min ago" 같은 표시
};

// 일단 더미 데이터 (백엔드 붙이면 여기만 서버 데이터로 교체)
const MOCK_CHATS: ChatItem[] = [
  { id: '1', title: 'In the public places', turns: 13, timeAgo: '5 min ago' },
  { id: '2', title: 'What is the reason of...', turns: 4, timeAgo: '22 min ago' },
  { id: '3', title: 'How are you feeling t...', turns: 20, timeAgo: '1 hr ago' },
  { id: '4', title: 'Hi, How can I help yo...', turns: 18, timeAgo: '2 hrs ago' },
  { id: '5', title: 'What is the point of li...', turns: 7, timeAgo: '2 hrs ago' },
  { id: '6', title: "Go shawty It's your bi...", turns: 12, timeAgo: '3 hrs ago' },
];

type Props = {
  navigation: any;
};

export default function ChatHistoryScreen({ navigation }: Props) {
  const handleBack = () => {
    navigation.goBack();
  };

  const handlePressItem = (item: ChatItem) => {
    // 여기서 특정 대화 id를 회화 스크립트 화면으로 넘김
    navigation.navigate('Script', { chatId: item.id });
  };

  const handleClearAll = () => {
    // TODO: 백엔드에 전체 삭제 API 호출 + 상태 초기화
    // 일단은 alert 정도만
    // Alert.alert('알림', '대화 내역 비우기 기능은 백엔드 연동 후 구현 예정입니다.');
  };

  const renderItem = ({ item }: { item: ChatItem }) => (
    <Pressable style={styles.card} onPress={() => handlePressItem(item)}>
      <View style={styles.cardInner}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.cardMetaRow}>
          <View style={styles.metaGroup}>
            <Users size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.turns}</Text>
          </View>

          <View style={[styles.metaGroup, { marginLeft: 12 }]}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.timeAgo}</Text>
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
          <Text style={styles.chatsLabel}>Chats ({MOCK_CHATS.length})</Text>
        </View>

        {/* 리스트 */}
        <FlatList
          data={MOCK_CHATS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

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

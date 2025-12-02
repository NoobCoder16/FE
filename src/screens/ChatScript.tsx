// src/screens/ScriptScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ChatScreen과 동일한 타입 정의 (저장된 데이터 구조)
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'model'; // model은 gemini role
  content: string;
};

// 화면에 표시할 포맷 (변환 후)
type DisplayMessage = {
  id: string;
  role: 'user' | 'assistant';
  name: string;
  text: string;
};

export default function ScriptScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [scriptData, setScriptData] = useState<DisplayMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('last_chat_history');

        if (jsonValue != null) {
          const parsedData: ChatMessage[] = JSON.parse(jsonValue);

          const formattedData: DisplayMessage[] = parsedData.map((msg) => ({
            id: msg.id,
            role: msg.role === 'user' ? 'user' : 'assistant', // model -> assistant 통합
            name: msg.role === 'user' ? 'Me' : 'Brainbox',
            text: msg.content,
          }));

          setScriptData(formattedData);
        } else {
          console.log('저장된 대화가 없습니다.');
        }
      } catch (e) {
        console.error('데이터 불러오기 실패', e);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
  }, []);

  const renderItem = ({ item }: { item: DisplayMessage }) => {
    const isUser = item.role === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userContainer : styles.aiContainer,
        ]}
      >
        <Text style={styles.nameLabel}>{item.name}</Text>
        <View
          style={[
            styles.bubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.aiText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  // 로딩 화면
  if (loading) {
    return (
      <SafeAreaView
        style={styles.safeArea}
        edges={['left', 'right', 'bottom']} // top은 insets.top으로 처리
      >
        <View
          style={[
            styles.root,
            { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ActivityIndicator size="large" color="#2C303C" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']} // top은 insets.top으로 처리
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.gradientBg} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <ChevronLeft color="#000" size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>대화 스크립트</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* 데이터 없을 경우 */}
        {scriptData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>저장된 대화 내역이 없습니다.</Text>
          </View>
        ) : (
          <FlatList
            data={scriptData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
  },
  gradientBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7ED',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  iconButton: {
    padding: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  nameLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  bubble: {
    padding: 14,
    borderRadius: 16,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2C303C',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  aiText: {
    color: '#000',
  },
  userText: {
    color: '#D5D8E0',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  closeButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#2C303C',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

// src/screens/ChatScreen.tsx
import PandaIcon from '../components/PandaIcon';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft, Send, Mic, Eye, Lightbulb, X } from 'lucide-react-native'; // 아이콘 추가
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ API KEY 설정
const GEMINI_API_KEY = '여기에_실제_API_KEY_입력';

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// === [API 호출 함수들] ===

// 1. 기본 대화 (기존 함수)
async function callGemini(historyForGemini: any[], prompt: string): Promise<string> {
  const contents = [...historyForGemini, { role: 'user', parts: [{ text: prompt }] }];
  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 500 } }),
  });
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? '').join('') ?? '';
}

// 2. 문법 피드백 요청 함수
async function getGrammarFeedback(userText: string): Promise<string> {
  const prompt = `
    Analyze the following English sentence written by a Korean student: "${userText}"
    1. Correct any grammar errors naturally.
    2. Explain the correction in Korean.
    3. If it's perfect, say "완벽한 문장입니다!" and explain why it's good.
    Output format:
    [Corrected]: (sentence)
    [Explanation]: (Korean explanation)
  `;
  
  // 히스토리 없이 단발성 요청
  return await callGemini([], prompt); 
}

// 3. 답변 추천 요청 함수
async function getReplySuggestions(aiText: string): Promise<string> {
  const prompt = `
    The AI tutor said: "${aiText}"
    Suggest 3 natural English responses for a student.
    Include Korean translations.
    Format:
    1. English sentence (Korean meaning)
    2. English sentence (Korean meaning)
    3. English sentence (Korean meaning)
  `;
  return await callGemini([], prompt);
}

// === [타입 정의] ===
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  // 추가된 필드: 피드백 및 추천 기능용
  feedback?: string | null;     // 문법 피드백 내용
  suggestion?: string | null;   // 답변 추천 내용
  isLoadingExtra?: boolean;     // 피드백/추천 로딩 중 여부
};

type RootStackParamList = {
  Home: undefined;
  Chat: { mode?: string };
};

export default function ChatScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();

  const initialMode = route.params?.mode || 'casual';
  const [mode, setMode] = useState(initialMode);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! How are you today? Let's practice English!",
      suggestion: null, 
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 스크롤 및 저장 로직
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
    const saveChatHistory = async () => {
      try {
        if (messages.length > 0) {
          await AsyncStorage.setItem('last_chat_history', JSON.stringify(messages));
        }
      } catch (e) {
        console.error(e);
      }
    };
    saveChatHistory();
  }, [messages]);

  // === [이벤트 핸들러] ===

  // A. 문법 피드백 요청 (User 메시지용)
  const handleRequestFeedback = async (messageId: string, content: string) => {
    // 로딩 상태 시작
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isLoadingExtra: true } : msg));

    try {
      const result = await getGrammarFeedback(content);
      // 결과 업데이트
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, feedback: result, isLoadingExtra: false } : msg));
    } catch {
      Alert.alert('Error', '피드백을 불러오지 못했습니다.');
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isLoadingExtra: false } : msg));
    }
  };

  // B. 답변 추천 요청 (Assistant 메시지용)
  const handleRequestSuggestion = async (messageId: string, content: string) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isLoadingExtra: true } : msg));

    try {
      const result = await getReplySuggestions(content);
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, suggestion: result, isLoadingExtra: false } : msg));
    } catch {
      Alert.alert('Error', '추천 답변을 불러오지 못했습니다.');
      setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, isLoadingExtra: false } : msg));
    }
  };

  // C. 피드백/추천 닫기
  const handleCloseExtra = (messageId: string, type: 'feedback' | 'suggestion') => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, [type]: null } : msg));
  };

  // D. 모드 변경
  const handleModeChange = () => {
    Alert.alert('회화 스타일 선택', '사용할 영어 스타일을 선택하세요.', [
      { text: '😊 Casual', onPress: () => setMode('casual') },
      { text: '🎩 Formal', onPress: () => setMode('formal') },
      { text: '취소', style: 'cancel' },
    ]);
  };

  // E. 메시지 전송
  const handleFormSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const historyForGemini = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));
      const prompt = `${input}\n\n(Reply in a ${mode} tone suitable for English learning. Concise.)`;
      const responseText = await callGemini(historyForGemini, prompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get response.');
    } finally {
      setIsLoading(false);
    }
  };

  // === [렌더링 함수] ===
  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';

    return (
      <View style={{ marginBottom: 16 }}>
        {/* 1. 메시지 버블 영역 */}
        <View style={[styles.messageRow, isUser ? styles.userRow : styles.assistantRow]}>
          
          {/* Assistant일 경우 왼쪽에 아이콘/버튼 배치 */}
          {!isUser && (
            <TouchableOpacity 
              onPress={() => item.suggestion ? handleCloseExtra(item.id, 'suggestion') : handleRequestSuggestion(item.id, item.content)}
              style={styles.actionIconBtn}
              disabled={item.isLoadingExtra}
            >
               {item.isLoadingExtra ? <ActivityIndicator size="small" color="#F59E0B" /> : <Lightbulb color="#F59E0B" size={20} fill={item.suggestion ? "#F59E0B" : "none"} />}
            </TouchableOpacity>
          )}

          <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>

          {/* User일 경우 오른쪽에 아이콘/버튼 배치 */}
          {isUser && (
            <TouchableOpacity 
              onPress={() => item.feedback ? handleCloseExtra(item.id, 'feedback') : handleRequestFeedback(item.id, item.content)}
              style={styles.actionIconBtn}
              disabled={item.isLoadingExtra}
            >
              {item.isLoadingExtra ? <ActivityIndicator size="small" color="#6B7280" /> : <Eye color="#6B7280" size={20} />}
            </TouchableOpacity>
          )}
        </View>

        {/* 2. 추가 정보 영역 (피드백 or 추천) */}
        
        {/* (A) 사용자 문법 피드백 (User 메시지 하단) */}
        {isUser && item.feedback && (
          <View style={styles.feedbackContainer}>
            <View style={styles.feedbackHeader}>
              <Text style={styles.feedbackTitle}>🧐 피드백 (Grammar Check)</Text>
              <TouchableOpacity onPress={() => handleCloseExtra(item.id, 'feedback')}>
                <X size={16} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.feedbackText}>{item.feedback}</Text>
          </View>
        )}

        {/* (B) 추천 답변 (Assistant 메시지 하단) */}
        {!isUser && item.suggestion && (
          <View style={styles.suggestionContainer}>
            <View style={styles.feedbackHeader}>
              <Text style={styles.suggestionTitle}>💡 이렇게 말할 수 있어요</Text>
              <TouchableOpacity onPress={() => handleCloseExtra(item.id, 'suggestion')}>
                <X size={16} color="#B45309" />
              </TouchableOpacity>
            </View>
            <Text style={styles.suggestionText}>{item.suggestion}</Text>
            
            {/* 추천 답변을 입력창에 바로 넣는 기능 (옵션) */}
            {/* <TouchableOpacity style={styles.copyBtn} onPress={() => setInput('추천 답변 중 하나 복사 로직')}>
              <Text style={styles.copyBtnText}>입력창에 복사</Text>
            </TouchableOpacity> */}
          </View>
        )}

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <ChevronLeft color="#2c303c" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === 'casual' ? '😊 Casual Mode' : '🎩 Formal Mode'}
        </Text>
        <TouchableOpacity onPress={handleModeChange}>
          <Text style={styles.modeButtonText}>모드 변경</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <PandaIcon size="medium" />
            </View>
          </View>
        }
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.assistantBubble}>
                <ActivityIndicator color="#6b7280" size="small" />
              </View>
            </View>
          ) : null
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message..."
              placeholderTextColor="#9ca3af"
              onSubmitEditing={handleFormSubmit}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic color="#9ca3af" size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleFormSubmit}
            disabled={!input.trim() || isLoading}
            style={[styles.sendButton, (!input.trim() || isLoading) && styles.disabledButton]}>
            <Send color="#fff" size={18} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e8eaf0' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#d5d8e0', borderBottomWidth: 1, borderBottomColor: '#c5c8d4',
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#2c303c' },
  iconButton: { padding: 4 },
  modeButtonText: { fontSize: 12, color: '#2c303c', textDecorationLine: 'underline' },
  listContent: { padding: 16, paddingBottom: 20 },
  mascotContainer: { alignItems: 'center', marginVertical: 16 },
  mascotCircle: {
    width: 128, height: 128, backgroundColor: 'white', borderRadius: 64, borderWidth: 4,
    borderColor: '#2c303c', justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
  },
  
  // 메시지 로우 스타일 수정 (버튼 배치를 위해)
  messageRow: { marginBottom: 4, flexDirection: 'row', alignItems: 'flex-end' },
  userRow: { justifyContent: 'flex-end' },
  assistantRow: { justifyContent: 'flex-start' },
  
  bubble: { maxWidth: '70%', padding: 12, borderRadius: 16 },
  userBubble: { backgroundColor: '#b8bcc9', borderBottomRightRadius: 4 },
  assistantBubble: { backgroundColor: '#d5d8e0', borderBottomLeftRadius: 4 },
  messageText: { color: '#2c303c', fontSize: 14, lineHeight: 20 },
  
  loadingContainer: { alignItems: 'flex-start', marginBottom: 10 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#d5d8e0',
    borderTopWidth: 1, borderTopColor: '#c5c8d4',
  },
  inputWrapper: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 24, paddingHorizontal: 16, height: 44, marginRight: 8,
  },
  input: { flex: 1, color: '#2c303c', fontSize: 14, padding: 0 },
  micButton: { padding: 4 },
  sendButton: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#2c303c',
    justifyContent: 'center', alignItems: 'center',
  },
  disabledButton: { opacity: 0.5 },

  // === [추가된 스타일] ===
  actionIconBtn: {
    padding: 8,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 피드백 박스 (회색)
  feedbackContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#F3F4F6', // 연한 회색
    width: '85%',
    padding: 12,
    borderRadius: 12,
    marginTop: 4,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  feedbackTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  feedbackText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },

  // 추천 박스 (노란색)
  suggestionContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFBEB', // 연한 노란색 (Tailwind amber-50)
    width: '85%',
    padding: 12,
    borderRadius: 12,
    marginTop: 4,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#FCD34D', // 노란색 테두리
  },
  suggestionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309', // 진한 호박색
  },
  suggestionText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
});

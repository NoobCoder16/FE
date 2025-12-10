import client from './Client';
import aiClient from './AiClient';
import {
  ApiResponse,
  AuthMeResponse,
  UserProfile,
  UpdateProfileRequest,
  StartSessionResponse,
  FinishSessionRequest,
  FinishSessionResponse,
  ConversationHistoryItem,
  ConversationDetail,
  SubscriptionOptionsResponse,
  SubscribeResponse,
  CancelSubscriptionResponse,
  AiChatResponse,
  AiFeedbackResponse,
  TtsResponse,
  ConversationSettings,
  UserStats,
  Phrase,
  NotificationSettings,
  HomeStatusResponse,
  AiResetResponse,
  SttRecognizeResponse,
  ExampleReplyResponse,
  AiReviewResponse,
  AiAccuracyResponse,
} from '../types/api';

// === 1. 사용자 인증 및 프로필 (Auth & Profile) ===
export const authApi = {
  /**
   * 내 인증 정보 조회
   * GET /api/auth/me
   */
  getMe: () => client.get<ApiResponse<AuthMeResponse>>('/api/auth/me'),

  /**
   * 프로필 조회
   * GET /api/user/profile
   */
  getProfile: () => client.get<ApiResponse<UserProfile>>('/api/user/profile'),

  /**
   * 프로필 수정
   * PUT /api/user/profile
   */
  updateProfile: (data: UpdateProfileRequest) =>
    client.put<ApiResponse<UserProfile>>('/api/user/profile', data),
};

// === 2. 대화 관리 (Conversation) ===
export const conversationApi = {
  /**
   * 세션 생성
   * POST /api/conversation/start
   */
  startSession: () =>
    client.post<ApiResponse<StartSessionResponse>>('/api/conversation/start'),

  /**
   * 대화 종료 + 전체 스크립트 업로드
   * POST /api/conversation/finish
   */
  finishSession: (data: FinishSessionRequest) =>
    client.post<ApiResponse<FinishSessionResponse>>('/api/conversation/finish', data),

  /**
   * 대화 내역 조회
   * GET /api/conversation/history
   */
  getHistory: (page = 1, limit = 20) =>
    client.get<ApiResponse<ConversationHistoryItem[]>>('/api/conversation/history', {
      params: { page, limit },
    }),

  /**
   * 특정 대화 조회
   * GET /api/conversation/:sessionId
   */
  getConversation: (sessionId: string) =>
    client.get<ApiResponse<ConversationDetail>>(`/api/conversation/${sessionId}`),

  /**
   * 대화 삭제
   * DELETE /api/conversation/delete
   */
  deleteConversation: (sessionId: string) =>
    client.delete<ApiResponse<void>>('/api/conversation/delete', {
      data: { sessionId },
    }),

  /**
   * 전체 대화 삭제
   * DELETE /api/conversation/delete
   */
  deleteAllConversations: () =>
    client.delete<ApiResponse<void>>('/api/conversation/delete', {
      data: { all: true },
    }),
};

// === 3. 구독 (Subscription) ===
export const subscriptionApi = {
  /**
   * 구독 옵션 조회
   * GET /api/subscription/options
   */
  getOptions: () =>
    client.get<ApiResponse<SubscriptionOptionsResponse>>('/api/subscription/options'),

  /**
   * 구독 시작/변경
   * POST /api/subscription/subscribe
   */
  subscribe: (plan: 'basic' | 'premium') =>
    client.post<ApiResponse<SubscribeResponse>>('/api/subscription/subscribe', { plan }),

  /**
   * 구독 취소
   * POST /api/subscription/cancel
   */
  cancel: () =>
    client.post<ApiResponse<CancelSubscriptionResponse>>('/api/subscription/cancel'),
};

// === 4. AI & 음성 (AI) ===
// === 4. AI & 음성 (AI) ===
// AI Service (Python FastAPI)와 직접 통신
export const aiApi = {
  /**
   * 세션 초기화
   * POST /api/conversation/reset
   */
  resetSession: (sessionId?: string) =>
    aiClient.post<ApiResponse<AiResetResponse>>('/api/conversation/reset', sessionId, {
      headers: { 'Content-Type': 'text/plain' } // Body가 단순 문자열일 경우
    }),

  /**
   * STT - 오디오(PCM) -> 텍스트 변환
   * POST /api/stt/recognize
   * Body: RAW PCM bytes (application/octet-stream)
   */
  stt: (audioData: any, isBinary = true) =>
    aiClient.post<ApiResponse<SttRecognizeResponse>>('/api/stt/recognize', audioData, {
      headers: {
        'Content-Type': 'application/octet-stream'
      },
    }),

  /**
   * AI 텍스트 응답
   * POST /api/ai/chat
   */
  chat: (text: string, sessionId?: string) =>
    aiClient.post<ApiResponse<AiChatResponse>>('/api/ai/chat', { text, sessionId }),

  /**
   * AI 피드백 - 의미 + 예문 제공
   * POST /api/ai/feedback
   */
  getFeedback: (text: string, sessionId?: string) =>
    aiClient.post<ApiResponse<AiFeedbackResponse>>('/api/ai/feedback', { text, sessionId }),

  /**
   * TTS - 텍스트 -> 오디오 변환
   * POST /api/ai/tts
   */
  tts: (text: string, accent: 'us' | 'uk' | 'au' = 'us', gender: 'male' | 'female' = 'female') =>
    aiClient.post<ApiResponse<TtsResponse>>('/api/ai/tts', { text, accent, gender }),

  /**
   * 예시 답변 생성
   * POST /api/ai/example-reply
   */
  getExampleReply: (aiText: string, sessionId?: string) =>
    aiClient.post<ApiResponse<ExampleReplyResponse>>('/api/ai/example-reply', { ai_text: aiText, sessionId }),

  /**
   * 세션 복습 (어려운 단어)
   * POST /api/ai/review
   */
  getReview: (sessionId?: string) =>
    aiClient.post<ApiResponse<AiReviewResponse>>('/api/ai/review', { sessionId }),

  /**
   * 정확도 조회
   * GET /api/stats/accuracy
   */
  getAccuracy: (sessionId?: string) =>
    aiClient.get<ApiResponse<AiAccuracyResponse>>('/api/stats/accuracy', { params: { sessionId } }),

  /**
   * 전체 히스토리 조회 (세션 클리어)
   * GET /api/conversation/history
   */
  getHistoryAndClear: (sessionId?: string) =>
    aiClient.get<ApiResponse<any>>('/api/conversation/history', { params: { sessionId } }),
};

// === 5. 회화 설정 (Conversation Settings) ===
export const settingsApi = {
  /**
   * 설정 조회
   * GET /api/conversation/settings
   */
  getSettings: () =>
    client.get<ApiResponse<ConversationSettings>>('/api/conversation/settings'),

  /**
   * 설정 변경
   * PUT /api/conversation/settings
   */
  updateSettings: (data: Partial<ConversationSettings>) =>
    client.put<ApiResponse<ConversationSettings>>('/api/conversation/settings', data),
};

// === 6. 학습 통계 (Stats) ===
export const statsApi = {
  /**
   * 통계 조회
   * GET /api/stats
   */
  getStats: () => client.get<ApiResponse<UserStats>>('/api/stats'),
};

// === 7. 스크립트(암기 문장) (Phrases) ===
export const phrasesApi = {
  /**
   * 기본 문장 조회
   * GET /api/phrases
   */
  getPhrases: () => client.get<ApiResponse<Phrase[]>>('/api/phrases'),
};

// === 8. 푸시 알림 (Notifications) ===
export const notificationApi = {
  /**
   * 알림 설정 조회
   * GET /api/notifications/settings
   */
  getSettings: () =>
    client.get<ApiResponse<NotificationSettings>>('/api/notifications/settings'),

  /**
   * 알림 설정 변경
   * PUT /api/notifications/settings
   */
  updateSettings: (enabled: boolean) =>
    client.put<ApiResponse<NotificationSettings>>('/api/notifications/settings', {
      enabled,
    }),
};

// === 9. Home ===
export const homeApi = {
  /**
   * 홈 화면 상태
   * GET /api/home/status
   */
  getStatus: () =>
    client.get<ApiResponse<HomeStatusResponse>>('/api/home/status'),
};
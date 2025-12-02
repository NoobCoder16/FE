import client from './client';

// AI 서버 API 서비스
export const aiApi = {
  /**
   * 1. 채팅 메시지 전송
   * AI 서버가 히스토리를 관리하므로 text만 보내면 됨.
   */
  chat: (text: string, userId: string, difficulty = 'medium', register = 'casual') => 
    client.post('/api/ai/chat', { 
      text, 
      userId, 
      difficulty, 
      register 
    }),

  /**
   * 2. 문법 피드백 요청 (User 메시지용)
   */
  getFeedback: (text: string) => 
    client.post('/api/ai/feedback', { text }),

  /**
   * 3. 답변 추천 요청 (Assistant 메시지용)
   * AI 서버 명세: ai_text와 userId 필요
   */
  getExampleReply: (aiText: string, userId: string) => 
    client.post('/api/ai/example-reply', { 
      ai_text: aiText, 
      userId 
    }),

  /**
   * 4. 대화 세션 초기화 (새로운 대화 시작 시 필수)
   */
  resetConversation: (userId: string) => 
    client.post('/api/conversation/reset', { userId }),
};


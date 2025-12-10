// src/api/AiClient.ts
import axios from 'axios';
import { Platform } from 'react-native';

// AI 서버 (Python FastAPI) 주소 설정
//  (Android 에뮬레이터에서는 10.0.2.2 등)

const AI_BASE_URL = 'http://10.0.2.2:8000';

const aiClient = axios.create({
    baseURL: AI_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 로그 (디버깅용)
aiClient.interceptors.request.use(request => {
    console.log('[AI Client] Request:', request.method?.toUpperCase(), request.url);
    return request;
});

aiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('[AI Client] Error:', error.message);
        return Promise.reject(error);
    }
);

export default aiClient;

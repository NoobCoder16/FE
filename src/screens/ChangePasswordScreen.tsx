// src/screens/ChangePasswordScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

export default function ChangePasswordScreen({ navigation }: any) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']} // 상단은 insets.top으로 직접 처리
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* === ChatScreen과 동일한 형태의 헤더 === */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <ChevronLeft color="#2c303c" size={24} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>비밀번호 변경</Text>

          {/* 오른쪽 정렬용 더미 뷰 */}
          <View style={{ width: 24 }} />
        </View>

        {/* ===== 본문 영역 ===== */}
        <View style={styles.content}>
          {/* 입력창 */}
          <View style={styles.formArea}>
            <Text style={styles.inputLabel}>현재 비밀번호</Text>
            <TextInput
              style={styles.inputBox}
              secureTextEntry
              placeholder="현재 비밀번호"
              placeholderTextColor="#9ca3af"
              value={currentPw}
              onChangeText={setCurrentPw}
            />

            <Text style={styles.inputLabel}>새 비밀번호</Text>
            <TextInput
              style={styles.inputBox}
              secureTextEntry
              placeholder="새 비밀번호"
              placeholderTextColor="#9ca3af"
              value={newPw}
              onChangeText={setNewPw}
            />

            <Text style={styles.inputLabel}>새 비밀번호 확인</Text>
            <TextInput
              style={styles.inputBox}
              secureTextEntry
              placeholder="새 비밀번호 확인"
              placeholderTextColor="#9ca3af"
              value={newPwCheck}
              onChangeText={setNewPwCheck}
            />
          </View>

          {/* 버튼 */}
          <Pressable
            style={styles.submitButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.submitButtonText}>비밀번호 변경</Text>
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

  // === ChatScreen과 통일한 헤더 스타일 ===
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c303c',
  },

  // === 본문 ===
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  formArea: {
    marginTop: 16,
  },

  inputLabel: {
    fontSize: 12,
    color: '#2c303c',
    marginBottom: 8,
  },

  inputBox: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 20,
  },

  submitButton: {
    marginTop: 32,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
});

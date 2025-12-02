// src/screens/DeleteAccountScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PandaIcon from '../components/PandaIcon';

type Props = {
  navigation: any;
};

export default function DeleteAccountScreen({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets();   // ⭐ 추가

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}   // top 제거
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* 뒤로가기 */}
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>

        {/* 상단 로고 + 제목 */}
        <View style={styles.header}>
          <PandaIcon size="large" />
          <Text style={styles.title}>회원 탈퇴</Text>
        </View>

        {/* 카드 영역 */}
        <View style={styles.card}>
          <Text style={styles.label}>비밀번호 입력</Text>

          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={styles.deleteButton}
            onPress={() => navigation.navigate('DeleteAccountModal')}
          >
            <Text style={styles.deleteButtonText}>탈퇴하기</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  backArrow: {
    fontSize: 28,
    color: '#2c303c',
    marginBottom: 16,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '600',
    color: '#2c303c',
  },

  card: {
    backgroundColor: '#d5d8e0',
    padding: 20,
    borderRadius: 16,
  },

  label: {
    color: '#2c303c',
    fontSize: 14,
    marginBottom: 8,
  },

  input: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 20,
  },

  deleteButton: {
    backgroundColor: '#2c303c',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});

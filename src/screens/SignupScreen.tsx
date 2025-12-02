// src/screens/SignupScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PandaIcon from '../components/PandaIcon';
import { ChevronLeft } from 'lucide-react-native';

type Props = {
  navigation: any;
};

export default function SignupScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={[styles.safeArea, { paddingTop: insets.top }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>

          {/* ===== 상단 뒤로가기 버튼 ===== */}
          <View style={styles.topHeader}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft size={26} color="#2c303c" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* ===== 내용 영역 (카드 위로 올리기) ===== */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>회원가입</Text>

            <View style={styles.card}>
              <View style={styles.logoSection}>
                <View style={styles.logoRow}>
                  <Text style={styles.logoText}>LING</Text>
                  <PandaIcon size="small" />
                  <Text style={styles.logoText}>MATE</Text>
                </View>
                <Text style={styles.desc}>AI와 함께하는 외국어 회화</Text>
              </View>

              <TextInput
                style={styles.inputBoxId}
                placeholder="아이디"
                placeholderTextColor="#9ca3af"
              />

              <TextInput
                style={styles.inputBoxEmail}
                placeholder="이메일"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.inputBoxPw}
                placeholder="비밀번호"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />

              <TextInput
                style={styles.inputBoxPwCheck}
                placeholder="비밀번호 확인"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />

              <Pressable
                style={styles.signupButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.signupButtonText}>회원가입</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e5e7ed',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  /* 상단 뒤로가기 */
  topHeader: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },

  /* 카드 영역 전체 (위로 붙이기) */
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // ⬅ 위에서부터 시작
    paddingTop: 24,               // ⬅ 카드 전체를 얼마나 내릴지 여기서 조절
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c303c',
    marginBottom: 12,
  },

  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#d5d8e0',
    borderRadius: 24,
    padding: 24,
  },

  logoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  desc: {
    marginTop: 8,
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },

  inputBoxId: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 8,
  },
  inputBoxEmail: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 8,
  },
  inputBoxPw: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 8,
  },
  inputBoxPwCheck: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#2c303c',
    marginBottom: 12,
  },

  signupButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
});

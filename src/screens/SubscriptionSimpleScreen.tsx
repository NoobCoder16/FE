// src/screens/SubscriptionSimpleScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SubscriptionSimpleScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']} // top은 paddingTop으로 처리
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* ===== 통일된 헤더 ===== */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>구독 관리</Text>

          {/* 오른쪽 정렬용 여백 (왼쪽 버튼과 폭 맞춤) */}
          <View style={{ width: 32 }} />
        </View>

        {/* ===== 본문 영역 ===== */}
        <View style={styles.content}>
          {/* 프리미엄 구독 */}
          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('PremiumSubscribeModal')}
          >
            <Text style={styles.itemText}>프리미엄 구독</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>

          {/* 프리미엄 구독 취소 */}
          <Pressable
            style={styles.itemBox}
            onPress={() => navigation.navigate('PremiumCancelModal')}
          >
            <Text style={styles.itemText}>프리미엄 구독 취소</Text>
            <Text style={styles.arrow}>›</Text>
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

  /* ===== 통일된 헤더 ===== */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
  },
  backButton: {
    width: 32,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: '#2c303c',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c303c',
    textAlign: 'center',
  },

  /* ===== 콘텐츠 영역 ===== */
  content: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  itemBox: {
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#2c303c',
  },
  arrow: {
    fontSize: 18,
    color: '#2c303c',
  },
});

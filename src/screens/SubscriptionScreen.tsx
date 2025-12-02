// src/screens/SubscriptionScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

type Props = {
  navigation: any;
};

export default function SubscriptionScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']} // top은 paddingTop으로 처리
    >
      {/* 헤더 포함하는 루트 (paddingHorizontal 없음 → 헤더가 화면 전체 폭 차지) */}
      <View style={[styles.root, { paddingTop: insets.top }]}>

        {/* === AccountManageScreen과 동일 헤더 === */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <ChevronLeft color="#2c303c" size={24} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>구독 관리</Text>

          {/* 오른쪽 균형 유지 */}
          <View style={{ width: 24 }} />
        </View>

        {/* ===== 콘텐츠 (여기만 paddingHorizontal 적용) ===== */}
        <View style={styles.content}>

          {/* ===== 베이직 플랜 ===== */}
          <Pressable style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.checkbox} />
              <View>
                <Text style={styles.planName}>베이직</Text>
                <Text style={styles.planInfo}>회화 시간: 10분</Text>
                <Text style={styles.planInfo}>회화 횟수: 3번</Text>
              </View>
            </View>
            <Text style={styles.planPrice}>Free</Text>
          </Pressable>

          {/* ===== 프리미엄 플랜 ===== */}
          <Pressable style={styles.card}>
            <View style={styles.cardLeft}>

              {/* 왕관 아이콘 */}  
              <View style={styles.premiumTag}>
                <Text style={styles.premiumBadge}>👑</Text>
              </View>

              {/* 텍스트 설명 */}
              <View>
                <Text style={styles.planName}>프리미엄</Text>
                <Text style={styles.planInfo}>회화 시간: ∞</Text>
                <Text style={styles.planInfo}>회화 횟수: ∞</Text>
              </View>

            </View>

            {/* 가격 */}
            <Text style={styles.planPrice}>월 12,900₩</Text>
          </Pressable>

          {/* ===== 하단 구독 관리 버튼 ===== */}
          <Pressable
            style={styles.manageButton}
            onPress={() => navigation.navigate('SubscriptionSimple')}
          >
            <Text style={styles.manageButtonText}>구독 관리</Text>
          </Pressable>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* ===== 전체 배경 ===== */
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  /* 헤더 포함 루트 (가로 padding 없음) */
  root: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  /* ===== AccountManageScreen과 완전히 동일한 헤더 ===== */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,                     // 좌우 끝까지 닿게 함
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

  /* ===== 콘텐츠 영역 ===== */
  content: {
    flex: 1,
    paddingHorizontal: 24,           // 카드 정렬을 위한 padding
    paddingTop: 20,
  },

  /* ===== 공통 카드 ===== */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2c303c',
    marginRight: 12,
  },

  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c303c',
    marginBottom: 4,
  },
  planInfo: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },

  planPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c303c',
  },

  /* ===== 프리미엄 왕관 태그 ===== */
  premiumTag: {
    backgroundColor: '#FACC15',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
  },
  premiumBadge: {
    fontSize: 14,
  },

  /* ===== 하단 버튼 ===== */
  manageButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
});

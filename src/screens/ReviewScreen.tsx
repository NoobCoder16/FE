// src/screens/ReviewScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

type CardItem = {
  en: string;
  kr: string;
};

const cards: CardItem[] = [
  { en: 'Way to go.', kr: '잘했어' },
  { en: 'I’m sold.', kr: '설득됐어' },
  { en: 'Give her my best.', kr: '안부 전해줘' },
  { en: 'Good for you.', kr: '잘됐다/좋겠다' },
  { en: 'Time flies', kr: '시간 빠르다' },
  { en: 'It’s up to you.', kr: '너가 결정해' },
  { en: 'I mean it.', kr: '진심이야' },
];

export default function ReviewScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={[styles.root, { paddingTop: insets.top }]}>
        
        {/* ===== 통일된 헤더 ===== */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#2c303c" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>복습하기</Text>

          {/* 오른쪽 공간 (정렬 유지용) */}
          <View style={{ width: 32 }} />
        </View>

        {/* 카드 리스트 */}
        <ScrollView
          contentContainerStyle={styles.cardList}
          showsVerticalScrollIndicator={false}
        >
          {cards.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardBg} />
              <View style={styles.cardContentRow}>
                <Text style={styles.cardTextEn}>{item.en}</Text>
                <Text style={styles.cardTextKr}>{item.kr}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* 하단 버튼 두 개 */}
        <View style={styles.bottomButtonsRow}>
          {/* 스크립트 → ChatScript 화면 */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Script')}
          >
            <Text style={styles.btnText}>스크립트</Text>
          </TouchableOpacity>

          {/* 홈으로 → HomeScreen 화면 */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.btnText}>홈으로</Text>
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
    backgroundColor: '#E5E7ED',
  },

  /* ===== 통일된 헤더 스타일 ===== */
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
    height: 32,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c303c',
    textAlign: 'center',
  },

  /* 카드 리스트 */
  cardList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    rowGap: 12,
    marginTop: 12,
  },
  card: {
    width: '100%',
    height: 61,
    justifyContent: 'center',
  },
  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(191,195,208,0.5)',
    borderRadius: 15,
  },
  cardContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardTextEn: {
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },
  cardTextKr: {
    fontSize: 17,
    fontWeight: '400',
    color: 'black',
  },

  /* 하단 버튼 영역 */
  bottomButtonsRow: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    width: 120,
    height: 40,
    backgroundColor: '#2C303C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: '#D5D8E0',
  },
});

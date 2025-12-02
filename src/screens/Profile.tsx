import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import PandaIcon from '../components/PandaIcon';

type Props = {
  navigation: any;
};

// src/screens → src/assets
const pandaImg = require('../assets/images/panda-mascot.png');

export default function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']} // top은 insets.top으로 직접 처리
    >
      <View style={[styles.root, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft color="#2c303c" size={24} />
            </Pressable>

            <View style={styles.headerLogoRow}>
              <Text style={styles.headerLogoText}>LING</Text>
              <PandaIcon size="small" />
              <Text style={styles.headerLogoText}>MATE</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>마이페이지</Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Card */}
          <View style={styles.card}>
            {/* "프로필" 타이틀 + 아이콘 */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderTitleRow}>
                <Text style={styles.cardHeaderIcon}>👤</Text>
                <Text style={styles.cardHeaderText}>프로필</Text>
              </View>
            </View>

            {/* 실제 프로필 내용 */}
            <View style={styles.profileRow}>
              <View style={styles.profileAvatarWrapper}>
                <Image source={pandaImg} style={styles.profileAvatar} />
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>김말본</Text>
                <Text style={styles.profileEmail}>kmm@gmail.com</Text>
                <View style={styles.profilePlanRow}>
                  <View style={styles.planDot} />
                  <Text style={styles.profilePlanText}>베이직</Text>
                </View>
              </View>

              <Pressable
                style={styles.settingsButton}
                onPress={() => {
                  console.log('[RN] 설정 버튼 클릭');
                  navigation.navigate('Settings');
                }}
              >
                <Text style={styles.settingsButtonText}>설정</Text>
              </Pressable>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📆</Text>
            <Text style={styles.statLabel}>연속 학습일</Text>
            <Text style={styles.statValue}>15</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statLabel}>획득 포인트</Text>
            <Text style={styles.statValue}>1250</Text>
          </View>

          {/* Menu Items */}
          <Pressable
            style={styles.menuItem}
            onPress={() => {
              console.log('[RN] 학습 통계 클릭');
              navigation.navigate('StudyStats');
            }}
          >
            <Text style={styles.menuIcon}>📊</Text>
            <Text style={styles.menuLabel}>학습 통계</Text>
          </Pressable>

          <Pressable
            style={styles.menuItem}
            onPress={() => {
              console.log('[RN] 회화 스크립트 클릭');
              navigation.navigate('ChatHistory');
            }}
          >
            <Text style={styles.menuIcon}>💬</Text>
            <Text style={styles.menuLabel}>회화 스크립트</Text>
          </Pressable>

          {/* Panda at bottom */}
          <View style={styles.bottomPandaWrapper}>
            <Image source={pandaImg} style={styles.bottomPanda} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8eaf0',
  },
  root: {
    flex: 1,
  },
  header: {
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
    paddingHorizontal: 16,
    paddingTop: 10, // insets.top 위에 살짝 여백
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#2c303c',
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  headerLogoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  headerSubtitle: {
    marginTop: 4,
    marginLeft: 48, // back 버튼 + 간격만큼 밀어줌
    fontSize: 11,
    color: '#6b7280',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    rowGap: 12,
  },
  card: {
    backgroundColor: '#d5d8e0',
    borderRadius: 20,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  cardHeaderIcon: {
    fontSize: 18,
    color: '#2c303c',
  },
  cardHeaderText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2c303c',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    marginTop: 4,
  },
  profileAvatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#2c303c',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileAvatar: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  profileEmail: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  profilePlanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginTop: 4,
  },
  planDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6b7280',
  },
  profilePlanText: {
    fontSize: 11,
    color: '#6b7280',
  },
  settingsButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  settingsButtonText: {
    fontSize: 13,
    color: '#2c303c',
    fontWeight: '500',
  },
  statCard: {
    backgroundColor: '#d5d8e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  statIcon: {
    fontSize: 20,
    color: '#2c303c',
  },
  statLabel: {
    fontSize: 13,
    color: '#2c303c',
  },
  statValue: {
    marginLeft: 'auto',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c303c',
  },
  menuItem: {
    backgroundColor: '#d5d8e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  menuIcon: {
    fontSize: 20,
    color: '#2c303c',
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2c303c',
  },
  bottomPandaWrapper: {
    alignItems: 'center',
    paddingTop: 24,
  },
  bottomPanda: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

// src/screens/ChatSettingsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import PandaIcon from '../components/PandaIcon';

// 네비게이션 타입 정의
type RootStackParamList = {
  ChatSettings: { initialMode?: 'casual' | 'formal' };
  Chat: {
    mode: 'casual' | 'formal';
    region: 'US' | 'UK' | 'AUS';
    gender: 'male' | 'female';
  };
};

type ChatSettingsRouteProp = RouteProp<RootStackParamList, 'ChatSettings'>;

// 옵션 버튼용 타입
type OptionButtonProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.optionLabel,
          isSelected && styles.optionLabelSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function ChatSettingsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<ChatSettingsRouteProp>();
  const insets = useSafeAreaInsets();

  // 초기값 설정
  const initialMode = route.params?.initialMode || 'casual';

  // 상태 관리
  const [region, setRegion] = useState<'US' | 'UK' | 'AUS'>('US');
  const [mode, setMode] = useState<'casual' | 'formal'>(initialMode);
  const [gender, setGender] = useState<'male' | 'female'>('female');

  const handleSaveAndStart = () => {
    navigation.navigate('Chat', {
      mode,
      region,
      gender,
    });
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['left', 'right', 'bottom']}  // top은 직접 처리
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>

        {/* ===== 다른 화면과 통일된 헤더 ===== */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ChevronLeft color="#2c303c" size={24} />
          </TouchableOpacity>

          {/* 가운데 로고 */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>LING</Text>
            <PandaIcon size="small" />
            <Text style={styles.logoText}>MATE</Text>
          </View>

          {/* 오른쪽 정렬용 더미 */}
          <View style={{ width: 24 }} />
        </View>

        {/* 페이지 타이틀 */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>회화 설정</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Section 1: Region (국가/발음) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Region / Accent</Text>
            <View style={styles.optionsWrapper}>
              <OptionButton
                label="🇺🇸 United States"
                isSelected={region === 'US'}
                onPress={() => setRegion('US')}
              />
              <OptionButton
                label="🇬🇧 United Kingdom"
                isSelected={region === 'UK'}
                onPress={() => setRegion('UK')}
              />
              <OptionButton
                label="🇦🇺 Australia"
                isSelected={region === 'AUS'}
                onPress={() => setRegion('AUS')}
              />
            </View>
          </View>

          {/* Section 2: Style */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Style</Text>
            <View style={styles.optionsWrapper}>
              <OptionButton
                label="😊 Casual English"
                isSelected={mode === 'casual'}
                onPress={() => setMode('casual')}
              />
              <OptionButton
                label="🎓 Formal English"
                isSelected={mode === 'formal'}
                onPress={() => setMode('formal')}
              />
            </View>
          </View>

          {/* Section 3: Gender/Tone (성별) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voice Tone</Text>
            <View style={styles.optionsWrapper}>
              <OptionButton
                label="👩 Female"
                isSelected={gender === 'female'}
                onPress={() => setGender('female')}
              />
              <OptionButton
                label="👨 Male"
                isSelected={gender === 'male'}
                onPress={() => setGender('male')}
              />
            </View>
          </View>

          {/* 저장 + 시작 버튼 */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveAndStart}
            activeOpacity={0.9}
          >
            <Text style={styles.saveButtonText}>저장하고 대화 시작하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* ===== 배경색: 다른 화면과 통일 ===== */
  safeArea: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E7ED',
  },

  /* ===== 헤더: Settings / Subscription / AccountManage 와 동일 톤 ===== */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#d5d8e0',
    borderBottomWidth: 1,
    borderBottomColor: '#c5c8d4',
  },
  backButton: {
    width: 32,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c303c',
    letterSpacing: 1,
  },

  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c303c',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2c303c',
  },

  /* ===== 옵션 버튼: 다른 화면 카드 톤으로 ===== */
  optionsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(191,195,208,0.5)', // 기본은 연한 회색 카드톤
  },
  optionButtonSelected: {
    backgroundColor: '#2c303c', // 선택 시: 다른 화면과 같은 진한 색
  },
  optionLabel: {
    fontSize: 14,
    color: '#2c303c',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  saveButton: {
    marginTop: 8,
    backgroundColor: '#2c303c', // 다른 버튼과 동일
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

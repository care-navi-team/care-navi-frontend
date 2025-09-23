import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import WalkingComponent from '../components/WalkingComponent';
import MeditationComponent from '../components/MeditationComponent'; // 명상 컴포넌트 추가

const MissionScreen: React.FC = () => {
  // 잘 먹기 상태
  const [morningCompleted, setMorningCompleted] = useState(false);
  const [morningTime, setMorningTime] = useState<string>('');
  const [lunchCompleted, setLunchCompleted] = useState(false);
  const [lunchTime, setLunchTime] = useState<string>('');
  const [dinnerCompleted, setDinnerCompleted] = useState(false);
  const [dinnerTime, setDinnerTime] = useState<string>('');

  // 약 챙기기 상태 (별도)
  const [morningMedCompleted, setMorningMedCompleted] = useState(false);
  const [morningMedTime, setMorningMedTime] = useState<string>('');
  const [lunchMedCompleted, setLunchMedCompleted] = useState(false);
  const [lunchMedTime, setLunchMedTime] = useState<string>('');
  const [dinnerMedCompleted, setDinnerMedCompleted] = useState(false);
  const [dinnerMedTime, setDinnerMedTime] = useState<string>('');

  // 운동하기 상태
  const [walkingCompleted, setWalkingCompleted] = useState(false);

  // 잘 자기 상태
  const [sleepCompleted, setSleepCompleted] = useState(false);
  const [sleepModalVisible, setSleepModalVisible] = useState(false);
  const [sleepHours, setSleepHours] = useState<string>('');
  const [sleepMinutes, setSleepMinutes] = useState<string>('');
  const [recordedSleepTime, setRecordedSleepTime] = useState<string>('');

  // 명상하기 상태
  const [meditationCompleted, setMeditationCompleted] = useState(false);

  // 목표 수면 시간 (시간 단위로 설정, 예: 8시간)
  const TARGET_SLEEP_HOURS = 8;

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}시 ${minutes}분`;
  };

  // 잘 먹기 완료 개수
  const getFoodCompletedCount = (): number => {
    let count = 0;
    if (morningCompleted) count++;
    if (lunchCompleted) count++;
    if (dinnerCompleted) count++;
    return count;
  };

  // 약 챙기기 완료 개수
  const getMedCompletedCount = (): number => {
    let count = 0;
    if (morningMedCompleted) count++;
    if (lunchMedCompleted) count++;
    if (dinnerMedCompleted) count++;
    return count;
  };

  // 잘 먹기 핸들러들
  const handleMorningPress = () => {
    if (!morningCompleted) {
      setMorningTime(getCurrentTime());
      setMorningCompleted(true);
    }
  };

  const handleLunchPress = () => {
    if (!lunchCompleted) {
      setLunchTime(getCurrentTime());
      setLunchCompleted(true);
    }
  };

  const handleDinnerPress = () => {
    if (!dinnerCompleted) {
      setDinnerTime(getCurrentTime());
      setDinnerCompleted(true);
    }
  };

  // 약 챙기기 핸들러들
  const handleMorningMedPress = () => {
    if (!morningMedCompleted) {
      setMorningMedTime(getCurrentTime());
      setMorningMedCompleted(true);
    }
  };

  const handleLunchMedPress = () => {
    if (!lunchMedCompleted) {
      setLunchMedTime(getCurrentTime());
      setLunchMedCompleted(true);
    }
  };

  const handleDinnerMedPress = () => {
    if (!dinnerMedCompleted) {
      setDinnerMedTime(getCurrentTime());
      setDinnerMedCompleted(true);
    }
  };

  const handleWalkingComplete = () => {
    setWalkingCompleted(true);
  };

  const handleMeditationComplete = () => {
    setMeditationCompleted(true);
  };

  // 잘 자기 관련 핸들러들
  const handleSleepPress = () => {
    if (!sleepCompleted) {
      setSleepModalVisible(true);
    }
  };

  const handleSleepSubmit = () => {
    const hours = parseInt(sleepHours);
    const minutes = parseInt(sleepMinutes);

    // 입력 검증
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 24 ||
      minutes < 0 ||
      minutes >= 60
    ) {
      Alert.alert(
        '오류',
        '올바른 시간을 입력해주세요.\n(시간: 0-24, 분: 0-59)',
      );
      return;
    }

    // 총 수면 시간을 시간 단위로 계산
    const totalSleepHours = hours + minutes / 60;

    // 목표 수면 시간의 1시간 내외인지 확인 (7시간 ~ 9시간)
    const isWithinRange =
      totalSleepHours >= TARGET_SLEEP_HOURS - 1 &&
      totalSleepHours <= TARGET_SLEEP_HOURS + 1;

    if (isWithinRange) {
      setSleepCompleted(true);
      setRecordedSleepTime(`${sleepHours}시간 ${sleepMinutes}분`);
      setSleepModalVisible(false);
      Alert.alert('성공!', '수면 미션을 달성했습니다! 🎉');
    } else {
      Alert.alert(
        '미션 미달성',
        `목표 수면 시간(${TARGET_SLEEP_HOURS}시간)의 1시간 내외가 아닙니다.\n현재 수면 시간: ${sleepHours}시간 ${sleepMinutes}분\n권장 수면 시간: ${
          TARGET_SLEEP_HOURS - 1
        }~${TARGET_SLEEP_HOURS + 1}시간`,
      );
    }

    // 입력 필드 초기화
    setSleepHours('');
    setSleepMinutes('');
  };

  const handleModalClose = () => {
    setSleepModalVisible(false);
    setSleepHours('');
    setSleepMinutes('');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 잘 먹기 섹션 */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🍽️</Text>
          <Text style={styles.headerTitle}>잘 먹기</Text>
          <Text style={styles.headerCount}>{getFoodCompletedCount()}/3</Text>
        </View>

        <View style={styles.missionContainer}>
          {/* 아침 */}
          <View style={styles.missionItem}>
            <TouchableOpacity
              style={[
                styles.grayButton,
                morningCompleted && styles.completedYellowButton,
              ]}
              onPress={handleMorningPress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.grayMealText,
                  morningCompleted && styles.completedMealText,
                ]}
              >
                아침
              </Text>
              <Text
                style={[
                  styles.grayTimeText,
                  morningCompleted && styles.completedTimeText,
                ]}
              >
                {morningCompleted ? morningTime : '인증하기'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 점심 */}
          <View style={styles.missionItem}>
            <TouchableOpacity
              style={[
                styles.grayButton,
                lunchCompleted && styles.completedYellowButton,
              ]}
              onPress={handleLunchPress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.grayMealText,
                  lunchCompleted && styles.completedMealText,
                ]}
              >
                점심
              </Text>
              <Text
                style={[
                  styles.grayTimeText,
                  lunchCompleted && styles.completedTimeText,
                ]}
              >
                {lunchCompleted ? lunchTime : '인증하기'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 저녁 */}
          <View style={styles.missionItem}>
            <TouchableOpacity
              style={[
                styles.grayButton,
                dinnerCompleted && styles.completedYellowButton,
              ]}
              onPress={handleDinnerPress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.grayMealText,
                  dinnerCompleted && styles.completedMealText,
                ]}
              >
                저녁
              </Text>
              <Text
                style={[
                  styles.grayTimeText,
                  dinnerCompleted && styles.completedTimeText,
                ]}
              >
                {dinnerCompleted ? dinnerTime : '인증하기'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 운동하기 섹션 */}
      <View style={styles.section}>
        <View style={styles.walkingHeader}>
          <Text style={styles.walkingIcon}>🏃‍♀️</Text>
          <Text style={styles.walkingTitle}>운동하기</Text>
          <Text style={styles.walkingCount}>
            {walkingCompleted ? '1' : '0'}/1
          </Text>
        </View>

        <WalkingComponent onComplete={handleWalkingComplete} />
      </View>

      {/* 잘 자기 섹션 */}
      <View style={styles.section}>
        <View style={styles.walkingHeader}>
          <Text style={styles.walkingIcon}>😴</Text>
          <Text style={styles.walkingTitle}>잘 자기</Text>
          <Text style={styles.walkingCount}>
            {sleepCompleted ? '1' : '0'}/1
          </Text>
        </View>

        <View style={styles.sleepContainer}>
          <TouchableOpacity
            style={[
              styles.sleepButton,
              sleepCompleted && styles.completedSleepButton,
            ]}
            onPress={handleSleepPress}
            activeOpacity={0.8}
          >
            <Text style={styles.sleepButtonText}>
              {sleepCompleted ? '수면 완료!' : '수면 인증하기'}
            </Text>
            {sleepCompleted && (
              <Text style={styles.sleepTimeText}>
                수면 시간: {recordedSleepTime}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* 약 챙기기 섹션 */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>💊</Text>
          <Text style={styles.headerTitle}>약 챙기기</Text>
          <Text style={styles.headerCount}>{getMedCompletedCount()}/3</Text>
        </View>

        <View style={styles.missionContainer}>
          {/* 아침 */}
          <View style={styles.missionItem}>
            <TouchableOpacity
              style={[
                styles.grayButton,
                morningMedCompleted && styles.completedPurpleButton,
              ]}
              onPress={handleMorningMedPress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.grayMealText,
                  morningMedCompleted && styles.completedMealText,
                ]}
              >
                아침
              </Text>
              <Text
                style={[
                  styles.grayTimeText,
                  morningMedCompleted && styles.completedTimeText,
                ]}
              >
                {morningMedCompleted ? morningMedTime : '인증하기'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 점심 */}
          <View style={styles.missionItem}>
            <TouchableOpacity
              style={[
                styles.grayButton,
                lunchMedCompleted && styles.completedPurpleButton,
              ]}
              onPress={handleLunchMedPress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.grayMealText,
                  lunchMedCompleted && styles.completedMealText,
                ]}
              >
                점심
              </Text>
              <Text
                style={[
                  styles.grayTimeText,
                  lunchMedCompleted && styles.completedTimeText,
                ]}
              >
                {lunchMedCompleted ? lunchMedTime : '인증하기'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 저녁 */}
          <View style={styles.missionItem}>
            <TouchableOpacity
              style={[
                styles.grayButton,
                dinnerMedCompleted && styles.completedPurpleButton,
              ]}
              onPress={handleDinnerMedPress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.grayMealText,
                  dinnerMedCompleted && styles.completedMealText,
                ]}
              >
                저녁
              </Text>
              <Text
                style={[
                  styles.grayTimeText,
                  dinnerMedCompleted && styles.completedTimeText,
                ]}
              >
                {dinnerMedCompleted ? dinnerMedTime : '인증하기'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 명상하기 섹션 */}
      <View style={styles.section}>
        <View style={styles.walkingHeader}>
          <Text style={styles.walkingIcon}>🧘‍♀️</Text>
          <Text style={styles.walkingTitle}>명상하기</Text>
          <Text style={styles.walkingCount}>
            {meditationCompleted ? '1' : '0'}/1
          </Text>
        </View>

        <MeditationComponent onComplete={handleMeditationComplete} />
      </View>

      {/* 수면 시간 입력 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sleepModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>수면 시간을 입력해주세요</Text>
            <Text style={styles.modalSubtitle}>
              목표: {TARGET_SLEEP_HOURS}시간 (±1시간 허용)
            </Text>

            <View style={styles.timeInputContainer}>
              <View style={styles.timeInputGroup}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="0"
                  value={sleepHours}
                  onChangeText={setSleepHours}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.timeLabel}>시간</Text>
              </View>

              <View style={styles.timeInputGroup}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="0"
                  value={sleepMinutes}
                  onChangeText={setSleepMinutes}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.timeLabel}>분</Text>
              </View>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleModalClose}
              >
                <Text style={styles.modalCancelButtonText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSubmitButton}
                onPress={handleSleepSubmit}
              >
                <Text style={styles.modalSubmitButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    paddingTop: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerCount: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  missionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  missionItem: {
    alignItems: 'center',
  },
  grayButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedYellowButton: {
    backgroundColor: '#FFD700', // 노란색 (잘 먹기)
  },
  completedPurpleButton: {
    backgroundColor: '#DDA0DD', // 연보라색 (약 챙기기)
  },
  grayMealText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  grayTimeText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  completedMealText: {
    color: '#333', // 완료 시 검은 글씨
  },
  completedTimeText: {
    color: '#666', // 완료 시 회색 글씨
  },
  // 운동하기 섹션 스타일
  walkingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  walkingIcon: {
    fontSize: 24,
  },
  walkingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  walkingCount: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  // 잘 자기 섹션 스타일
  sleepContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sleepButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedSleepButton: {
    backgroundColor: '#87CEEB', // 하늘색 (잘 자기)
  },
  sleepButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sleepTimeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 20,
  },
  timeInputGroup: {
    alignItems: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: 80,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
  },
  timeLabel: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    fontWeight: '500',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  modalCancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#e9ecef',
  },
  modalCancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modalSubmitButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#87CEEB',
  },
  modalSubmitButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default MissionScreen;

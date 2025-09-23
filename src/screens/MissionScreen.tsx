import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import WalkingComponent from '../components/WalkingComponent'; // 위에서 만든 컴포넌트 import

const MissionScreen: React.FC = () => {
  const [morningCompleted, setMorningCompleted] = useState(false);
  const [morningTime, setMorningTime] = useState<string>('');
  const [lunchCompleted, setLunchCompleted] = useState(false);
  const [lunchTime, setLunchTime] = useState<string>('');
  const [dinnerCompleted, setDinnerCompleted] = useState(false);
  const [dinnerTime, setDinnerTime] = useState<string>('');
  const [walkingCompleted, setWalkingCompleted] = useState(false);

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}시 ${minutes}분`;
  };

  const getCompletedCount = (): number => {
    let count = 0;
    if (morningCompleted) count++;
    if (lunchCompleted) count++;
    if (dinnerCompleted) count++;
    return count;
  };

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

  const handleWalkingComplete = () => {
    setWalkingCompleted(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 잘 먹기 섹션 */}
      <View style={styles.section}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🍽️</Text>
          <Text style={styles.headerTitle}>잘 먹기</Text>
          <Text style={styles.headerCount}>{getCompletedCount()}/3</Text>
        </View>

        {/* 미션 버튼들 */}
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
    backgroundColor: '#FFD700', // 노란색
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
    color: '#333', // 노란색 배경에는 검은 글씨
  },
  completedTimeText: {
    color: '#666', // 노란색 배경에는 회색 글씨
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
});

export default MissionScreen;

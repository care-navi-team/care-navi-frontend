import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// 미션 타입 정의
interface Mission {
  id: string;
  title: string;
  icon: string;
  completed: number;
  total: number;
  category: 'meal' | 'exercise' | 'sleep' | 'medicine' | 'health';
}

interface DailyMissionProps {
  missions?: Mission[];
  onMissionPress?: (mission: Mission) => void;
}

// 목 데이터
const mockMissions: Mission[] = [
  {
    id: '1',
    title: '잘 먹기',
    icon: '🍽️',
    completed: 0,
    total: 3,
    category: 'meal',
  },
  {
    id: '2',
    title: '운동하기',
    icon: '🏃‍♀️',
    completed: 1,
    total: 1,
    category: 'exercise',
  },
  {
    id: '3',
    title: '잘 자기',
    icon: '🛏️',
    completed: 1,
    total: 1,
    category: 'sleep',
  },
  {
    id: '4',
    title: '약 챙기기',
    icon: '💊',
    completed: 1,
    total: 3,
    category: 'medicine',
  },
  {
    id: '5',
    title: '마음관리',
    icon: '💚',
    completed: 1,
    total: 1,
    category: 'health',
  },
];

const DailyMission: React.FC<DailyMissionProps> = ({
  missions = mockMissions,
}) => {
  // 완료 상태에 따른 스타일 반환
  const getMissionStatusStyle = (completed: number, total: number) => {
    const isCompleted = completed >= total;
    return {
      backgroundColor: isCompleted ? '#E8F5F0' : '#F8F9FA',
      borderColor: isCompleted ? '#00D082' : '#E9ECEF',
    };
  };

  // 텍스트 색상 반환
  const getTextColor = (completed: number, total: number) => {
    return completed >= total ? '#00D082' : '#6C757D';
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Text style={styles.header}>오늘의 미션</Text>

      {/* 미션 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.missionsContainer}
        style={styles.scrollView}
      >
        {missions.map(mission => (
          <View
            key={mission.id}
            style={[
              styles.missionCard,
              getMissionStatusStyle(mission.completed, mission.total),
            ]}
          >
            {/* 아이콘 */}
            <View style={styles.iconContainer}>
              <Text style={styles.missionIcon}>{mission.icon}</Text>
            </View>

            {/* 미션 제목 */}
            <Text
              style={[
                styles.missionTitle,
                { color: getTextColor(mission.completed, mission.total) },
              ]}
            >
              {mission.title}
            </Text>

            {/* 진행 상황 */}
            <Text
              style={[
                styles.missionProgress,
                { color: getTextColor(mission.completed, mission.total) },
              ]}
            >
              {mission.completed}/{mission.total}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* 미션 인증하기 버튼 */}
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationText}>미션 인증하기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  missionsContainer: {
    paddingRight: 32, // 마지막 아이템이 살짝 보이도록
  },
  missionCard: {
    width: 100,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  missionIcon: {
    fontSize: 20,
  },
  missionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  missionProgress: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  verificationContainer: {
    marginTop: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C757D',
  },
});

export default DailyMission;

// 사용 예시:
/*
// 1. 기본 사용 (목 데이터 사용)
<DailyMission />

// 2. 커스텀 데이터 사용
const myMissions: Mission[] = [
  {
    id: '1',
    title: '물 마시기',
    icon: '💧',
    completed: 2,
    total: 8,
    category: 'health'
  },
  // ... 더 많은 미션
];

<DailyMission 
  missions={myMissions}
  onMissionPress={(mission) => console.log('선택된 미션:', mission)}
/>

// 3. 미션 업데이트 함수 예시
const updateMissionProgress = (missionId: string, newCompleted: number) => {
  setMissions(prevMissions => 
    prevMissions.map(mission => 
      mission.id === missionId 
        ? { ...mission, completed: newCompleted }
        : mission
    )
  );
};
*/

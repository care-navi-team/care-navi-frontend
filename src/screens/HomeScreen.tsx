import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PharmacistConsultation from '../components/PharmacistConsultation';
import DailyMission from '../components/DailyMission';
import HealthConsultation from '../components/HealthConsultation';

interface HealthData {
  category: string;
  score: number;
  maxScore: number;
  color: string;
}

const HealthCheckUploadScreen: React.FC = () => {
  // 목데이터
  const healthData: HealthData[] = [
    {
      category: '심혈관 건강 점수',
      score: 80,
      maxScore: 100,
      color: '#4CAF50',
    },
    { category: '생활습관 점수', score: 50, maxScore: 100, color: '#FF9800' },
    {
      category: '소화·대사건강 점수',
      score: 70,
      maxScore: 100,
      color: '#FFC107',
    },
    {
      category: '정신·스트레스관리 점수',
      score: 40,
      maxScore: 100,
      color: '#F44336',
    },
  ];

  const overallScore = 80;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>내 건강 리포트</Text>
      </View>

      {/* 전체 건강 점수 원형 차트 */}
      <View style={styles.circleContainer}>
        <View style={styles.circleWrapper}>
          <View style={[styles.circle, { borderColor: '#4CAF50' }]}>
            <Text style={styles.circleLabel}>안성찬님의 건강점수</Text>
            <Text style={styles.circleScore}>{overallScore}</Text>
          </View>
        </View>
      </View>

      {/* 세부 건강 지표들 */}
      <View style={styles.healthList}>
        {healthData.map((item, index) => (
          <View key={index} style={styles.healthItem}>
            <View style={styles.healthHeader}>
              <Text style={styles.healthCategory}>{item.category}</Text>
              <Text style={styles.healthScore}>{item.score}점</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${(item.score / item.maxScore) * 100}%`,
                    backgroundColor: item.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* 상세 리포트 보기 버튼 */}
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>상세 리포트 보기</Text>
      </TouchableOpacity>

      <PharmacistConsultation />
      <DailyMission />
      <HealthConsultation />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  circleContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  circleWrapper: {
    position: 'relative',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  circleScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  healthList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  healthItem: {
    marginBottom: 25,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  healthCategory: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  healthScore: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    width: '100%',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
  },
  detailButton: {
    backgroundColor: '#4CAF50',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 100, // 하단 탭과 여백
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HealthCheckUploadScreen;

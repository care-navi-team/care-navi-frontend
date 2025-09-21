import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

interface SleepRecord {
  bedtime: string | null;
  wakeupTime: string | null;
  sleepDuration: number | null; // 분 단위
  date: string;
}

const SleepRoutineScreen: React.FC = () => {
  const [sleepRecord, setSleepRecord] = useState<SleepRecord>({
    bedtime: null,
    wakeupTime: null,
    sleepDuration: null,
    date: new Date().toDateString(),
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const calculateSleepDuration = (bedtime: string, wakeup: string): number => {
    const [bedHour, bedMinute] = bedtime.split(':').map(Number);
    const [wakeHour, wakeMinute] = wakeup.split(':').map(Number);

    let bedtimeMinutes = bedHour * 60 + bedMinute;
    let wakeupMinutes = wakeHour * 60 + wakeMinute;

    // 다음날로 넘어가는 경우 처리
    if (wakeupMinutes < bedtimeMinutes) {
      wakeupMinutes += 24 * 60;
    }

    return wakeupMinutes - bedtimeMinutes;
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const setBedtime = () => {
    const now = new Date();
    const timeString = formatTime(now);

    setSleepRecord(prev => {
      const newRecord = { ...prev, bedtime: timeString };

      if (newRecord.wakeupTime) {
        const duration = calculateSleepDuration(
          timeString,
          newRecord.wakeupTime,
        );
        newRecord.sleepDuration = duration;
      }

      return newRecord;
    });

    Alert.alert(
      '취침 시간 기록',
      `취침 시간이 ${timeString}로 기록되었습니다.`,
    );
  };

  const setWakeupTime = () => {
    const now = new Date();
    const timeString = formatTime(now);

    setSleepRecord(prev => {
      const newRecord = { ...prev, wakeupTime: timeString };

      if (newRecord.bedtime) {
        const duration = calculateSleepDuration(newRecord.bedtime, timeString);
        newRecord.sleepDuration = duration;
      }

      return newRecord;
    });

    Alert.alert(
      '기상 시간 기록',
      `기상 시간이 ${timeString}로 기록되었습니다.`,
    );
  };

  const resetSleepRecord = () => {
    Alert.alert('수면 기록 초기화', '오늘의 수면 기록을 초기화하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '초기화',
        style: 'destructive',
        onPress: () => {
          setSleepRecord({
            bedtime: null,
            wakeupTime: null,
            sleepDuration: null,
            date: new Date().toDateString(),
          });
        },
      },
    ]);
  };

  const getSleepQuality = (
    duration: number,
  ): { text: string; color: string } => {
    if (duration >= 420 && duration <= 540) {
      // 7-9시간
      return { text: '좋음', color: '#4CAF50' };
    } else if (duration >= 360 && duration <= 600) {
      // 6-10시간
      return { text: '보통', color: '#FF9800' };
    } else {
      return { text: '부족/과다', color: '#F44336' };
    }
  };

  const isComplete = sleepRecord.bedtime && sleepRecord.wakeupTime;
  const sleepQuality = sleepRecord.sleepDuration
    ? getSleepQuality(sleepRecord.sleepDuration)
    : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>수면 루틴</Text>
        <Text style={styles.subtitle}>
          질 좋은 수면을 위한 맞춤형 루틴입니다.
        </Text>

        {/* 현재 시간 */}
        <View style={styles.currentTimeContainer}>
          <Text style={styles.currentTimeLabel}>현재 시간</Text>
          <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
        </View>

        {/* 수면 인증 버튼들 */}
        <View style={styles.sleepSection}>
          <TouchableOpacity
            style={[
              styles.sleepButton,
              styles.bedtimeButton,
              sleepRecord.bedtime && styles.completedButton,
            ]}
            onPress={setBedtime}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>🌙</Text>
              <Text style={styles.buttonTitle}>취침 인증</Text>
              <Text style={styles.buttonSubtitle}>
                {sleepRecord.bedtime
                  ? `${sleepRecord.bedtime}에 취침`
                  : '지금 잠자리에 듭니다'}
              </Text>
              {sleepRecord.bedtime && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sleepButton,
              styles.wakeupButton,
              sleepRecord.wakeupTime && styles.completedButton,
            ]}
            onPress={setWakeupTime}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>☀️</Text>
              <Text style={styles.buttonTitle}>기상 인증</Text>
              <Text style={styles.buttonSubtitle}>
                {sleepRecord.wakeupTime
                  ? `${sleepRecord.wakeupTime}에 기상`
                  : '지금 일어났습니다'}
              </Text>
              {sleepRecord.wakeupTime && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* 수면 기록 요약 */}
        {isComplete && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>오늘의 수면 기록</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>취침 시간</Text>
              <Text style={styles.summaryValue}>{sleepRecord.bedtime}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>기상 시간</Text>
              <Text style={styles.summaryValue}>{sleepRecord.wakeupTime}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>수면 시간</Text>
              <Text style={styles.summaryValue}>
                {sleepRecord.sleepDuration
                  ? formatDuration(sleepRecord.sleepDuration)
                  : '-'}
              </Text>
            </View>

            {sleepQuality && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>수면 품질</Text>
                <Text
                  style={[styles.summaryValue, { color: sleepQuality.color }]}
                >
                  {sleepQuality.text}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* 수면 권장사항 */}
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>💡 수면 권장사항</Text>
          <Text style={styles.recommendationText}>
            • 성인 권장 수면시간: 7-9시간
          </Text>
          <Text style={styles.recommendationText}>
            • 매일 같은 시간에 잠자리에 들기
          </Text>
          <Text style={styles.recommendationText}>
            • 취침 전 1시간은 디지털 기기 사용 자제
          </Text>
          <Text style={styles.recommendationText}>
            • 규칙적인 기상 시간 유지하기
          </Text>
        </View>

        {/* 리셋 버튼 */}
        {(sleepRecord.bedtime || sleepRecord.wakeupTime) && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetSleepRecord}
          >
            <Text style={styles.resetButtonText}>수면 기록 초기화</Text>
          </TouchableOpacity>
        )}

        {/* 완료 메시지 */}
        {isComplete && (
          <View style={styles.congratsContainer}>
            <Text style={styles.congratsText}>
              ✨ 수면 기록이 완료되었습니다!
            </Text>
            <Text style={styles.congratsSubText}>
              {sleepRecord.sleepDuration &&
              sleepRecord.sleepDuration >= 420 &&
              sleepRecord.sleepDuration <= 540
                ? '충분한 수면을 취하셨네요!'
                : '다음에는 7-9시간 수면을 목표로 해보세요!'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  currentTimeContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentTimeLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  currentTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    fontFamily: 'monospace',
  },
  sleepSection: {
    gap: 20,
    marginBottom: 30,
  },
  sleepButton: {
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bedtimeButton: {
    backgroundColor: '#4A90E2',
  },
  wakeupButton: {
    backgroundColor: '#F5A623',
  },
  completedButton: {
    opacity: 0.8,
  },
  buttonContent: {
    alignItems: 'center',
    position: 'relative',
  },
  buttonIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  checkMark: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 24,
    color: 'white',
  },
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 5,
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  congratsContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'center',
  },
  congratsSubText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default SleepRoutineScreen;

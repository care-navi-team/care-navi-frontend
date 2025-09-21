import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ExerciseRoutineScreen: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseTime, setExerciseTime] = useState(30); // 기본 30초
  const intervalRef = useRef<number | null>(null);

  // 타이머 시작/정지
  const toggleTimer = () => {
    if (isRunning) {
      // 타이머 정지
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    } else {
      // 타이머 시작
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds >= exerciseTime) {
            // 시간 완료
            Alert.alert('완료!', '운동 시간이 끝났습니다!');
            setIsRunning(false);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }
  };

  // 타이머 리셋
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSeconds(0);
    setIsRunning(false);
  };

  // 운동 시간 설정
  const setTimer = (time: number) => {
    if (!isRunning) {
      setExerciseTime(time);
      setSeconds(0);
    }
  };

  // 시간 포맷팅 (MM:SS)
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 진행률 계산
  const progress = exerciseTime > 0 ? (seconds / exerciseTime) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>운동 인증</Text>
      <Text style={styles.subtitle}>
        건강한 운동 습관을 위한 맞춤형 루틴입니다.
      </Text>

      {/* 타이머 디스플레이 */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {formatTime(seconds)} / {formatTime(exerciseTime)}
        </Text>

        {/* 진행률 바 */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${Math.min(progress, 100)}%` },
            ]}
          />
        </View>
      </View>

      {/* 시간 설정 버튼들 */}
      <View style={styles.timeButtonContainer}>
        <TouchableOpacity
          style={[
            styles.timeButton,
            exerciseTime === 30 && styles.activeTimeButton,
          ]}
          onPress={() => setTimer(30)}
          disabled={isRunning}
        >
          <Text
            style={[
              styles.timeButtonText,
              exerciseTime === 30 && styles.activeTimeButtonText,
            ]}
          >
            30초
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeButton,
            exerciseTime === 60 && styles.activeTimeButton,
          ]}
          onPress={() => setTimer(60)}
          disabled={isRunning}
        >
          <Text
            style={[
              styles.timeButtonText,
              exerciseTime === 60 && styles.activeTimeButtonText,
            ]}
          >
            1분
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeButton,
            exerciseTime === 180 && styles.activeTimeButton,
          ]}
          onPress={() => setTimer(180)}
          disabled={isRunning}
        >
          <Text
            style={[
              styles.timeButtonText,
              exerciseTime === 180 && styles.activeTimeButtonText,
            ]}
          >
            3분
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.timeButton,
            exerciseTime === 300 && styles.activeTimeButton,
          ]}
          onPress={() => setTimer(300)}
          disabled={isRunning}
        >
          <Text
            style={[
              styles.timeButtonText,
              exerciseTime === 300 && styles.activeTimeButtonText,
            ]}
          >
            5분
          </Text>
        </TouchableOpacity>
      </View>

      {/* 컨트롤 버튼들 */}
      <View style={styles.controlContainer}>
        <TouchableOpacity
          style={[styles.controlButton, styles.startButton]}
          onPress={toggleTimer}
        >
          <Text style={styles.controlButtonText}>
            {isRunning ? '멈춤' : '시작'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.controlButtonText}>리셋</Text>
        </TouchableOpacity>
      </View>

      {/* 상태 메시지 */}
      <Text style={styles.statusText}>
        {isRunning
          ? '운동 중...'
          : seconds > 0
          ? '일시정지됨'
          : '운동을 시작해보세요!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  timerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  timeButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  timeButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  activeTimeButton: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTimeButtonText: {
    color: 'white',
  },
  controlContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  controlButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#FF5722',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ExerciseRoutineScreen;

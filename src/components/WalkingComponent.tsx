import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface WalkingComponentProps {
  onComplete?: () => void;
}

const WalkingComponent: React.FC<WalkingComponentProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30분 = 1800초
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
  };

  const handleStart = () => {
    if (isCompleted) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // 타이머 완료
          setIsRunning(false);
          setIsCompleted(true);
          Alert.alert(
            '🎉 운동 완료!',
            '30분 걷기를 완주하셨습니다!\n오늘도 건강하게!',
            [{ text: '확인', style: 'default' }],
          );
          if (onComplete) onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(30 * 60);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getButtonText = () => {
    if (isCompleted) return '완료';
    if (isRunning) return '일시정지';
    return timeLeft === 30 * 60 ? '30분 걷기' : '계속하기';
  };

  const getButtonStyle = () => {
    if (isCompleted) {
      return [styles.walkButton, styles.completedButton];
    }
    if (isRunning) {
      return [styles.walkButton, styles.pauseButton];
    }
    return styles.walkButton;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={isRunning ? handlePause : handleStart}
        activeOpacity={0.8}
        disabled={isCompleted}
      >
        <Text style={styles.mainText}>{getButtonText()}</Text>
        <Text style={styles.timeText}>
          {isCompleted ? '완료' : formatTime(timeLeft)}
        </Text>
      </TouchableOpacity>

      {/* 리셋 버튼 */}
      {(timeLeft < 30 * 60 || isCompleted) && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>다시 시작</Text>
        </TouchableOpacity>
      )}

      {/* 진행률 표시 */}
      {timeLeft < 30 * 60 && !isCompleted && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((30 * 60 - timeLeft) / (30 * 60)) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(((30 * 60 - timeLeft) / (30 * 60)) * 100)}% 완료
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  walkButton: {
    width: '100%',
    height: 80,
    borderRadius: 40,
    backgroundColor: '#90EE90', // 연한 초록색
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
  },
  pauseButton: {
    backgroundColor: '#FFA500', // 주황색 (일시정지)
  },
  completedButton: {
    backgroundColor: '#32CD32', // 진한 초록색 (완료)
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 20,
    marginBottom: 15,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#90EE90',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default WalkingComponent;

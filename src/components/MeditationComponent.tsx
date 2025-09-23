import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface MeditationComponentProps {
  onComplete?: () => void;
}

const MeditationComponent: React.FC<MeditationComponentProps> = ({
  onComplete,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20분 = 1200초
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
            '🧘‍♀️ 명상 완료!',
            '20분 명상을 완료하셨습니다!\n마음이 평온해지셨나요?',
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
    setTimeLeft(20 * 60);
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
    return timeLeft === 20 * 60 ? '20분 명상' : '계속하기';
  };

  const getButtonStyle = () => {
    if (isCompleted) {
      return [styles.meditationButton, styles.completedButton];
    }
    if (isRunning) {
      return [styles.meditationButton, styles.pauseButton];
    }
    return styles.meditationButton;
  };

  const getStatusText = () => {
    if (isCompleted) return '완료';
    return formatTime(timeLeft);
  };

  return (
    <View style={styles.container}>
      {/* 메인 명상 버튼 */}
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={isRunning ? handlePause : handleStart}
        activeOpacity={0.8}
        disabled={isCompleted}
      >
        <Text style={styles.mainText}>{getButtonText()}</Text>
        <Text style={styles.timeText}>{getStatusText()}</Text>
      </TouchableOpacity>

      {/* 리셋 버튼 */}
      {(timeLeft < 20 * 60 || isCompleted) && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>다시 시작</Text>
        </TouchableOpacity>
      )}

      {/* 진행률 표시 */}
      {timeLeft < 20 * 60 && !isCompleted && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((20 * 60 - timeLeft) / (20 * 60)) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(((20 * 60 - timeLeft) / (20 * 60)) * 100)}% 완료
          </Text>
        </View>
      )}

      {/* 명상 가이드 */}
      {!isCompleted && (
        <View style={styles.guideContainer}>
          <Text style={styles.guideText}>
            🧘‍♀️ 편안한 자세로 앉아 깊게 숨을 들이마시고 내쉬세요
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
  meditationButton: {
    width: '100%',
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6E6FA', // 연보라색 (라벤더)
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
    backgroundColor: '#DDA0DD', // 진한 보라색 (일시정지)
  },
  completedButton: {
    backgroundColor: '#9370DB', // 진한 보라색 (완료)
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
    marginBottom: 15,
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
    backgroundColor: '#E6E6FA',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  guideContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  guideText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default MeditationComponent;

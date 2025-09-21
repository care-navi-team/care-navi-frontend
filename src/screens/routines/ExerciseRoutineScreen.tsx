import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  // PhotoQuality,  // quality 쓰고 싶으면 import 필요
} from 'react-native-image-picker';

const ExerciseRoutineScreen: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseTime, setExerciseTime] = useState(30); // 기본 30초
  const [exerciseImages, setExerciseImages] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  // ✅ options은 여기서만 선언
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    selectionLimit: 1,
    // quality: 0.8 as PhotoQuality, // 필요 시 사용
  };

  // 타이머 시작/정지
  const toggleTimer = () => {
    if (isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds >= exerciseTime) {
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

  // 갤러리에서 사진 선택
  const addPhoto = () => {
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('사용자가 이미지 선택을 취소했습니다.');
        return;
      }

      if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setExerciseImages(prev => [...prev, imageUri]);
          Alert.alert('성공!', '운동 인증 사진이 추가되었습니다! 💪');
        }
      }
    });
  };

  // 사진 삭제
  const removePhoto = (index: number) => {
    Alert.alert('사진 삭제', '이 사진을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setExerciseImages(prev => prev.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progress = exerciseTime > 0 ? (seconds / exerciseTime) * 100 : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>운동 인증</Text>
        <Text style={styles.subtitle}>
          건강한 운동 습관을 위한 맞춤형 루틴입니다.
        </Text>

        {/* 타이머 디스플레이 */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {formatTime(seconds)} / {formatTime(exerciseTime)}
          </Text>
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
          {[30, 60, 180, 300].map(time => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                exerciseTime === time && styles.activeTimeButton,
              ]}
              onPress={() => setTimer(time)}
              disabled={isRunning}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  exerciseTime === time && styles.activeTimeButtonText,
                ]}
              >
                {time < 60 ? `${time}초` : `${time / 60}분`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 컨트롤 버튼 */}
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

        <Text style={styles.statusText}>
          {isRunning
            ? '운동 중...'
            : seconds > 0
            ? '일시정지됨'
            : '운동을 시작해보세요!'}
        </Text>

        {/* 사진 업로드 */}
        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>운동 인증 사진</Text>
          <TouchableOpacity style={styles.addPhotoButton} onPress={addPhoto}>
            <Text style={styles.addPhotoButtonText}>📷 사진 추가하기</Text>
          </TouchableOpacity>

          {exerciseImages.length > 0 ? (
            <View style={styles.photoGrid}>
              <Text style={styles.photoCount}>
                업로드된 사진: {exerciseImages.length}개
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {exerciseImages.map((imageUri, index) => (
                  <View key={index} style={styles.photoWrapper}>
                    <Image source={{ uri: imageUri }} style={styles.photo} />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => removePhoto(index)}
                    >
                      <Text style={styles.deleteButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.noPhotoContainer}>
              <Text style={styles.noPhotoText}>
                운동하는 모습을 사진으로 인증해보세요! 💪
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
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
  progressBar: { height: '100%', backgroundColor: '#2196F3', borderRadius: 4 },
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
  activeTimeButton: { backgroundColor: '#2196F3', borderColor: '#2196F3' },
  timeButtonText: { fontSize: 14, color: '#666', fontWeight: '600' },
  activeTimeButtonText: { color: 'white' },
  controlContainer: { flexDirection: 'row', gap: 20, marginBottom: 20 },
  controlButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  startButton: { backgroundColor: '#4CAF50' },
  resetButton: { backgroundColor: '#FF5722' },
  controlButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  statusText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  photoSection: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  addPhotoButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  addPhotoButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  photoGrid: { marginTop: 10 },
  photoCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  photoWrapper: { position: 'relative', marginRight: 15 },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF5722',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  noPhotoContainer: { padding: 20, alignItems: 'center' },
  noPhotoText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ExerciseRoutineScreen;

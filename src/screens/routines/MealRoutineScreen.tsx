import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface MealRecord {
  imageUri: string;
  timestamp: string;
}

interface MealData {
  breakfast: MealRecord | null;
  lunch: MealRecord | null;
  dinner: MealRecord | null;
}

const MealRoutineScreen: React.FC = () => {
  const [mealData, setMealData] = useState<MealData>({
    breakfast: null,
    lunch: null,
    dinner: null,
  });

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}월 ${day}일`;
  };

  const selectMealPhoto = (mealType: keyof MealData) => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        return;
      }

      if (response.errorMessage) {
        Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          const now = new Date();
          const timestamp = `${formatDate(now)} ${formatTime(now)}`;

          setMealData(prev => ({
            ...prev,
            [mealType]: {
              imageUri,
              timestamp,
            },
          }));

          const mealNames = {
            breakfast: '아침',
            lunch: '점심',
            dinner: '저녁',
          };

          Alert.alert(
            '인증 완료!',
            `${mealNames[mealType]} 식사가 인증되었습니다!`,
          );
        }
      }
    });
  };

  const removeMealPhoto = (mealType: keyof MealData) => {
    const mealNames = {
      breakfast: '아침',
      lunch: '점심',
      dinner: '저녁',
    };

    Alert.alert(
      '인증 취소',
      `${mealNames[mealType]} 식사 인증을 취소하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          style: 'destructive',
          onPress: () => {
            setMealData(prev => ({
              ...prev,
              [mealType]: null,
            }));
          },
        },
      ],
    );
  };

  const renderMealButton = (
    mealType: keyof MealData,
    title: string,
    color: string,
    bgColor: string,
  ) => {
    const meal = mealData[mealType];
    const isCompleted = meal !== null;

    return (
      <View style={styles.mealContainer}>
        <TouchableOpacity
          style={[
            styles.mealButton,
            { backgroundColor: bgColor },
            isCompleted && styles.completedButton,
          ]}
          onPress={() => selectMealPhoto(mealType)}
        >
          <Text style={[styles.mealButtonText, { color }]}>{title}</Text>
          {isCompleted && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>

        {meal && (
          <View style={styles.mealRecord}>
            <Image source={{ uri: meal.imageUri }} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <Text style={styles.timestampText}>{meal.timestamp}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeMealPhoto(mealType)}
              >
                <Text style={styles.removeButtonText}>인증 취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const completedMeals = Object.values(mealData).filter(
    meal => meal !== null,
  ).length;
  const completionRate = Math.round((completedMeals / 3) * 100);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>식이 루틴</Text>
        <Text style={styles.subtitle}>
          균형잡힌 식단을 위한 맞춤형 루틴입니다.
        </Text>

        {/* 진행 상황 */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>오늘의 식사 인증</Text>
          <Text style={styles.progressText}>
            {completedMeals}/3 완료 ({completionRate}%)
          </Text>
          <View style={styles.progressBarContainer}>
            <View
              style={[styles.progressBar, { width: `${completionRate}%` }]}
            />
          </View>
        </View>

        {/* 식사 인증 버튼들 */}
        <View style={styles.mealsSection}>
          {renderMealButton('breakfast', '아침 인증', '#fff', '#A8E6CF')}
          {renderMealButton('lunch', '점심 인증', '#fff', '#FFD93D')}
          {renderMealButton('dinner', '저녁 인증', '#fff', '#FF8A95')}
        </View>

        {/* 완료 메시지 */}
        {completedMeals === 3 && (
          <View style={styles.congratsContainer}>
            <Text style={styles.congratsText}>
              🎉 오늘 식사를 모두 완료했습니다!
            </Text>
            <Text style={styles.congratsSubText}>
              균형잡힌 하루를 보내셨네요!
            </Text>
          </View>
        )}

        {/* 인증 기록 요약 */}
        {completedMeals > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>오늘의 식사 기록</Text>
            {Object.entries(mealData).map(([key, meal]) => {
              const mealNames = {
                breakfast: '아침',
                lunch: '점심',
                dinner: '저녁',
              };

              return meal ? (
                <View key={key} style={styles.summaryItem}>
                  <Text style={styles.summaryMealName}>
                    {mealNames[key as keyof MealData]}
                  </Text>
                  <Text style={styles.summaryTime}>{meal.timestamp}</Text>
                </View>
              ) : null;
            })}
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
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  mealsSection: {
    gap: 20,
    marginBottom: 30,
  },
  mealContainer: {
    gap: 15,
  },
  mealButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedButton: {
    opacity: 0.8,
  },
  mealButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkMark: {
    position: 'absolute',
    right: 20,
    fontSize: 24,
    color: '#fff',
  },
  mealRecord: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  mealInfo: {
    flex: 1,
  },
  timestampText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  congratsContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
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
  summaryContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryMealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  summaryTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default MealRoutineScreen;

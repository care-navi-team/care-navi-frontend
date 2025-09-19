import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/navigation';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const routines = [
    {
      id: 1,
      title: '루틴 예시(운동)',
      screen: 'ExerciseRoutine' as keyof RootStackParamList,
    },
    {
      id: 2,
      title: '루틴 예시(식이)',
      screen: 'MealRoutine' as keyof RootStackParamList,
    },
    {
      id: 3,
      title: '루틴 예시(수면)',
      screen: 'SleepRoutine' as keyof RootStackParamList,
    },
    {
      id: 4,
      title: '루틴 예시(복약)',
      screen: 'MedicineRoutine' as keyof RootStackParamList,
    },
    {
      id: 5,
      title: '루틴 예시(스트레스)',
      screen: 'StressRoutine' as keyof RootStackParamList,
    },
  ];

  return (
    <View>
      <Text>나의 맞춤형 생활습관 루틴 리스트</Text>

      {routines.map(routine => (
        <TouchableOpacity
          key={routine.id}
          onPress={() => navigation.navigate(routine.screen)}
        >
          <Text>{routine.title}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => navigation.navigate('HealthCheckUpload')}
      >
        <Text>건강검진 결과 업로드</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;

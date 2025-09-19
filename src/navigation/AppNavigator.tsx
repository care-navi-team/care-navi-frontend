import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/navigation';

import MainScreen from '../screens/MainScreen';
import HealthCheckUploadScreen from '../screens/HealthCheckUploadScreen';

// 루틴 화면들
import ExerciseRoutineScreen from '../screens/routines/ExerciseRoutineScreen';
import MealRoutineScreen from '../screens/routines/MealRoutineScreen';
import SleepRoutineScreen from '../screens/routines/SleepRoutineScreen';
import MedicineRoutineScreen from '../screens/routines/MedicineRoutineScreen';
import StressRoutineScreen from '../screens/routines/StressRoutineScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="HealthCheckUpload"
          component={HealthCheckUploadScreen}
        />
        <Stack.Screen
          name="ExerciseRoutine"
          component={ExerciseRoutineScreen}
        />
        <Stack.Screen name="MealRoutine" component={MealRoutineScreen} />
        <Stack.Screen name="SleepRoutine" component={SleepRoutineScreen} />
        <Stack.Screen
          name="MedicineRoutine"
          component={MedicineRoutineScreen}
        />
        <Stack.Screen name="StressRoutine" component={StressRoutineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

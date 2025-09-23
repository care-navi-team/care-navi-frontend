import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HealthCheckUploadScreen from '../screens/HealthCheckUploadScreen';
// import SurveyScreen from '../screens/SurveyScreen'; // 2단계에서 만들 예정

export type HealthStackParamList = {
  HealthCheckUpload: undefined;
  Survey: undefined;
};

const Stack = createStackNavigator<HealthStackParamList>();

const HealthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F8E8E8',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="HealthCheckUpload"
        component={HealthCheckUploadScreen}
        options={{
          headerTitle: '건강리포트',
          headerLeft: () => null,
        }}
      />
      {/* 
      <Stack.Screen 
        name="Survey" 
        component={SurveyScreen}
        options={{ 
          headerTitle: '생활습관 설문',
        }}
      />
      */}
    </Stack.Navigator>
  );
};

export default HealthStackNavigator;

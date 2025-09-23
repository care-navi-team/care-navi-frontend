import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import HealthCheckUploadScreen from '../screens/HealthCheckUploadScreen';
import MissionScreen from '../screens/MissionScreen';
import HealthTalkScreen from '../screens/HealthTalkScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          // 공통 헤더 스타일 설정
          headerShown: true, // 헤더 보이게 설정
          headerStyle: {
            elevation: 0, // Android 그림자 제거
            shadowOpacity: 0, // iOS 그림자 제거
            borderBottomWidth: 0, // 하단 경계선 제거
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333',
          },
          headerTitleAlign: 'center', // 제목 가운데 정렬
          // 탭바 스타일 (기존과 동일)
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 90,
            paddingBottom: 25,
            paddingTop: 10,
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#666',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'normal',
          },
          tabBarIconStyle: {
            display: 'none',
          },
        }}
      >
        <Tab.Screen
          name="홈"
          component={HomeScreen}
          options={{
            tabBarIcon: () => null,
            headerTitle: '홈', // 헤더 제목
          }}
        />
        <Tab.Screen
          name="건강리포트"
          component={HealthCheckUploadScreen}
          options={{
            tabBarIcon: () => null,
            headerTitle: '건강리포트', // 헤더 제목
          }}
        />
        <Tab.Screen
          name="미션인증"
          component={MissionScreen}
          options={{
            tabBarIcon: () => null,
            headerTitle: '미션인증', // 헤더 제목
          }}
        />
        <Tab.Screen
          name="건강상담"
          component={HealthTalkScreen}
          options={{
            tabBarIcon: () => null,
            headerTitle: '건강상담', // 헤더 제목
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;

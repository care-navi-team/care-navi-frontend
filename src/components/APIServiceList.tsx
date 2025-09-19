import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const APIServiceList: React.FC = () => {
  // 카카오톡 연동 테스트
  const connectKakao = async (): Promise<void> => {
    try {
      Alert.alert('카카오톡 연동', '카카오톡 로그인을 시작합니다...');

      // 실제로는 여기서 카카오 SDK 사용
      // const result = await KakaoLogin.login();

      // 임시 테스트용
      setTimeout(() => {
        Alert.alert('성공', '카카오톡 연동이 완료되었습니다!');
      }, 2000);
    } catch (error) {
      console.log('카카오 연동 오류:', error);
      Alert.alert('오류', '카카오톡 연동 중 문제가 발생했습니다.');
    }
  };

  // 네이버 연동 테스트
  const connectNaver = async (): Promise<void> => {
    try {
      Alert.alert('네이버 연동', '네이버 로그인을 시작합니다...');

      // 실제로는 여기서 네이버 SDK 사용
      // const result = await NaverLogin.login();

      setTimeout(() => {
        Alert.alert('성공', '네이버 연동이 완료되었습니다!');
      }, 2000);
    } catch (error) {
      console.log('네이버 연동 오류:', error);
      Alert.alert('오류', '네이버 연동 중 문제가 발생했습니다.');
    }
  };

  // PASS 연동 테스트
  const connectPASS = async (): Promise<void> => {
    try {
      Alert.alert('PASS 연동', 'PASS 앱으로 이동합니다...');

      // 실제로는 딥링크나 웹뷰 사용
      // Linking.openURL('pass://healthcheck');

      setTimeout(() => {
        Alert.alert('성공', 'PASS 연동이 완료되었습니다!');
      }, 2000);
    } catch (error) {
      console.log('PASS 연동 오류:', error);
      Alert.alert('오류', 'PASS 연동 중 문제가 발생했습니다.');
    }
  };

  // PAYCO 연동 테스트
  const connectPAYCO = async (): Promise<void> => {
    try {
      Alert.alert('PAYCO 연동', 'PAYCO 로그인을 시작합니다...');

      setTimeout(() => {
        Alert.alert('성공', 'PAYCO 연동이 완료되었습니다!');
      }, 2000);
    } catch (error) {
      console.log('PAYCO 연동 오류:', error);
      Alert.alert('오류', 'PAYCO 연동 중 문제가 발생했습니다.');
    }
  };

  return (
    <View>
      <Text>자동 인증 연동</Text>
      <Text>
        국가건강보험 API 인증을 통해 간편하게 결과를 불러올 수 있습니다.
      </Text>

      {/* 카카오톡 버튼 */}
      <TouchableOpacity onPress={connectKakao}>
        <Text>카카오톡 연동</Text>
      </TouchableOpacity>

      {/* 네이버 버튼 */}
      <TouchableOpacity onPress={connectNaver}>
        <Text>네이버 연동</Text>
      </TouchableOpacity>

      {/* PASS 버튼 */}
      <TouchableOpacity onPress={connectPASS}>
        <Text>PASS 연동</Text>
      </TouchableOpacity>

      {/* PAYCO 버튼 */}
      <TouchableOpacity onPress={connectPAYCO}>
        <Text>PAYCO 연동</Text>
      </TouchableOpacity>

      {/* 기타 서비스들 */}
      <TouchableOpacity
        onPress={() => Alert.alert('준비중', '해당 서비스는 준비중입니다.')}
      >
        <Text>기타 서비스들</Text>
      </TouchableOpacity>

      {/* 하단 버튼 */}
      <TouchableOpacity
        onPress={() => Alert.alert('확인', '모두 동의하고 인증 요청')}
      >
        <Text>모두 동의하고 인증 요청</Text>
      </TouchableOpacity>
    </View>
  );
};

export default APIServiceList;

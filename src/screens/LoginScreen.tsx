import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert('오류', '전화번호와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 로그인 처리 로직 (나중에 API 연결)
    Alert.alert('로그인', `전화번호: ${phoneNumber}`);
  };

  const handleSignup = () => {
    navigation.navigate('SignUp'); // 회원가입 화면으로 이동
  };

  const handleKakaoLogin = async () => {
    Alert.alert('카카오 로그인', '아직 설정 중입니다!');
  };

  return (
    <View>
      <Text>1) ID : 전화번호</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="전화번호를 입력하세요"
        keyboardType="phone-pad"
      />

      <Text>2) PW : 비밀번호</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignup}>
        <Text>3) 회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleKakaoLogin}>
        <Text>4) 카카오톡 간편인증</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

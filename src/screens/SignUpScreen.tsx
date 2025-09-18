import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type SignUpScreenNavigationProp = NavigationProp<RootStackParamList, 'SignUp'>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const SignUpScreen = ({ navigation }: Props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const handleSignUp = () => {
    if (!id || !password || !name) {
      Alert.alert('필수 항목을 입력해주세요');
      return;
    }

    console.log({ id, password, name, birthDate, gender });
    Alert.alert('회원가입 완료');
    navigation.goBack();
  };

  return (
    <View>
      <Text>1) ID : 전화번호</Text>
      <TextInput
        value={id}
        onChangeText={setId}
        placeholder="전화번호"
        keyboardType="phone-pad"
      />

      <Text>2) PW : 비밀번호</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호"
        secureTextEntry
      />

      <Text>3) 이름</Text>
      <TextInput value={name} onChangeText={setName} placeholder="이름" />

      <Text>4) 생년월일</Text>
      <TextInput
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="생년월일"
      />

      <Text>5) 성별</Text>
      <TouchableOpacity onPress={() => setGender('남성')}>
        <Text>남성 {gender === '남성' ? '✓' : ''}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender('여성')}>
        <Text>여성 {gender === '여성' ? '✓' : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ProfileSetup: undefined;
  Main: undefined;
};

type ProfileSetupScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'ProfileSetup'
>;

interface Props {
  navigation: ProfileSetupScreenNavigationProp;
}

const ProfileSetupScreen = ({ navigation }: Props) => {
  const [jobType, setJobType] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [workType, setWorkType] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const jobTypes = [
    '현장직',
    '사무직',
    '운전자',
    '서비스업',
    '의료진',
    '교육자',
    '기타',
  ];

  const workTypes = [
    '주간 근무',
    '야간 근무',
    '교대 근무',
    '재택/원격 근무',
    '외근/출장 근무',
    '프리랜서/유동',
    '무직/구직 중',
  ];

  const handleComplete = () => {
    if (!jobType || !workType) {
      Alert.alert('필수 항목을 선택해주세요');
      return;
    }

    console.log({
      jobType,
      jobTitle,
      workType,
      additionalInfo,
    });

    Alert.alert('프로필 설정 완료', '메인 화면으로 이동합니다', [
      { text: '확인', onPress: () => navigation.navigate('Main') },
    ]);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
        프로필 설정
      </Text>

      {/* 직업군 */}
      <Text style={{ fontSize: 16, marginBottom: 10 }}>직업군</Text>
      <View style={{ marginBottom: 20 }}>
        {jobTypes.map(job => (
          <TouchableOpacity
            key={job}
            onPress={() => setJobType(job)}
            style={{
              backgroundColor: jobType === job ? '#007bff' : '#f0f0f0',
              padding: 15,
              marginBottom: 8,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: jobType === job ? 'white' : 'black',
                textAlign: 'center',
              }}
            >
              {job}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 기타 직업명 */}
      <Text style={{ fontSize: 16, marginBottom: 10 }}>기타 직업명</Text>
      <TextInput
        value={jobTitle}
        onChangeText={setJobTitle}
        placeholder="기타 직업명"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          backgroundColor: '#f9f9f9',
        }}
      />

      {/* 근무형태 */}
      <Text style={{ fontSize: 16, marginBottom: 10 }}>근무형태</Text>
      <View style={{ marginBottom: 20 }}>
        {workTypes.map(work => (
          <TouchableOpacity
            key={work}
            onPress={() => setWorkType(work)}
            style={{
              backgroundColor: workType === work ? '#007bff' : '#f0f0f0',
              padding: 15,
              marginBottom: 8,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: workType === work ? 'white' : 'black',
                textAlign: 'center',
              }}
            >
              {work}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 기타 직장정보 */}
      <Text style={{ fontSize: 16, marginBottom: 10 }}>기타 직장정보</Text>
      <TextInput
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        placeholder="기타 직장정보"
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 15,
          borderRadius: 8,
          marginBottom: 30,
          backgroundColor: '#f9f9f9',
          height: 100,
          textAlignVertical: 'top',
        }}
      />

      {/* 확인 버튼 */}
      <TouchableOpacity
        onPress={handleComplete}
        style={{
          backgroundColor: '#007bff',
          padding: 20,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 50,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          확인
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileSetupScreen;

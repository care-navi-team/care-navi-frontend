import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import APIServiceList from '../components/APIServiceList';

const HealthCheckUploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);

  // PDF 파일 선택 함수
  const selectPDFFile = async (): Promise<void> => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf], // PDF만 선택 가능
      });

      console.log('선택된 파일:', result);
      setSelectedFile(result);
      Alert.alert('파일 선택 완료', `${result.name} 파일이 선택되었습니다.`);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('사용자가 파일 선택을 취소했습니다.');
      } else {
        console.log('파일 선택 중 오류 발생:', error);
        Alert.alert('오류', '파일 선택 중 문제가 발생했습니다.');
      }
    }
  };

  // 모든 파일 타입 선택 함수 (이미지, PDF 등)
  const selectAnyFile = async (): Promise<void> => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles], // 모든 파일 타입
      });

      console.log('선택된 파일:', result);
      setSelectedFile(result);
      Alert.alert('파일 선택 완료', `${result.name} 파일이 선택되었습니다.`);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('사용자가 파일 선택을 취소했습니다.');
      } else {
        console.log('파일 선택 중 오류 발생:', error);
        Alert.alert('오류', '파일 선택 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>국가검진결과 업로드</Text>
        <Text>
          고객님의 건강검진 결과를 불러와 맞춤형 건강관리를 시작해보세요.
        </Text>

        {/* PDF 업로드 버튼 */}
        <TouchableOpacity onPress={selectPDFFile}>
          <Text>PDF 업로드</Text>
        </TouchableOpacity>

        {/* 사진 업로드 버튼 */}
        <TouchableOpacity onPress={selectAnyFile}>
          <Text>사진 업로드</Text>
        </TouchableOpacity>

        {/* 선택된 파일 정보 표시 */}
        {selectedFile && (
          <View>
            <Text>선택된 파일:</Text>
            <Text>파일명: {selectedFile.name}</Text>
            <Text>
              크기: {(selectedFile.size! / 1024 / 1024).toFixed(2)} MB
            </Text>
            <Text>타입: {selectedFile.type}</Text>
          </View>
        )}
        <APIServiceList />
      </View>
    </ScrollView>
  );
};

export default HealthCheckUploadScreen;

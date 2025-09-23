import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const HealthCheckUploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);

  // 목 데이터로 파일이 선택된 상태 시뮬레이션
  const [hasFile, setHasFile] = useState(false);

  // PDF 파일 선택 함수
  const selectPDFFile = async (): Promise<void> => {
    try {
      // 목 데이터로 파일 선택 시뮬레이션
      const mockFile: DocumentPickerResponse = {
        uri: 'file://mock/path/건강검진결과(파일이름).pdf',
        type: 'application/pdf',
        name: '건강검진결과(파일이름).pdf',
        size: 20971520, // 20MB
        fileCopyUri: null,
      };

      setSelectedFile(mockFile);
      setHasFile(true);
      Alert.alert('파일 선택 완료', `${mockFile.name} 파일이 선택되었습니다.`);
    } catch (error) {
      console.log('파일 선택 중 오류 발생:', error);
      Alert.alert('오류', '파일 선택 중 문제가 발생했습니다.');
    }
  };

  // 사진 파일 선택 함수
  const selectImageFile = async (): Promise<void> => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      console.log('선택된 파일:', result);
      setSelectedFile(result);
      setHasFile(true);
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

  const handleSurveyMove = () => {
    Alert.alert('설문으로 이동', '설문 페이지로 이동합니다.');
  };

  const handleSurveySkip = () => {
    Alert.alert('설문 건너뛰기', '설문을 건너뛰고 다음 단계로 진행합니다.');
  };

  const removeFile = () => {
    setSelectedFile(null);
    setHasFile(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 메인 타이틀 */}
          <Text style={styles.mainTitle}>건강검진 결과 등록하기</Text>

          {/* 파일이 선택된 경우 파일 정보 표시 */}
          {hasFile && selectedFile && (
            <View style={styles.fileInfoContainer}>
              <View style={styles.fileIcon}>
                <Text style={styles.fileIconText}>📄</Text>
              </View>
              <View style={styles.fileDetails}>
                <Text style={styles.fileName}>{selectedFile.name}</Text>
                <Text style={styles.fileSize}>
                  {selectedFile.size
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(0)} MB`
                    : '20 MB'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={removeFile}
              >
                <Text style={styles.deleteButtonText}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 파일이 없는 경우 안내 메시지 */}
          {!hasFile && (
            <Text style={styles.noFileMessage}>
              아직 등록된 건강검진 결과가 없어요
            </Text>
          )}

          {/* 업로드 버튼들 */}
          <View style={styles.uploadButtonsContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={selectImageFile}
            >
              <Text style={styles.uploadButtonText}>사진 업로드</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={selectPDFFile}
            >
              <Text style={styles.uploadButtonText}>PDF 업로드</Text>
            </TouchableOpacity>
          </View>

          {/* 하단 섹션 */}
          <View style={styles.bottomSection}>
            {!hasFile ? (
              <>
                <Text style={styles.questionText}>
                  건강검진 결과 파일이 없으신가요?
                </Text>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() =>
                    Alert.alert('다운로드', '건강보험공단에서 다운로드합니다.')
                  }
                >
                  <Text style={styles.downloadButtonText}>
                    건강보험공단에서 다운로드
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.surveyDescription}>
                  생활습관 설문으로 건강분석이 더 정확해져요
                </Text>

                <TouchableOpacity
                  style={styles.surveyButton}
                  onPress={handleSurveyMove}
                >
                  <Text style={styles.surveyButtonText}>설문으로 이동</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={handleSurveySkip}
                >
                  <Text style={styles.skipButtonText}>설문 건너뛰기</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 44, // backButton과 같은 너비
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  fileIcon: {
    marginRight: 15,
  },
  fileIconText: {
    fontSize: 24,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  noFileMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
    gap: 15,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    paddingVertical: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomSection: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  surveyDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  surveyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  surveyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  skipButton: {
    paddingVertical: 15,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
});

export default HealthCheckUploadScreen;

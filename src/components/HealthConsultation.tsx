import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface HealthConsultationProps {
  onConsultationPress?: () => void;
}

const HealthConsultation: React.FC<HealthConsultationProps> = ({
  onConsultationPress,
}) => {
  const handleConsultationPress = () => {
    if (onConsultationPress) {
      onConsultationPress();
    } else {
      // 기본 동작 (예: 네비게이션)
      console.log('나만의 상담 페이지로 이동');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* 왼쪽 텍스트 영역 */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>전문가에게 받는</Text>
          <Text style={styles.subTitle}>맞춤 건강 컨설팅</Text>

          <TouchableOpacity
            style={styles.consultButton}
            onPress={handleConsultationPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>나만의 상담 준비하기</Text>
          </TouchableOpacity>
        </View>

        {/* 오른쪽 약 이미지 */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/medicine.png')} // 실제 이미지 경로로 변경
            style={styles.pillsImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5F0',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingVertical: 24,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
    lineHeight: 28,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 20,
    lineHeight: 28,
  },
  consultButton: {
    backgroundColor: '#00D082',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#00D082',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    width: 150,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillsImage: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '15deg' }],
  },
});

export default HealthConsultation;

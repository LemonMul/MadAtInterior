import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, router } from 'expo-router';
import Colors from '@/constants/Colors';

interface BackButtonProps {
  color?: string;
  router?: typeof router;
}

const BackButton: React.FC<BackButtonProps> = ({ color, router }) => {
  const defaultRouter = useRouter();
  const currentRouter = router || defaultRouter;

  const handleBack = () => {
    currentRouter.back();
  };

  return (
    <TouchableOpacity onPress={handleBack} style={styles.button}>
      <Ionicons name="arrow-back" size={24} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default BackButton;

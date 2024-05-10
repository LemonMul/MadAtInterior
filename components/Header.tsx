import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, router } from 'expo-router';
import Colors from '@/constants/Colors';
import BackButton from './BackButton';

interface BackButtonProps {
  color?: string;
  router?: typeof router;
  title?: string;
}

const Header: React.FC<BackButtonProps> = ({ color, router, title = '' }) => {
  const defaultRouter = useRouter();
  const currentRouter = router || defaultRouter;

  const handleBack = () => {
    currentRouter.back();
  };

  return (
    <View style={styles.header}>
      <BackButton color={color} router={router} />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;

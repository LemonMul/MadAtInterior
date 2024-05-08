import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
// 10% of window height
const paddingTop = height * 0.1;

export default {
  paddingTop,
  fullPageMargin: 20,
  iconSizeLarge: 28,
  iconSizeMiddle: 16,
  iconSizeSmall: 10,
};

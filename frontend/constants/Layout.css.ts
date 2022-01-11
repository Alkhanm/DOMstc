import { Appearance, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isDarkTheme = Appearance.getColorScheme() === "dark"

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isDarkTheme
};

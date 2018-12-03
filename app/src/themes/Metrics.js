import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const originScreenW = 375;
const originScreenH = 667;

const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  baseMargin: 13,
  smallMargin: 5,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'android' ? 56 : 64,
  buttonRadius: 4,
  icons: {
    normal: 22,
    large: 26
  },
  button: {
    large: 80,
    medium: 60
  },
  iconSize: 24,
  fabButtonSize: 42,
  ratioH: height / originScreenH,
  ratioW: width / originScreenW
};

export default metrics;

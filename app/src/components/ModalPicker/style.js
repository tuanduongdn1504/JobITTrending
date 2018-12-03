import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = 400;

export default StyleSheet.create({
  overlayStyle: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },

  optionContainer: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.9,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignSelf: 'center',
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 68
  },

  cancelContainer: {
    width: width * 0.9,
    height: 100,
    alignSelf: 'center',
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 72
  },

  selectStyle: {
    width: width - 34,
    flexDirection: 'row',
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8.25,
    paddingLeft: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,1)'
  },

  selectTextStyle: {
    textAlign: 'center',
    color: 'grey',
    fontSize: FONT_SIZE,
    width: 300
  },

  cancelStyle: {
    borderRadius: 8,
    width: width * 0.9,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: PADDING
  },

  cancelTextStyle: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18
  },

  optionStyle: {
    padding: PADDING,
    height: 60,
    justifyContent: 'center'
  },

  optionTextStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: HIGHLIGHT_COLOR
  },

  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE
  },
  divider: {
    height: 2,
    backgroundColor: '#ccc',
    flex: 1
  }
});

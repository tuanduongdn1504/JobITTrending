import { StyleSheet } from 'react-native';

let style = StyleSheet.create({
  dateTouch: {
    width: 160
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center'
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    width: 160,
    flexDirection: 'row',
    height: 48,
    borderWidth: 1,
    borderColor: '#CCD5D8',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  dateText: {
    color: '#333'
  },
  placeholderText: {
    color: '#c9c9c9'
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98'
  },
  btnTextCancel: {
    color: '#666'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee'
  }
});

export default style;

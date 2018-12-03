import React from 'react';
import {
  View, StyleSheet, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollViewUI = props => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={[
        props.center && styles.center,
        props.contentContainerStyle && props.contentContainerStyle,
      ]}
      style={props.style}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>{props.children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KeyboardAwareScrollViewUI;

import React from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';
import Button from './Button';

const SearchInput = ({
  style,
  unFocusBackground,
  isFocus,
  isShadow,
  onChange,
  onSearch,
  onFocus,
  onClose
}) => {
  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.contentInput,
          unFocusBackground && {
            backgroundColor: !isFocus ? unFocusBackground : Colors.lightDivider
          },
          isShadow && styles.shadow
        ]}
      >
        <Icon name="md-search" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Type something..."
          placeholderTextColor={Colors.grey}
          returnKeyType="search"
          onChange={event => {
            onChange(event.nativeEvent.text);
          }}
          onSubmitEditing={onSearch}
          onFocus={onFocus}
        />
      </View>
      {isFocus && (
        <Button
          style={styles.button}
          textStyle={styles.txtButton}
          endColor="transparent"
          startColor="transparent"
          onPress={() => {
            Keyboard.dismiss();
            onClose && onClose();
          }}
          buttonTitle="Cancel"
        />
      )}
    </View>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  isShadow: PropTypes.bool,
  unFocusBackground: PropTypes.string,
  onClose: PropTypes.func,
  isFocus: PropTypes.bool,
  onSearch: PropTypes.func,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 16
  },
  contentInput: {
    flex: 1,
    paddingLeft: 16,
    marginRight: 5,
    borderRadius: 22,
    height: 40,
    backgroundColor: Colors.lightDivider,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4
  },
  input: {
    flex: 1,
    color: Colors.grayBorder,
    fontSize: 17,
    height: 40,
    paddingHorizontal: 10
  },
  icon: {
    color: Colors.divider
  },
  button: {
    height: 40,
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
  txtButton: {
    fontSize: 17,
    color: Colors.primary
  }
});

export default SearchInput;

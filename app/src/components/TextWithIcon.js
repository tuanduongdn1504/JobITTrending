import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dana-queue';
import CircleIcon from './CircleIcon';
import Text from './Text';
import { Fonts, Colors } from '../themes';
import { types, size } from '../themes/Fonts';

const TextWithIcon = ({
  text,
  icon,
  color,
  isCircle,
  style,
  textStyle,
  subText
}) => {
  return (
    <View style={[styles.row, style]}>
      {isCircle ? (
        <CircleIcon
          iconName={icon}
          iconSize={14}
          // iconColor={Colors.default}
          borderColor={color}
          borderWidth={1}
          size={30}
          style={{ marginRight: 15 }}
        />
      ) : (
        <Icon
          name={icon}
          // color={Colors.primary}
          size={20}
          style={{ marginRight: 15 }}
        />
      )}
      <View style={styles.vText}>
        <Text
          style={(type = 'small')}
          style={styles.text}
          color={Colors.primaryText}
        >
          {text}
        </Text>
        {subText ? <Text>{subText}</Text> : null}
      </View>
    </View>
  );
};

TextWithIcon.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCircle: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  subText: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

TextWithIcon.defaultProps = {
  isCircle: true
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 15
  },
  text: {
    fontFamily: Fonts.type.light,
    fontSize: size.small
  },
  vText: {
    justifyContent: 'center',
    flex: 1
  }
});

export default TextWithIcon;

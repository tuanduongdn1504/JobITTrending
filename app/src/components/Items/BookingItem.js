import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/dana-queue';
import HeaderRow from '../HeaderRow';
import TextWithIcon from '../TextWithIcon';
import ContentItemView from '../ContentItemView';
import { Fonts, Colors } from '../../themes';
import {
  formatDateRange,
  timeToNow,
  formatMoney,
  formatDate
} from '../../utils/textUtils';
import Text from '../Text';
import { types, size } from '../../themes/Fonts';

const BookingItem = props => {
  const { time, numerical, status, office } = props.item;
  return (
    <TouchableHighlight
      underlayColor="transparent"
      accessibilityTraits="button"
      onPress={() => props.onPress()}
    >
      <ContentItemView style={styles.container}>
        <View style={styles.vBookingContent}>
          <View style={styles.leftView}>
            <Text
              style={(type = 'headline')}
              // style={[styles.topLeftLabel]}
              color={Colors.primaryText}
            >
              {office}
            </Text>
          </View>
          <Text
            style={(type = 'small')}
            style={[styles.txtSignup, styles.rightView, styles.topRightLabel]}
            color={Colors.primaryText}
          >
            Số thứ tự:{numerical}
          </Text>
        </View>
        <View style={styles.vBookingContent}>
          <TextWithIcon
            style={styles.leftView}
            color={Colors.blue}
            icon="ic-calendar"
            // textStyle={styles.textStyle}
            text={formatDate(time)}
          />
          {/* <TextWithIcon
            style={styles.rightView}
            color={Colors.red}
            icon="ic-calendar"
            // textStyle={styles.textStyle}
            subText={props.item.office}
          /> */}
        </View>
      </ContentItemView>
    </TouchableHighlight>
  );
};

BookingItem.propTypes = {
  onPress: PropTypes.func,
  item: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingVertical: 15,
    marginVertical: 0,
    marginTop: 10,
    backgroundColor: Colors.default
  },
  vBookingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    left: 0
  },
  leftView: {
    flex: 1,
    paddingLeft: 15,
    color: Colors.primaryText
  },
  rightView: {
    flex: 1,
    paddingLeft: 20
  },
  topLeftLabel: {
    color: Colors.blur
  },
  topRightLabel: {
    color: Colors.gray,
    textAlign: 'right',
    marginRight: 15
  },
  textStyle: {
    fontFamily: Fonts.type.light,
    fontSize: size.small
  }
});

export default BookingItem;

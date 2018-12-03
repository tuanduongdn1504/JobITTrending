import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import { StyleSheet, ScrollView } from 'react-native';
import Circleday from './Circleday';
import { HeaderTitle } from './Text';
import HeaderRow from './HeaderRow';
import ContentItemView from './ContentItemView';
import { Colors } from '../themes';

class OpenTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: this.props.passData
    };
  }

  onPressDay = item => {
    this.setState({ selectedDay: item.num });
    this.props.passFunction(item.num);
  };

  render() {
    const { selectedDay } = this.state;
    const NUMBER_OF_SLOTS = [{ num: '1' }, { num: '2' }, { num: '3' }];
    return (
      <ContentItemView>
        <ScrollView horizontal style={styles.dayView}>
          {NUMBER_OF_SLOTS.map(item => {
            const selected = selectedDay === item.num;
            return (
              <Circleday
                // onPress={() => this.onPressDay(item)} dummy
                selected={selected}
                text={item.num}
                key={item.num}
              />
            );
          })}
        </ScrollView>
      </ContentItemView>
    );
  }
}
OpenTime.propTypes = {
  // businessInfo: PropTypes.object
};

const styles = StyleSheet.create({
  dayView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15
  },
  hoursOpen: {
    color: Colors.primary,
    alignSelf: 'center',
    marginVertical: 15
  }
});

export default OpenTime;

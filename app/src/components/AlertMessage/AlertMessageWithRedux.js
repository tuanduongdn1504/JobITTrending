import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AlertMessage from './index';
import AppStateActions from '../../redux/AppStateRedux/actions';

class AlertMessageWithRedux extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      const { alertType, params } = nextProps.data;
      let txtTitle = '';
      if (params.title) {
        txtTitle = params.title;
      } else if (alertType === 'SUCCESS') {
        txtTitle = 'Thanh cong';
      } else if (alertType === 'ERROR') {
        txtTitle = 'that bai';
      } else if (alertType === 'WARNING') {
        txtTitle = 'canh bao';
      }

      this.messageRef.alertWithType(alertType, {
        ...params,
        title: txtTitle
      });
      this.props.clearAlertMessage(this.props.name);
    }
  }

  render() {
    return (
      <AlertMessage
        ref={message => {
          this.messageRef = message;
        }}
        onClose={response => {
          if (response && response.actionStatus === 'BUTTON_PRESS') {
            const { onPress } = this.props;
            onPress && onPress(response.actionButton);
          }
        }}
      />
    );
  }
}

AlertMessageWithRedux.propTypes = {
  clearAlertMessage: PropTypes.func,
  name: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  data: state.appstate.alerts[props.name]
});

const mapDispatchToProps = dispatch => ({
  clearAlertMessage: name => dispatch(AppStateActions.clearAlertMessage(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertMessageWithRedux);

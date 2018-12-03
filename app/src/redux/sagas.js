import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';
import appStateSagas from './AppStateRedux/sagas';
import officeSagas from './OfficeRedux/sagas';
import officeTypeSagas from './OfficeTypeRedux/sagas';
import procedureSagas from './ProcedureRedux/sagas';
import bookingSagas from './BookingRedux/sagas';

export default function* root() {
  yield all([
    ...officeSagas,
    ...ForgotPasswordSagas,
    ...appSagas,
    ...loginSagas,
    ...appStateSagas,
    ...officeTypeSagas,
    ...procedureSagas,
    ...bookingSagas
  ]);
}

import login from './LoginRedux/reducer';
import password from './ForgotPasswordRedux/reducer';
import app from './AppRedux/reducer';
import filter from './FilterRedux/reducer';
import appstate from './AppStateRedux/reducer';
import offices from './OfficeRedux/reducer';
import officeTypes from './OfficeTypeRedux/reducer';
import procedures from './ProcedureRedux/reducer';
import booking from './BookingRedux/reducer';

export default {
  offices,
  app,
  password,
  login,
  filter,
  appstate,
  officeTypes,
  procedures,
  booking
};

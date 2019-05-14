import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortVerification, getRegnInfo, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  data: getRegnInfo(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit(details) {
    dispatch(actions.changeRegnInfo(details));
    dispatch(actions.redirectToRegnFormSubmit());
  },
  redirectToRegnHome() {
    dispatch(actions.redirectToRegnHome());
  },
  redirectToRegnForm() {
    dispatch(actions.redirectToRegnForm());
  },
  redirectToRegnReceived() {
    dispatch(actions.redirectToRegnReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

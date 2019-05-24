import { connect } from "react-redux";

import * as actions from "../../actions";
import { getRegnInfo, getUPortProfile, isLoggedIn, isLoading } from "../../selectors";

import Form from "./Form";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  profile: getUPortProfile(state),
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
  redirectToRegnExists() {
    dispatch(actions.redirectToRegnExists());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

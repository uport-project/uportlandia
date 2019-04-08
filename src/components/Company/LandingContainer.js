import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortLogin, getUPortProfile, isLoading } from "../../selectors";

import Landing from "./Landing";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  login: getUPortLogin(state),
  profile: getUPortProfile(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToEmploymentRequirement() {
    dispatch(actions.redirectToEmploymentRequirement());
  },
  redirectToReceiveEmployment() {
    dispatch(actions.redirectToReceiveEmployment());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

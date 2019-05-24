import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortVerification, getUPortProfile, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  profile: getUPortProfile(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToFailure(serviceId) {
    dispatch(actions.redirectToFailure(serviceId));
  },
  redirectToServiceHome(serviceId) {
    dispatch(actions.redirectToServiceHome(serviceId));
  },
  redirectToClaimReceived(serviceId) {
    dispatch(actions.redirectToClaimReceived(serviceId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

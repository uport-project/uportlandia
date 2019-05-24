import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortVerification, getCityIdClaim, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  cityIdClaim: getCityIdClaim(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToMuseumMembershipRequirement() {
    dispatch(actions.redirectToMuseumMembershipRequirement());
  },
  redirectToMuseumMembershipHome() {
    dispatch(actions.redirectToMuseumMembershipHome());
  },
  redirectToMuseumMembershipReceived() {
    dispatch(actions.redirectToMuseumMembershipReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

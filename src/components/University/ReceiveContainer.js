import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdClaim, getUPortVerification, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  cityIdClaim: getCityIdClaim(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToDiplomaRequirement() {
    dispatch(actions.redirectToDiplomaRequirement());
  },
  redirectToDiplomaHome() {
    dispatch(actions.redirectToDiplomaHome());
  },
  redirectToDiplomaReceived() {
    dispatch(actions.redirectToDiplomaReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

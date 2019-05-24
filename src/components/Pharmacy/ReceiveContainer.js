import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortVerification, getCityIdClaim, getInsuranceClaim, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  cityIdClaim: getCityIdClaim(state),
  insuranceClaim: getInsuranceClaim(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToPrescriptionRequirement() {
    dispatch(actions.redirectToPrescriptionRequirement());
  },
  redirectToPrescriptionHome() {
    dispatch(actions.redirectToPrescriptionHome());
  },
  redirectToPrescriptionReceived() {
    dispatch(actions.redirectToPrescriptionReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

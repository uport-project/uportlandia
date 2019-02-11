import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdClaim, getEmploymentClaim, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  cityIdClaim: getCityIdClaim(state),
  employmentClaim: getEmploymentClaim(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToInsuranceRequirement() {
    dispatch(actions.redirectToInsuranceRequirement());
  },
  redirectToInsuranceHome() {
    dispatch(actions.redirectToInsuranceHome());
  },
  redirectToInsuranceReceived() {
    dispatch(actions.redirectToInsuranceReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

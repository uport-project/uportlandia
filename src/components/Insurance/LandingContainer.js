import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortProfile, isLoading } from "../../selectors";

import Landing from "./Landing";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  profile: getUPortProfile(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToInsuranceRequirement() {
    dispatch(actions.redirectToInsuranceRequirement());
  },
  redirectToReceiveInsurance() {
    dispatch(actions.redirectToReceiveInsurance());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

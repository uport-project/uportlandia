import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdClaim, isLoggedIn, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  cityIdClaim: getCityIdClaim(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToEmploymentRequirement() {
    dispatch(actions.redirectToEmploymentRequirement());
  },
  redirectToEmploymentHome() {
    dispatch(actions.redirectToEmploymentHome());
  },
  redirectToEmploymentReceived() {
    dispatch(actions.redirectToEmploymentReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

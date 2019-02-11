import { connect } from "react-redux";

import * as actions from "../../actions";
import { isLoggedIn, isLoading } from "../../selectors";

import ClaimReceived from "./ClaimReceived";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToHome() {
    dispatch(actions.redirectToHome());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimReceived);

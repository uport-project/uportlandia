import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdInfo, isLoggedIn, isLoading } from "../../selectors";

import ClaimExists from "./ClaimExists";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  data: getCityIdInfo(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToHome() {
    dispatch(actions.redirectToHome());
  },
  redirectToCityHome() {
    dispatch(actions.redirectToCityHome());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClaimExists);

import { connect } from "react-redux";

import * as actions from "../../actions";
import { isLoading, getUPortLogin, getUPortMessages } from "../../selectors";
import Login from "./Login";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  login: getUPortLogin(state),
  messages: getUPortMessages(state)
});

const mapDispatchToProp = dispatch => ({
  loadProfile() {
    dispatch(actions.loadProfile());
  },
  requestDisclosure(id, requestedClaims, isMobile) {
    dispatch(actions.reqDisclosure(id, requestedClaims, isMobile));
  },
  pollChasqui(id) {
    dispatch(actions.pollChasqui(id));
  },
  stopPollChasqui(id) {
    dispatch(actions.stopPollChasqui(id));
  },
  verifyCredentials(token) {
    dispatch(actions.verifyCredentials(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProp)(Login);

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
  initCredentials() {
    dispatch(actions.initCredentials());
  },
  loadProfile() {
    dispatch(actions.loadProfile());
  },
  requestDisclosure(id, requestedClaims) {
    dispatch(actions.reqDisclosure(id, requestedClaims));
  },
  pollChasqui(id) {
    dispatch(actions.pollChasqui(id));
  },
  verifyCredentials(token) {
    dispatch(actions.verifyCredentials(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProp)(Login);

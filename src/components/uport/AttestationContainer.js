import { connect } from "react-redux";

import * as actions from "../../actions";
import {
  isLoading,
  getUPortProfile,
  getUPortMessages,
  getUPortVerification
} from "../../selectors";

import Attestation from "./Attestation";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  profile: getUPortProfile(state),
  data: getUPortVerification(state),
  messages: getUPortMessages(state)
});

const mapDispatchToProp = dispatch => ({
  loadProfile() {
    dispatch(actions.loadProfile());
  },
  sendVerification(id, profile, claim, isMobile) {
    dispatch(actions.sendVerification(id, profile, claim, isMobile));
  },
  verifyCredentials(token) {
    dispatch(actions.verifyCredentials(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProp)(Attestation);

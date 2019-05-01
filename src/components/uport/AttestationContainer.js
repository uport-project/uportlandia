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
  sendVerification(serviceId, id, profile, claim, isMobile) {
    dispatch(actions.sendVerification(serviceId, id, profile, claim, isMobile));
  }
});

export default connect(mapStateToProps, mapDispatchToProp)(Attestation);

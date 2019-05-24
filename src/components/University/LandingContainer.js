import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortLogin, isLoading } from "../../selectors";

import Landing from "./Landing";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  login: getUPortLogin(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToDiplomaRequirement() {
    dispatch(actions.redirectToDiplomaRequirement());
  },
  redirectToReceiveDiploma() {
    dispatch(actions.redirectToReceiveDiploma());
  },
  requestDisclosure(id, requestedClaims, isMobile) {
    dispatch(actions.reqDisclosure(id, requestedClaims, isMobile));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

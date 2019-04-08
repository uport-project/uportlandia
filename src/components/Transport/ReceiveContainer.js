import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdClaim, getDiplomaClaim, isLoggedIn, getUPortVerification, isLoading } from "../../selectors";

import Receive from "./Receive";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  verification: getUPortVerification(state),
  cityIdClaim: getCityIdClaim(state),
  diplomaClaim: getDiplomaClaim(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToBusTicketRequirement() {
    dispatch(actions.redirectToBusTicketRequirement());
  },
  redirectToBusTicketHome() {
    dispatch(actions.redirectToBusTicketHome());
  },
  redirectToBusTicketReceived() {
    dispatch(actions.redirectToBusTicketReceived());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Receive);

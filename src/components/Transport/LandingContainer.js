import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortLogin, isLoading } from "../../selectors";

import Landing from "./Landing";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  login: getUPortLogin(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToBusTicketRequirement() {
    dispatch(actions.redirectToBusTicketRequirement());
  },
  redirectToReceiveBusTicket() {
    dispatch(actions.redirectToReceiveBusTicket());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

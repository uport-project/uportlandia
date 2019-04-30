import { connect } from "react-redux";

import * as actions from "../actions";
import App from "./App";

import { isLoading } from "../selectors";

const mapStateToProps = state => ({
  isLoading: isLoading(state)
});

const mapDispatchToProps = dispatch => ({
  verifyCredentials(serviceId, token) {
    dispatch(actions.verifyCredentials(serviceId, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

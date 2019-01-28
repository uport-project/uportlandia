import { connect } from "react-redux";

import App from "./App";

import { isLoading, getUPortProfile } from "../selectors";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  profile: getUPortProfile(state)
});

export default connect(mapStateToProps)(App);

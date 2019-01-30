import { connect } from "react-redux";

import App from "./App";

import { isLoading } from "../selectors";

const mapStateToProps = state => ({
  isLoading: isLoading(state)
});

export default connect(mapStateToProps)(App);

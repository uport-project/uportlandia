import { connect } from "react-redux";

import * as actions from "../../actions";
import { showAppDownload } from "../../selectors";

import AppDownload from "./AppDownload";

const mapStateToProps = state => ({
  show: showAppDownload(state)
});

const mapDispatchToProps = dispatch => ({
  onClose() {
    dispatch(actions.hideAppDownload());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDownload);

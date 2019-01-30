import { connect } from "react-redux";

import * as actions from "../../actions";
import { getUPortProfile, isLoading } from "../../selectors";

import Landing from "./Landing";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  profile: getUPortProfile(state)
});

const mapDispatchToProps = dispatch => ({
  redirectToCityIdForm() {
    dispatch(actions.redirectToCityIdForm());
  },
  saveProfile(profile) {
    dispatch(actions.saveProfile(profile));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

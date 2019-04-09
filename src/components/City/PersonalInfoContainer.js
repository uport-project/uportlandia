import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdInfo, getUPortProfile, isLoggedIn, isLoading } from "../../selectors";

import PersonalInfo from "./PersonalInfo";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
  profile: getUPortProfile(state),
  data: getCityIdInfo(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit(details) {
    dispatch(actions.changeCityIdInfo(details));
    dispatch(actions.redirectToCityIdFormSubmit());
  },
  redirectToCityHome() {
    dispatch(actions.redirectToCityHome());
  },
  redirectToCityIdExists() {
    dispatch(actions.redirectToCityIdExists());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);

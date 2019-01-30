import { connect } from "react-redux";

import * as actions from "../../actions";
import { isLoggedIn, isLoading } from "../../selectors";

import PersonalInfo from "./PersonalInfo";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  onSubmit(details) {
    dispatch(actions.changeCityIdInfo(details));
    dispatch(actions.redirectToCityIdFormSubmit());
  },
  redirectToCityHome() {
    dispatch(actions.redirectToCityHome());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);

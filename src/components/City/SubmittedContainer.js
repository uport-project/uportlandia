import { connect } from "react-redux";

import * as actions from "../../actions";
import { getCityIdInfo, isLoggedIn, isLoading } from "../../selectors";

import Submitted from "./Submitted";

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  isLoggedIn: isLoggedIn(state),
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
  redirectToCityIdForm() {
    dispatch(actions.redirectToCityIdForm());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Submitted);

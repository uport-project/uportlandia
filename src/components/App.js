import React from "react";

import LoadingOverlay from "./shared/LoadingOverlay";
import UPortLogin from "./uport/LoginContainer";

const App = props => {
  return (<div>
    {props.children}
    <LoadingOverlay loading={props.isLoading} />
  </div>)
};

export default App;

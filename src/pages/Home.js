import React from "react";
// import { hot } from "react-hot-loader";

import App from "../components/AppContainer";
import Home from "../components/Home";

const HomePage = props => {
  return (<App>
    <Home />
  </App>);
};

// export default hot(module)(HomePage);
export default HomePage;

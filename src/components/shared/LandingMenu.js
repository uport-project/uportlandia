import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import * as theme from "../shared/theme";

class LandingMenu extends React.Component {
  render() {
    const { sections } = this.props;
    return (<Menu>
      {sections.map(section => <Menu.Item to={section.url} key={section.url}>
        {section.name}
      </Menu.Item>)}
    </Menu>)
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;
const Menu = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;
Menu.Item = styled(Link)`
  font-weight: bold;
  padding: 40px 20px;
  text-align: center;
  text-decoration: none;
`;
const Text = styled.div`

`;

export default LandingMenu;

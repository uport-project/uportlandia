import React from "react";
import Tooltip from "../shared/Tooltip";
import styled from "styled-components";
import shortId from "shortid";

import { medium } from "../shared/grid";
import * as theme from "../shared/theme";

class CardTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.tid = shortId.generate();
    this.state = {
      popover: false
    };
  }
  hidePopover = () => {
    this.setState({ popover: false });
  }
  showPopover = () => {
    this.setState({ popover: true });
  }
  render() {
    const { display, heading, description, children } = this.props;
    const { popover } = this.state;
    return (<React.Fragment>
      <Trigger data-tip data-for={this.tid}>{display}</Trigger>
      <Trigger mobile onClick={this.showPopover}>{display}</Trigger>
      <Tooltip id={this.tid}>
        <Container>
          <Tooltip.Heading>{heading}</Tooltip.Heading>
          {description ? <Description>{description}</Description> : null}
          {children}
        </Container>
      </Tooltip>
      <Popover show={popover}>
        <Backdrop />
        <Content>
          <ButtonClose onClick={this.hidePopover}>&times;</ButtonClose>
          <Tooltip.Heading>{heading}</Tooltip.Heading>
          {children || <Text>{description}</Text>}
        </Content>
      </Popover>
    </React.Fragment>);
  }
}

const Trigger = styled.a`
  border-bottom: dotted 1px ${theme.colors.mutedText2};
  color: inherit;
  cursor: default;
  text-decoration: none;
  ${props => props.mobile
    ? `
      ${medium("display: none;")}
    `
    : `
      display: none;
      ${medium("display: inline-block;")}
    `}
`;

const Container = styled.div`
  width: 70vw;
  ${medium("width: 25em;")}
`;
const Description = styled.p`
  font-size: 0.875rem;
  margin-bottom: 15px;
`;
const Popover = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 0.5s, visibility 0.5s;
  z-index: 900;
  ${props => props.show
    ? `
      opacity: 1;
      visibility: visible;
    `
    : `
      opacity: 0;
      visibility: hidden;
    `}
`;
const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.7);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 910;
`;
const ButtonClose = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 2em;
  position: absolute;
  right: 10px;
  top: 5px;
`;
const Content = styled.div`
  background: ${theme.main.bg};
  border-radius: 8px;
  font-size: 0.875rem;
  left: 50%;
  padding: 30px 10px;
  position: relative;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 920;
  width: 85vw;
`;
const Text = styled.p`
  padding: 10px 0;
`;

export default CardTooltip;

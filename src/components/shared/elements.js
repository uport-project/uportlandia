import React from "react";
import { Link } from "react-router-dom";
import { default as styled, css } from "styled-components";
import shortId from "shortid";

import * as theme from "./theme";
import { medium, Col } from "./grid";
import ArrowLeft from "../../images/arrow-left.svg";
import Dummy1 from "../../images/dummy-content-1.svg";
import Dummy2 from "../../images/dummy-content-2.svg";
import Dummy3 from "../../images/dummy-content-3.svg";
import Dummy4 from "../../images/dummy-content-4.svg";
import uPortWhite from "../../images/uport-icon-white.svg";

export const Form = styled.form``;
Form.displayName = "Form";

export const Label = styled.label`
  display: block;
  font-size: 0.6875rem;
  text-transform: uppercase;
`;
Label.displayName = "Label";

export const textBoxStyle = css`
  border: solid 1px ${theme.formControl.border};
  color: ${theme.formControl.color}
  font-size: 0.9em;
  line-height: 2em;
  padding: 15px 12px;
  width: 100%;
  &::placeholder {
    color: ${theme.formControl.placeholder};
  }
`;
export const Textbox = styled.input`
  ${textBoxStyle}
`;
Textbox.displayName = "Textbox";

export const Dropdown = styled.select`
  background: none;
  border: solid 1px ${theme.formControl.border};
  border-radius: 0;
  color: ${theme.formControl.color}
  font-size: 0.9em;
  height: 3.5rem;
  line-height: 2em;
  padding: 15px 12px;
  width: 100%;
`;
Dropdown.displayName = "Dropdown";

const PrimaryButtonStyle = css`
  background: ${theme.gradient2};
  border: none;
  border-radius: 5px;
  color: ${theme.colors.primaryButtonText};
  cursor: pointer;
  display: block;
  font-size: 0.75rem;;
  padding: 12px 22px;
  text-align: center;
  text-transform: uppercase;
  transform: matrix(1, 0, 0, 1.01, 0, 0);
  &:hover {
    background: ${theme.gradient3};
  }
`;

const SecondaryButtonStyle = css`
  background: ${theme.gradient4};
  border: none;
  border-radius: 5px;
  color: ${theme.colors.secondaryButtonText};
  cursor: pointer;
  display: block;
  font-size: 0.75rem;;
  padding: 12px 22px;
  text-align: center;
  text-transform: uppercase;
  &:hover {
    background: ${theme.gradient5};
  }
  &[disabled], &[disabled]:hover {
    background: ${theme.gradient4_inactive};
    cursor: default;
  }
`;

export const Button = styled.button`
  ${props => props.secondary
    ? SecondaryButtonStyle
    : PrimaryButtonStyle}
  ${props => props.outline
    ? "border: solid 1px #fff;"
    : ""}
`;
Button.displayName = "Button";

export const ThemedButton = styled(Button)`
  ${props => `
    background: ${theme.colors[props.themeId].buttonBg};
    &:hover {
      background: ${theme.colors[props.themeId].buttonHoverBg};
    }
  `}
`;
export const ThemedExtLink = styled.a`
  ${props => props.secondary
    ? SecondaryButtonStyle
    : PrimaryButtonStyle}
  ${props => `
    background: ${theme.colors[props.themeId].buttonBg};
    &:hover {
      background: ${theme.colors[props.themeId].buttonHoverBg};
    }
  `}
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  font-size: 1rem;
  text-decoration: none;
  text-transform: none;
`;

const _LoginButton = styled(Button)`
  align-items: center;
  display: flex;
  justify-content: center;
  &, &:hover {
    background: linear-gradient(77.21deg, #5C50CA 2.18%, #7958D8 99.78%);
  }
`;
const LoginButtonLogo = styled.img`
  margin-right: 10px;
`;
export const LoginButton = props => {
  return (<_LoginButton className="long" secondary {...props}>
    <LoginButtonLogo src={uPortWhite} />
    {` ${props.text || "Login with uPort"}`}
  </_LoginButton>);
}

const _LoginLink = styled.a`
  ${PrimaryButtonStyle};
  align-items: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  text-decoration: none;
  text-transform: none;
  &, &:hover {
    background: linear-gradient(77.21deg, #5C50CA 2.18%, #7958D8 99.78%);
  }
`;
export const LoginLink = props => {
  return (<_LoginLink className="long" secondary {...props}>
    <LoginButtonLogo src={uPortWhite} />
    {` ${props.text || "Login with uPort"}`}
  </_LoginLink>);
}

const CapsuleButtonStyle = css`
  ${PrimaryButtonStyle};
  border-radius: 50px;
  display: inline-block;
  font-weight: 600;
  padding: 16px 38px;
  transform: none;
`;
export const CapsuleButton = styled.button`
  ${CapsuleButtonStyle};
`;
CapsuleButton.displayName = "CapsuleButton";

export const CapsuleLinkButton = styled(Link)`
  ${CapsuleButtonStyle};
  text-decoration: none;
`;
CapsuleLinkButton.displayName = "CapsuleLinkButton";

const InvButtonStyle = css`
  ${CapsuleButtonStyle}
  &, &:hover {
    background: #fff;
    color: ${theme.colors.primary};
  }
`;
export const InvLinkButton = styled(Link)`
  ${InvButtonStyle}
  text-decoration: none;
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  ${props => props.secondary
    ? SecondaryButtonStyle
    : PrimaryButtonStyle}
`;
LinkButton.displayName = "LinkButton";

export const TextButton = styled(Button)`
  background: none;
  border: none;
  box-shadow: none;
`;
TextButton.displayName = "TextButton";

const FormGroupWrapper = styled.div`
  ${Label} {
    margin-bottom: 10px;
  }
  ${Button} {
    width: 100%;
  }
  & + & {
    margin-top: 20px;
  }
`;
FormGroupWrapper.displayName = "FormGroupWrapper";

export class FormGroup extends React.PureComponent {
  constructor() {
    super();
    this.controlId = shortId.generate();
  }
  render() {
    const { controlId=this.controlId } = this.props;
    let { children } = this.props;
    if(!(children instanceof Array))
      children = [ children ];
    children = children.map(child => {
      if(child.type === Label) {
        return {
          ...child,
          props: {
            ...child.props,
            htmlFor: controlId
          }
        };
      }
      if(child.type === Textbox) {
        return {
          ...child,
          props: {
            ...child.props,
            id: controlId
          }
        };
      }
      return child;
    });
    return (<FormGroupWrapper>
      {children}
    </FormGroupWrapper>);
  }
}

export const ContentLayout = styled.div`
  background-color: ${theme.colors.lightBg2};
  min-height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr 40px;
`;

export const BackButton = props => {
  const { url, onClick, label } = props;
  return (<BackButtonRow>
    {url
      ? <Link to={url}>{label || "Back"}</Link>
      : <TextButton onClick={onClick}>Back</TextButton>}
  </BackButtonRow>);
};

const BackButtonRow = styled.div`
  font-size: 0.875rem;
  margin-bottom: 30px;
  padding-top: 20px;
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    &::before {
      content: "";
      display: inline-block;
      background: transparent url(${ArrowLeft}) 0 4px no-repeat;
      height: 1em;
      width: 2em;

    }
  }
`;

export const Sidebar = {
  Left: styled(Col)`
    display: none;
    ${medium("display: block;")}
  `,
  Right: styled(Col)`
    display: none;
    ${medium("display: block;")}
  `
};

const _DummyImage = styled.img`
  border-radius: 5px;
  max-width: 100%;

  & + & {
    margin-top: 30px;
  }
`;
export class DummyImage extends React.PureComponent {
  constructor() {
    super();
    this.dummyImages = {
      Dummy1, Dummy2, Dummy3, Dummy4
    };
  }
  render() {
    const { variant=1 } = this.props;
    return <_DummyImage src={this.dummyImages[`Dummy${variant}`]} />;
  }
}

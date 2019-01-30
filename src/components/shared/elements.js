import React from "react";
import { Link } from "react-router-dom";
import { default as styled, css } from "styled-components";
import shortId from "shortid";

import * as theme from "./theme";

export const Form = styled.form``;
Form.displayName = "Form";

export const Label = styled.label`
  display: block;
  font-size: 0.6875rem;
  text-transform: uppercase;
`;
Label.displayName = "Label";

export const Textbox = styled.input`
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
Textbox.displayName = "Textbox";

const PrimaryButtonStyle = css`
  background: ${theme.gradient2};
  border: none;
  border-radius: 5px;
  color: ${theme.colors.primaryButtonText};
  cursor: pointer;
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
`;
Button.displayName = "Button";

export const LinkButton = styled(Link)`
  text-decoration: none;
  ${props => props.secondary
    ? SecondaryButtonStyle
    : PrimaryButtonStyle}
`;
LinkButton.displayName = "LinkButton";

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

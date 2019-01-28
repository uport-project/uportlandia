import React from "react";
import styled from "styled-components";
import shortId from "shortid";

import * as theme from "./theme";

export const Form = styled.form``;
Form.displayName = "Form";

export const Label = styled.label`
  display: block;
  font-weight: 700;
`;
Label.displayName = "Label";

export const Textbox = styled.input`
  border: solid 1px ${theme.formControl.border};
  border-radius: 4px;
  color: ${theme.formControl.color}
  font-size: 0.9em;
  line-height: 2em;
  padding: 10px 20px;
  width: 100%;
  &::placeholder {
    color: ${theme.formControl.placeholder};
  }
`;
Textbox.displayName = "Textbox";

export const Button = styled.button`
  background: linear-gradient(241.48deg, #4654D1 1.81%, #5C51CB 97.48%);
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
    background: linear-gradient(255.4deg, #2E3ECC 0%, #5B4DE8 99.58%);
  }
`;
Button.displayName = "Button";

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

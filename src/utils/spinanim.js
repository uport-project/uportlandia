import { css, keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

export default () => css`
  ${spin};
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

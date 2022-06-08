import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  span {
    color: ${(props) => props.theme.textColor};
  }

`;

export default GlobalStyle;

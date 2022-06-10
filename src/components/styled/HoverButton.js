import styled from "styled-components";

const HoverButton = styled.button`
  color: ${(props) => props.theme.textColor};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

export default HoverButton;

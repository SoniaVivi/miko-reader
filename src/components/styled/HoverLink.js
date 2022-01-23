import styled from "styled-components";

const HoverLink = styled.a`
  color: ${(props) => props.theme.textColor};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

export default HoverLink;

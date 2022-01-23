import styled from "styled-components";

const Hint = styled.div`
  display: none;
  position: absolute;
  top: 120%;
  left: -80%;
  min-width: 100%;
  width: fit-content;
  z-index: 3;
  padding: 4px;
  font-family: "Lato Bold";
  color: ${(props) => props.theme.hintColor};
  background-color: ${(props) => props.theme.hintBackground};
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    display: block;
    bottom: 100%;
    left: calc(50% - 5px);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid ${(props) => props.theme.hintBackground};
  }
`;

export default Hint;

import styled from "styled-components";

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.textColor};

  &:focus {
    border-color: ${(props) => props.theme.inputFocusBorder};
    background-color: ${(props) => props.theme.mainBackground};
    outline: unset;
  }
`;

export default StyledInput;

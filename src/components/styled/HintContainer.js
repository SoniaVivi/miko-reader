import styled from "styled-components";
import Hint from "./Hint";

const HintContainer = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  :hover ${Hint} {
    display: flex;
  }
`;
export default HintContainer;

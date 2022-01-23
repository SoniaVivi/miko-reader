import styled from "styled-components";
import { forceSize } from "./mixins";

const MangaCover = styled.img`
  ${(props) =>
    props.isSearch
      ? forceSize("40px", "50px")
      : forceSize(props.theme.coverWidth, props.theme.coverHeight)};
  background-color: ${(props) => props.theme.loadingBackground};
`;

export default MangaCover;

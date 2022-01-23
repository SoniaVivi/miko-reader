import styled from "styled-components";

const PageBase = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  max-height: calc(100vh - ${(props) => props.theme.navbarHeight});
  padding: 0 10px;
  transition: max-height ${(props) => props.theme.navTransitionTiming};

  * {
    border-radius: 0;
  }

  &.full-height {
    max-height: 100vh;
    padding: 0;
  }

  img {
    flex-grow: 0;
    max-height: 100%;
    object-fit: contain;

    &.landscape {
      max-width: 100vw;
    }

    &.hidden {
      display: none;
    }
  }

  &.left {
    flex-direction: row-reverse;
  }
`;

export default PageBase;

import PropTypes from "prop-types";
import styled from "styled-components";
import { forceSize } from "./mixins";

const Divider = styled.div`
  ${(props) => {
    switch (props.dividerType) {
      case "vertical":
        return forceSize("1px", "100%");
      case "horizontal":
        return forceSize("100%", "1px");
      case "dot":
        return `${forceSize("3px", "4px")}
         align-self: center;
         margin: 0 4px;
        `;
    }
  }}
  background-color: ${(props) => props.theme.lightBorder};
`;

export default Divider;

Divider.propTypes = {
  dividerType: PropTypes.oneOf(["vertical", "horizontal", "dot"]).isRequired,
};

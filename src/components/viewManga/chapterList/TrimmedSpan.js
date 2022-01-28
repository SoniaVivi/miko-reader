import React from "react";
import PropTypes from "prop-types";
import HintContainer from "../../styled/HintContainer";
import Hint from "../../styled/Hint";
import styled from "styled-components";

const ShiftedHint = styled(Hint)`
  left: 0;
`;

const TrimmedSpan = (props) => {
  const maxLength = props.maxLength ?? 12;
  const trimString = (str) => {
    if (!str) {
      return "";
    } else if (str.length <= maxLength) {
      return str;
    }
    return `${str.slice(0, maxLength - 3)}...`;
  };

  return (
    <HintContainer className={props.className ?? ""}>
      {trimString(props.text)}
      {props.text && props.text.length > maxLength ? (
        <ShiftedHint>{props.text}</ShiftedHint>
      ) : (
        ""
      )}
    </HintContainer>
  );
};

export default TrimmedSpan;

TrimmedSpan.propTypes = {
  text: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  className: PropTypes.string,
};

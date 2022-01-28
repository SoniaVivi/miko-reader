import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Arrow from "../../assets/svgs/Arrow";
import Divider from "../styled/Divider";
import onOutsideClick from "../helpers/onOutsideClick";

const inputSize = 50;

const arrowSize = 25;

const NumberFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.size ?? inputSize + arrowSize + 1}px;
  height: 50px;
  background-color: ${(props) => props.theme.mainBackground};

  > *:not(${Divider}) {
    border: unset;
    background-color: unset;
  }

  input {
    width: ${inputSize}px;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  img {
    width: ${arrowSize}px;
    height: ${arrowSize}px;
  }

  img:first-child {
    transform: rotate(180deg);
  }
`;

const ColoredInput = styled.input`
  height: 100%;
  padding-left: 5px;
  color: ${(props) => props.theme.textColor};
`;

const NumberForm = (props) => {
  const [currentValue, setCurrentValue] = useState(props.value);
  const [activeClickCallback, setActiveClickCallback] = useState(false);
  const container = useRef(null);
  const formatNumber = (value) => {
    if (!value.match(/\./)) {
      return Number(value);
    } else if (value[value.length - 1] == ".") {
      return `${value}00`;
    } else {
      return value;
    }
  };
  const setValue = (val) =>
    /^(\d|\.)+$/.test(val) || val == ""
      ? setCurrentValue(formatNumber(val))
      : null;
  const valueStepFunc =
    (change = 1) =>
    () =>
      setCurrentValue((prev) => parseFloat(prev) + change);

  return (
    <NumberFormWrapper
      ref={container}
      onClick={() => {
        if (!activeClickCallback) {
          onOutsideClick(
            container.current,
            () => {
              let current = 0;
              setCurrentValue((prev) => {
                current = prev;
                return prev;
              });
              props.onSend(current);
              setActiveClickCallback(false);
            },
            {
              custom: true,
            }
          );
          setActiveClickCallback(true);
        }
      }}
    >
      <ColoredInput
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
      ></ColoredInput>
      <Divider dividerType="vertical" />
      <ArrowContainer>
        <Arrow onClick={valueStepFunc()} className="top" />
        <Divider dividerType="horizontal" />
        <Arrow onClick={valueStepFunc(-1)} />
      </ArrowContainer>
    </NumberFormWrapper>
  );
};

export default NumberForm;

NumberForm.propTypes = {
  value: PropTypes.number.isRequired,
  onSend: PropTypes.func.isRequired,
};

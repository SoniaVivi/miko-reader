import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Arrow from "../../assets/svgs/Arrow";
import Divider from "../styled/Divider";
import onOutsideClick from "../helpers/onOutsideClick";
import HoverButton from "../styled/HoverButton";

const inputSize = 30;

const NumberFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 25px;
  background-color: ${(props) => props.theme.mainBackground};

  > *:not(${Divider}) {
    border: unset;
    background-color: unset;
  }
`;

const ColoredInput = styled.input`
  width: ${inputSize}px;
  height: 100%;
  padding-left: ${inputSize / 2 - 5}px;
  color: ${(props) => props.theme.textColor};
`;

const ArrowWrapper = styled(HoverButton)`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: 0;
  }
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
    } else if (parseFloat(value) <= 0) {
      return 1;
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
      setCurrentValue((prev) => {
        const newVal = parseFloat(prev) + change;
        return newVal > 0 ? newVal : 1;
      });

  const sendFormData = () => {
    let current = 0;
    setCurrentValue((prev) => {
      current = prev;
      return prev;
    });
    props.onSend(current);
    setActiveClickCallback(false);
  };

  return (
    <NumberFormWrapper
      ref={container}
      onClick={() => {
        if (!activeClickCallback) {
          onOutsideClick(container.current, sendFormData, {
            custom: true,
          });
          setActiveClickCallback(true);
        }
      }}
    >
      <ArrowWrapper>
        <Arrow onClick={valueStepFunc()} className="left" />
      </ArrowWrapper>
      <Divider dividerType="vertical" />
      <ColoredInput
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
      ></ColoredInput>
      <Divider dividerType="vertical" />
      <ArrowWrapper>
        <Arrow onClick={valueStepFunc(-1)} className="right" />
      </ArrowWrapper>
    </NumberFormWrapper>
  );
};

export default NumberForm;

NumberForm.propTypes = {
  value: PropTypes.number.isRequired,
  onSend: PropTypes.func.isRequired,
};

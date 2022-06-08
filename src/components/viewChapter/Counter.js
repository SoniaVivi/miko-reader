import React, { useState } from "react";
import PropTypes from "prop-types";
import onOutsideClick from "../helpers/onOutsideClick";
import styled from "styled-components";
import HoverButton from "../styled/HoverButton";

const _buttonSidePadding = "4px";
const _menuButtonSize = "40px";

const Container = styled.div`
  position: relative;
  z-index: 3;
  align-items: baseline;
  min-width: 25%;
  margin-right: 5px;
`;

const Form = styled(Container)`
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  width: fit-content;
  margin-left: 5px;
  padding: 1px 4px 2px 4px;
  border: 1px solid ${(props) => props.theme.lightBorder};
  user-select: none;

  &.active {
    border-bottom: 1px solid ${(props) => props.theme.mainBackground};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const TextWrapper = styled.span`
  width: 25px;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 3;
  top: calc(100% - 1px);
  left: 30px;
  display: grid;
  grid-template-columns: repeat(3, ${_menuButtonSize});
  width: fit-content;
  padding: 2px;
  padding-right: 4px;
  border: 1px solid ${(props) => props.theme.darkBorder};
  border-top-left-radius: 0;
  background-color: ${(props) => props.theme.mainBackground};

  &.hide {
    display: none;
  }
`;
const MenuButton = styled(HoverButton)`
  padding: 2px ${_buttonSidePadding} 4px ${_buttonSidePadding};
`;

const Counter = (props) => {
  const [showForm, setShowForm] = useState(false);
  if (!props.data) {
    return <div></div>;
  }

  const getDisplayTitle = (title) => (title == "none" ? "-" : title);

  return (
    <Container className={`flex ${props.className}`}>
      <TextWrapper>{props.text}</TextWrapper>
      <Form
        as={HoverButton}
        className={showForm ? " active" : null}
        onClick={(e) => {
          setShowForm(true);
          onOutsideClick(e, () => setShowForm(false), {
            parent: true,
          });
        }}
      >
        <span>{getDisplayTitle(props.current)}</span>
      </Form>
      <Menu
        className={showForm ? "" : " hide"}
        onMouseLeave={() => setShowForm(false)}
      >
        {Object.keys(props.data).map((title, i) => (
          <MenuButton
            key={i}
            className={title == props.current ? " current" : null}
            onClick={() => props.onChildClick(title, props.data[title].id)}
          >
            {getDisplayTitle(title)}
          </MenuButton>
        ))}
      </Menu>
    </Container>
  );
};

export default Counter;

Counter.propTypes = {
  data: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  onChildClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

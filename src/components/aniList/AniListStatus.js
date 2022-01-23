import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useUpdateMangaStatusMutation } from "../../aniListSlice";
import onOutsideClick from "../helpers/onOutsideClick";
import Book from "../../assets/svgs/Book";
import useMangaFromAuthenicatedQuery from "./useMangaFromAuthenicatedQuery";
import styled from "styled-components";
import Hint from "../styled/Hint";
import HoverButton from "../styled/HoverButton";

const _menuButtonPadding = 3;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  height: 24px;
  user-select: none;
  background-color: ${(props) => props.theme.mainBackground};
  ${(props) =>
    props.type == "sidebar"
      ? `
  ${DisplayedButton}.active {
    margin-left: 0;
  }

  ${MenuContainer} {
    margin-left: 20px;
  }
  `
      : ""}

  ${Hint} {
    left: -55px;
    width: 130px;
  }
`;

const MenuContainer = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  width: 101px;
  margin-left: 21px;
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-top: unset;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${(props) => props.theme.mainBackground};
  z-index: ${(props) => props.theme.secondLevelZIndex};

  &.collapsed {
    display: none;
  }

  li {
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.lightBorder};
    border-radius: 0;
  }
`;

const MenuButton = styled.button`
  display: flex;
  padding-left: ${_menuButtonPadding}px;
  padding-bottom: ${_menuButtonPadding}px;
  border-radius: 0;
  color: ${(props) => props.theme.textColor};
`;

const IconWrapper = styled.div`
  margin-right: 5px;
`;

const DisplayedButton = styled(HoverButton)`
&.active {
  display: flex;
  width: 101px;
  margin-left: -4px;
  padding-bottom: 3px;
  padding-left: 3px;
  border: 1px solid ${(props) => props.theme.mainBackground};

  &.border {
    border-color: ${(props) => props.theme.lightBorder};
    border-bottom: unset;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const AniListStatus = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { status, mediaId, userToken } = useMangaFromAuthenicatedQuery(
    ({ data }) => ({
      status: data?.status,
      listId: data?.listId,
      mediaId: data?.id,
    })
  );
  const updateMangaStatus = useUpdateMangaStatusMutation()[0];
  const statuses = useMemo(
    () => ({
      CURRENT: "Reading",
      DROPPED: "Dropped",
      COMPLETED: "Completed",
      PLANNING: "Planning",
      PAUSED: "Paused",
      REPEATING: "Rereading",
    }),
    []
  );

  const possibleStatuses = useMemo(
    () =>
      Object.values(statuses).filter((current) => current != statuses[status]),
    [statuses, status]
  );

  if (!mediaId) {
    return null;
  }

  return (
    <Container type={props.appearance}>
      <div className="flex">
        <IconWrapper>
          <Book>
            <Hint>AniList Reading Status</Hint>
          </Book>
        </IconWrapper>
        <DisplayedButton
          className={`active${isExpanded ? " border" : ""}`}
          onClick={(e) => {
            setIsExpanded((prevState) => !prevState);
            if (!isExpanded) {
              onOutsideClick(e, () => setIsExpanded(false), { parent: true });
            }
          }}
        >
          {statuses[status] ?? "None"}
        </DisplayedButton>
      </div>
      <MenuContainer className={isExpanded ? "expanded" : "collapsed"}>
        {possibleStatuses.map((possibleStatus, i) => (
          <HoverButton
            as="li"
            key={i}
            onClick={() =>
              updateMangaStatus({
                accessToken: userToken.accessToken,
                mediaId,
                newStatus: Object.keys(statuses).find(
                  (key) => statuses[key] === possibleStatus
                ),
              })
            }
          >
            <MenuButton>{possibleStatus}</MenuButton>
          </HoverButton>
        ))}
      </MenuContainer>
    </Container>
  );
};

export default AniListStatus;

AniListStatus.propTypes = {
  appearance: PropTypes.string,
};

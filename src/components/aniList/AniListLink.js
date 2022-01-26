import React from "react";
import styled from "styled-components";
import Hint from "../styled/Hint";
import HoverButton from "../styled/HoverButton";
import ArrowDiagonal from "../../assets/svgs/ArrowDiagonal";
import useMangaFromAuthenicatedQuery from "./useMangaFromAuthenicatedQuery";
import ColoredSpan from "../styled/ColoredSpan";

const StyledLink = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;

  span {
    display: flex;
    min-width: 75px;
    padding: 0 4px;
    padding-bottom: 3px;
  }

  ${Hint} {
    left: -40px;
    justify-content: center;
    width: 100px;
  }

  ${HoverButton} {
    margin-left: 6px;
  }
`;

const AniListLink = () => {
  const { mediaId, loggedIn } = useMangaFromAuthenicatedQuery(({ data }) => ({
    mediaId: data?.id,
  }));

  if (!mediaId || !loggedIn) {
    return null;
  }

  return (
    <StyledLink
      onClick={() =>
        window.open(`https://anilist.co/manga/${mediaId}/`, "_blank")
      }
    >
      <ArrowDiagonal>
        <Hint>AniList Link</Hint>
      </ArrowDiagonal>
      <HoverButton as={ColoredSpan}>AniList</HoverButton>
    </StyledLink>
  );
};

export default AniListLink;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUpdateMangaProgressMutation } from "../../aniListSlice";
import Hint from "../styled/Hint";
import HintContainer from "../styled/HintContainer";
import HoverButton from "../styled/HoverButton";
import useMangaFromAuthenicatedQuery from "./useMangaFromAuthenicatedQuery";
import NumberForm from "../forms/NumberForm";

const ButtonContainer = styled(HintContainer)`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  flex-basis: 50%;
  min-width: fit-content;
  margin-top: 15px;
  padding: 1px 5px;
  padding-bottom: 3px;
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-radius: 5px;

  ${Hint} {
    left: 0;
  }
`;

const NumberContainer = styled(HintContainer)`
  width: fit-content;
  border: 1px solid ${(props) => props.theme.lightBorder};
  border-radius: 5px;

  ${Hint} {
    left: -50%;
    width: 200%;
  }
`;

const CenteredSpan = styled.span`
  flex-shrink: 0;
  text-align: center;
  user-select: none;
`;

const AniListProgressForm = (props) => {
  const params = useParams();
  const { progress, mediaId, loggedIn, userToken } =
    useMangaFromAuthenicatedQuery((data) => ({
      progress: data?.progress,
      mediaId: data?.id,
    }));

  const updateMangaScore = useUpdateMangaProgressMutation()[0];
  const [chapter, setChapter] = useState(progress ?? 0);
  useEffect(() => {
    if (params.chapter) {
      setChapter(Math.floor(params.chapter));
    }
  }, [params.chapter, chapter]);

  if (!loggedIn || !mediaId) {
    return null;
  }
  switch (props.input) {
    case "button":
      return (
        <ButtonContainer
          as={HoverButton}
          onClick={() =>
            userToken &&
            chapter > (progress ?? 0) &&
            updateMangaScore({
              accessToken: userToken.accessToken,
              mediaId,
              progress: chapter,
            })
          }
          className={`clickable${props.className ?? ""}`}
        >
          <CenteredSpan>AniList Progress: {progress ?? 0}</CenteredSpan>
          {params.chapter > progress ? (
            <Hint>Update To Chapter {chapter}</Hint>
          ) : null}
        </ButtonContainer>
      );
    case "number":
      return (
        <NumberContainer className={props.className ?? null}>
          <NumberForm
            value={progress ?? 0}
            onSend={(newVal) =>
              userToken &&
              newVal > (progress ?? 0) &&
              updateMangaScore({
                accessToken: userToken.accessToken,
                mediaId,
                progress: Math.floor(newVal),
              })
            }
          />
          <Hint>AniList Chapter Progress</Hint>
        </NumberContainer>
      );
  }
};

export default AniListProgressForm;

AniListProgressForm.propTypes = {
  input: PropTypes.oneOf(["button", "number"]).isRequired,
  className: PropTypes.string,
};

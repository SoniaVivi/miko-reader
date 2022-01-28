import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetMangasQuery, useGetAuthorQuery } from "../../apiSlice";
import ArrowsFullscreen from "../../assets/svgs/ArrowsFullscreen";
import Brush from "../../assets/svgs/Brush";
import Pen from "../../assets/svgs/Pen";
import AnilistScore from "../aniList/AniListScore";
import AniListStatus from "../aniList/AniListStatus";
import useMangaFromAuthenicatedQuery from "../aniList/useMangaFromAuthenicatedQuery";
import styled from "styled-components";
import MangaCover from "../styled/MangaCover";
import Hint from "../styled/Hint";
import ColoredSpan from "../styled/ColoredSpan";
import Divider from "../styled/Divider";
import AniListLink from "../aniList/AniListLink";
import AniListProgressForm from "../aniList/AniListProgressForm";

const InfoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-basis: 50%;
  padding: 8px;
  background-color: ${(props) => props.theme.mainBackground};
`;

const MetadataContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  > * {
    margin-bottom: 3px;
  }

  .center-row {
    margin-bottom: 5px;
  }

  .vertical-icon-container {
    display: flex;
    flex-flow: column nowrap;
    margin-right: 0;
  }

  .anilist-progress {
    margin-top: 5px;
  }
`;

const MangaHeading = styled.h3`
  margin-left: 25px;
  color: ${(props) => props.theme.textColor};
`;

const CoverWrapper = styled(MangaCover)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;

  &:hover * {
    display: flex;
  }
`;

const Overlay = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3000;

  * {
    display: flex;
  }
`;

const ModalPreview = styled.img`
  position: relative;
  z-index: 4;
  display: block;
  max-height: 75%;
  width: auto;
  height: fit-content;
  border: 2px solid #000000;
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  padding: 8px;
  margin-right: 5px;
`;

const NameSpan = styled(ColoredSpan)`
  margin-left: 5px;
`;

const AnilistDivider = styled(Divider)`
  margin-top: 5px;
`;

const Synopsis = styled.p`
  max-height: 33vh;
  overflow-y: scroll;
  color: ${(props) => props.theme.textColor};
`;

const MangaInfo = () => {
  const [requestAuthorData, setRequestAuthorData] = useState(false);
  const mangaId = useSelector((state) => state.manga.id);
  const { mediaId, loggedIn } = useMangaFromAuthenicatedQuery((data) => ({
    mediaId: data?.id,
  }));
  const [showLargeCover, setShowLargeCover] = useState(false);
  const { mangaData } = useGetMangasQuery([mangaId], {
    selectFromResult: ({ data }) => ({
      mangaData: data?.entities[mangaId],
    }),
    skip: !mangaId,
  });
  const nameSelector = {
    selectFromResult: ({ data }) => ({
      name: data?.data.attributes.name,
    }),
  };

  const { name: authorName } = useGetAuthorQuery(mangaData?.authorId, {
    ...nameSelector,
    skip: !requestAuthorData,
  });

  const { name: artistName } = useGetAuthorQuery(mangaData?.artistId, {
    ...nameSelector,
    skip: !requestAuthorData,
  });

  useEffect(() => {
    if (mangaData?.artistId && mangaData?.authorId && !requestAuthorData) {
      setRequestAuthorData(true);
    }
  }, [mangaData, requestAuthorData]);

  if (!mangaData) {
    return (
      <InfoContainer>
        <Container>
          <MangaCover></MangaCover>
          <MetadataContainer></MetadataContainer>
        </Container>
        <p></p>
      </InfoContainer>
    );
  }

  return (
    <InfoContainer>
      <Container>
        <CoverWrapper as={"div"} onClick={() => setShowLargeCover(true)}>
          <MangaCover src={mangaData.coverUrl}></MangaCover>
          <ArrowsFullscreen className="corner" />
          <Overlay></Overlay>
        </CoverWrapper>
        <MetadataContainer>
          <MangaHeading>{mangaData.title}</MangaHeading>
          <MangaHeading as={"span"}>
            {mangaData.publicationStatus
              ? mangaData.publicationStatus.slice(0, 1).toUpperCase() +
                mangaData.publicationStatus.slice(1)
              : ""}
          </MangaHeading>
          <div className={authorName != artistName ? "center-row" : "flex"}>
            {
              <React.Fragment>
                <div>
                  <Pen>
                    <Hint>Author</Hint>
                  </Pen>
                  {authorName == artistName ? (
                    <Brush>
                      <Hint>Artist</Hint>
                    </Brush>
                  ) : (
                    ""
                  )}
                </div>
                <NameSpan>{authorName}</NameSpan>
              </React.Fragment>
            }
          </div>
          {authorName != artistName ? (
            <div className="center-row">
              {
                <React.Fragment>
                  <Brush>
                    <Hint>Artist</Hint>
                  </Brush>
                  <NameSpan>{artistName}</NameSpan>
                </React.Fragment>
              }
            </div>
          ) : (
            ""
          )}
          {loggedIn && mediaId ? (
            <AnilistDivider dividerType="horizontal"></AnilistDivider>
          ) : null}
          <AniListLink />
          <AniListStatus appearance="manga-info" />
          <AnilistScore marginRight={true} />
          <AniListProgressForm input="number" className="anilist-progress" />
        </MetadataContainer>
      </Container>
      <Synopsis>{mangaData.synopsis}</Synopsis>
      {showLargeCover ? (
        <Modal onClick={() => setShowLargeCover(false)}>
          <Overlay></Overlay>
          <ModalPreview src={mangaData.coverUrl}></ModalPreview>
        </Modal>
      ) : null}
    </InfoContainer>
  );
};

export default MangaInfo;

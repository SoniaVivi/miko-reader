//eslint-disable-next-line no-unused-vars
import React from "react";
import { useUpdateMangaScoreMutation } from "../../aniListSlice";
import Star from "../../assets/svgs/Star";
import useMangaFromAuthenicatedQuery from "./useMangaFromAuthenicatedQuery";

const AnilistScore = (props) => {
  const { score, mediaId, loggedIn, userToken } = useMangaFromAuthenicatedQuery(
    (data) => ({
      score: data?.score,
      mediaId: data?.id,
    })
  );
  const updateMangaScore = useUpdateMangaScoreMutation()[0];

  if (!loggedIn || !mediaId) {
    return null;
  }

  return (
    <div className="flex">
      {Array(5)
        .fill()
        .map((_, i) => (
          <Star
            key={i}
            starType={i < (score ?? 0) ? "fill" : "outline"}
            {...props}
            onClick={() =>
              userToken &&
              updateMangaScore({
                accessToken: userToken.accessToken,
                mediaId,
                score: (i + 1) * 20,
              })
            }
          />
        ))}
    </div>
  );
};

export default AnilistScore;

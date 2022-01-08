import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useUpdateMangaStatusMutation } from "../../aniListSlice";
import onOutsideClick from "../helpers/onOutsideClick";
import Book from "../../assets/svgs/Book";
import useMangaFromAuthenicatedQuery from "./useMangaFromAuthenicatedQuery";

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
    <div className={`anilist-status flex column ${props.className ?? ""}`}>
      <div className="flex">
        <Book>
          <div className="hint">AniList Reading Status</div>
        </Book>
        <button
          className={`anilist-status hover active${
            isExpanded ? " border" : ""
          }`}
          onClick={(e) => {
            setIsExpanded((prevState) => !prevState);
            if (!isExpanded) {
              onOutsideClick(e, () => setIsExpanded(false), { parent: true });
            }
          }}
        >
          {statuses[status] ?? "None"}
        </button>
      </div>
      <ul
        className={`anilist-status flex column ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        {possibleStatuses.map((possibleStatus, i) => (
          <li
            key={i}
            className="hover"
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
            <button>{possibleStatus}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AniListStatus;

AniListStatus.propTypes = {
  className: PropTypes.string,
};

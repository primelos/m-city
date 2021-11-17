import React, { useState, useReducer, useEffect } from "react";
import { showErrorToast } from "../Utils/tools";
import { CircularProgress } from "@mui/material";
import { matchesCollection } from "../../firebase";
import LeagueTable from "./tables";
import MatchesList from "./matchesList";

const TheMatches = () => {
  const [matches, setMatches] = useState(null);
  const [state, dispatch] = useReducer(
    (prevState, nextState) => {
      return { ...prevState, ...nextState };
    },
    {
      filterMatches: null,
      playedFilter: "All",
      resultFilter: "All",
    }
  );
  useEffect(() => {
    if (!matches) {
      matchesCollection
        .get()
        .then((snapshot) => {
          const matches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matches);
          dispatch({ ...state, filterMatches: matches });
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [matches, state]);

  const showPlayed = (played) => {
    const list = matches.filter((match) => {
      return match.final === played;
    });
    dispatch({
      ...state,
      filterMatches: played === "All" ? matches : list,
      playedFilter: played,
      resultFilter: "All",
    });
  };

  const showResult = (result) => {
    const list = matches.filter((match) => {
      return match.result === result;
    });
    dispatch({
      ...state,
      filterMatches: result === "All" ? matches : list,
      playedFilter: "All",
      resultFilter: result,
    });
  };

  console.log(state.filterMatches);
  return (
    <>
      {matches ? (
        <div className="the_matches_container">
          <div className="the_matches_wrapper">
            <div className="left">
              <div className="match_filters">
                <div className="match_filters_box">
                  <div className="tag">Show Matches</div>
                  <div className="cont">
                    <div
                      onClick={() => showPlayed("All")}
                      className={`option ${
                        state.playedFilter === "All" ? "active" : ""
                      } `}
                    >
                      All
                    </div>
                    <div
                      onClick={() => showPlayed("Yes")}
                      className={`option ${
                        state.playedFilter === "Yes" ? "active" : ""
                      }`}
                    >
                      Played
                    </div>
                    <div
                      onClick={() => showPlayed("No")}
                      className={`option ${
                        state.playedFilter === "No" ? "active" : ""
                      }`}
                    >
                      Not played
                    </div>
                  </div>
                </div>
                <div className="match_filters_box">
                  <div className="tag">Results</div>
                  <div className="cont">
                    <div
                      onClick={() => showResult("All")}
                      className={`option ${
                        state.resultFilter === "All" ? "active" : ""
                      }`}
                    >
                      All
                    </div>
                    <div
                      onClick={() => showResult("W")}
                      className={`option ${
                        state.resultFilter === "W" ? "active" : ""
                      }`}
                    >
                      W
                    </div>
                    <div
                      onClick={() => showResult("L")}
                      className={`option ${
                        state.resultFilter === "L" ? "active" : ""
                      }`}
                    >
                      L
                    </div>
                    <div
                      onClick={() => showResult("D")}
                      className={`option ${
                        state.resultFilter === "D" ? "active" : ""
                      }`}
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>
              <MatchesList matches={state.filterMatches} />
            </div>
            <div className="right">
              <LeagueTable />
            </div>
          </div>
        </div>
      ) : (
        <div className="progress">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default TheMatches;

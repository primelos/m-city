import React, { useEffect, useState } from "react";
import PlayerCard from "../Utils/playerCard";
import { Slide } from "react-awesome-reveal";
import { Promise } from "core-js";

import { showErrorToast } from "../Utils/tools";
import { firebase, playersCollection } from "../../firebase";
import { CircularProgress } from "@mui/material";

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      playersCollection
        .get()
        .then((snapshot) => {
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let promises = [];
          players.forEach((player, index) => {
            promises.push(
              new Promise((resolve, reject) => {
                firebase
                  .storage()
                  .ref("players")
                  .child(player.image)
                  .getDownloadURL()
                  .then((url) => {
                    players[index].url = url;
                    resolve();
                  })
                  .catch((error) => {
                    reject();
                  });
              })
            );
          });
          Promise.all(promises).then(() => {
            setPlayers(players);
          });
        })
        .catch((error) => {
          showErrorToast(`Sorry try again later ${error}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  const showPlayerByCatergory = (category) =>
    players
      ? players.map((player) => {
          return player.position === category ? (
            <Slide left key={player.id} triggerOnce>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Slide>
          ) : null;
        })
      : null;

  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="team_category_wrapper">
            <div className="title">Keepers</div>
            <div className="team_cards">{showPlayerByCatergory("Keeper")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Defense</div>
            <div className="team_cards">{showPlayerByCatergory("Defense")}</div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Midfield</div>
            <div className="team_cards">
              {showPlayerByCatergory("Midfield")}
            </div>
          </div>
          <div className="team_category_wrapper">
            <div className="title">Striker</div>
            <div className="team_cards">{showPlayerByCatergory("Striker")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheTeam;

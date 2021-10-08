import React, { useEffect, useState } from "react";
import PlayerCard from "../Utils/playerCard";
import { Slide } from "react-awesome-reveal";
import { firebase, playerCollection, playersCollection } from "../../firebase";
import { showErrorToast } from "../Utils/tools";
import { Promise } from "core-js";

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      playersCollection
        .get()
        .then((snapshot) => {
          const player = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          let promises = [];
          players.forEach((player, index) => {
            promises.push(
              new Promise((resolve, reject) => {
                console.log("fire", firebase.storage().ref("players"));
                firebase
                  .storage()
                  .ref("players")
                  .child(player.image)
                  .getDownloadURL()
                  .then((url) => {
                    console.log("url", url);
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
          showErrorToast("Sorry try again later");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  console.log(players);
  return <div>team</div>;
};

export default TheTeam;

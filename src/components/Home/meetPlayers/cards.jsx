import React from "react";
import Animate from "react-move/Animate";
import { easePolyOut } from "d3-ease";

import Otamendi from "../../../Resources/images/players/Otamendi.png";
import Raheem_Sterling from "../../../Resources/images/players/Raheem_Sterling.png";
import Vincent_Kompany from "../../../Resources/images/players/Vincent_Kompany.png";
import PlayerCard from "../../Utils/playerCard";

let cards = [
  {
    id: 1,
    bottom: 90,
    left: 300,
    player: Vincent_Kompany,
  },
  {
    id: 2,
    bottom: 60,
    left: 200,
    player: Raheem_Sterling,
  },
  {
    id: 3,
    bottom: 30,
    left: 100,
    player: Otamendi,
  },
  {
    id: 4,
    bottom: 0,
    left: 0,
    player: Vincent_Kompany,
  },
];

const HomeCards = (props) => {
  const showAnimateCards = () =>
    cards.map((card, i) => (
      <Animate
        key={card.id}
        show={props.show}
        start={{
          left: 0,
          bottom: 0,
        }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { delay: 500, duration: 500, ease: easePolyOut },
        }}
      >
        {({ left, bottom }) => (
          <div
            style={{
              position: "absolute",
              left,
              bottom,
            }}
          >
            <PlayerCard
              number={30}
              name="Nicolas"
              lastName="Otamendi"
              bck={card.player}
            />
          </div>
        )}
      </Animate>
    ));

  return <div>{showAnimateCards()}</div>;
};

export default HomeCards;

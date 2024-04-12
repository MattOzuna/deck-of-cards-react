import { useEffect, useState } from "react";
import "./Deck.css";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

const Deck = () => {
  const [Deck, setDeck] = useState();
  const [Cards, setCards] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${Deck}/draw/?count=1`);
      if (!response.data.success) {
        alert("Error: no cards remaining!");
      }
      setCards([...Cards, ...response.data.cards]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    function getDeckWhenMounted() {
      const fetchDeck = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/new/shuffle`);
          setDeck(response.data.deck_id);
        } catch (err) {
          console.log(err);
        }
      };
      if (!Deck) fetchDeck();
    },
    [Deck]
  );

  if (Deck) {
    return (
      <div>
        <div className="Deck">
          {Cards.map(({ image, value, suit }, idx) => {
            return (
              <Card
                image={image}
                value={value}
                suit={suit}
                key={Deck + idx}
                idx={idx}
              />
            );
          })}
        </div>
        <button onClick={handleClick}>Draw a Card</button>
      </div>
    );
  }
};

export default Deck;

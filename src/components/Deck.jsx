import { useEffect, useState } from "react";
import "./Deck.css";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

const Deck = () => {
  const [Deck, setDeck] = useState();
  const [Cards, setCards] = useState([]);
  const [Loading, setLoading] = useState(true);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/${Deck}/draw/?count=1`);
      if (!response.data.success) {
        alert("Error: no cards remaining!");
      }
      setCards([...Cards, ...response.data.cards]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShuffle = async () => {
    setLoading(true);
    try {
      await axios.get(`${BASE_URL}/${Deck}/shuffle`);
      setCards([])
      setLoading(false);
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
          setLoading(false);
          console.log("Fully loaded");
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
        <button className="Deck-button" onClick={!Loading ? handleClick : null}>
          Draw a Card
        </button>
        <button
          className="Deck-button"
          onClick={!Loading ? handleShuffle : null}
        >
          Shuffle Deck
        </button>
      </div>
    );
  }
};

export default Deck;

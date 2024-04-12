import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

const Deck = () => {
  const [DeckId, setDeckId] = useState();
  const [Cards, setCards] = useState([]);
  const [Count, setCount] = useState(53);

  const handleClick = () => {
    setCount((Count) => --Count);
  };

  const handleShuffle = async () => {
    await axios.get(`${BASE_URL}/${DeckId}/shuffle`);
    const response = await axios.get(`${BASE_URL}/new/draw/?count=52`);
    setCards([...response.data.cards]);
    setCount(52);
  };

  useEffect(
    function getDeckWhenMounted() {
      const fetchDeck = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/new/draw/?count=52`);
          setDeckId((Deck.id = response.data.deck_id));
          setCards([...response.data.cards]);
        } catch (err) {
          console.log(err);
        }
      };
      if (!DeckId) fetchDeck();
    },
    [DeckId]
  );

  if (Count === 0) {
    console.log("alert");
    alert("Error: no cards remaining!");
    return (
      <div>
        <button onClick={handleShuffle}>Shuffle New Deck</button>
      </div>
    );
  } else if (Count !== 53 && Count !== 0) {
    const { value, suit, image } = Cards[Count - 1];
    return (
      <div>
        <Card
          key={value ? `${value}-${suit}` : "Joker"}
          value={value ? value : null}
          suit={suit ? suit : null}
          image={image ? image : null}
        />
        <button onClick={handleClick}>Draw a Card</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>Draw a Card</button>
    </div>
  );
};

export default Deck;

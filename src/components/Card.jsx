import { useState } from "react";

const Card = ({value, suit, image}) => {

  return <div>
      <img src={image} alt={`${value} of ${suit}`} />
    </div>;
};

export default Card;

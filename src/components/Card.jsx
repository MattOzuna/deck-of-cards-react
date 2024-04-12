import "./Card.css";

const Card = ({ value, suit, image, idx, angle}) => {
  return (
    <div className="Card" style={{zIndex:`${idx}`, rotate: `${angle}deg`}}>
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;

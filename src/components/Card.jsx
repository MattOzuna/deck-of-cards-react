import "./Card.css";

const Card = ({ value, suit, image, idx}) => {
  return (
    <div className="Card" style={{zIndex:`${idx}`}}>
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;

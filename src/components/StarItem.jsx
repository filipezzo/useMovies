import { Star } from "lucide-react";

function StarItem({ rating, onRating, index, onClicked }) {
  const handleClick = () => {
    onRating(index + 1);
    onClicked(true);
  };

  return (
    <Star
      fill={index < rating ? "#fde047" : "none"}
      className="cursor-pointer duration-300"
      onClick={handleClick}
    />
  );
}

export default StarItem;

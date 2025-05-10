import { useState } from "react";

const Card = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { _id, name, description, price, image, category } = item;

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className="rating gap-1 absolute right-2 top-2 p-4 heartStar z-40 bg-red rounded-md"
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="rating-3"
          className={`mask mask-heart ${isHeartFilled ? "bg-white" : ""
            } hover:bg-white transition-all delay-100`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60 md:w-60 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{name}</h2>
        <p className="line-clamp-2">{description}</p>
        <div className="card-action flex justify-between items-center mt-2">
          <h5 className="font-semibold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button className="btn bg-red rounded-md text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

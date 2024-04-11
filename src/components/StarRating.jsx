import StarItem from "./StarItem";

const arr = new Array(10).fill(null);

export function StarRating({ onCLicked, rating, onRate }) {
  const handleClick = (index) => {
    onRate(+index);
  };

  return (
    <>
      <div className="mx-auto my-8 flex max-w-md items-center justify-center rounded-md p-4 ring ring-slate-500">
        {arr.map((_, index) => (
          <StarItem
            key={index}
            index={index}
            onRating={handleClick}
            rating={rating}
            onClicked={onCLicked}
          />
        ))}
        {rating > 0 && (
          <strong className="ml-4 font-bold text-indigo-600">{rating}</strong>
        )}
      </div>
    </>
  );
}

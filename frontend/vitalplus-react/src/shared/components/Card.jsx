const Card = ({ product }) => {
  const { title, image, price, description } = product;

  return (
  <div
  className="
    w-full
    max-w-[260px]
    bg-white
    text-text-primary
    shadow-md
    rounded-2xl
    overflow-hidden
    hover:shadow-2xl
    transition-all
    duration-300
  "
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain bg-white"
      />

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-text-primary">
          {title}
        </h2>

        <p className="text-sm text-text-secondary">
          {description}
        </p>

        <p className="text-lg font-bold text-brand">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Card;



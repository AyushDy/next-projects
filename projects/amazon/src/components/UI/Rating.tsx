import { FaStar } from "react-icons/fa";

export default function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <FaStar
        key={index}
        className={`text-yellow-500 h-3 ${
          index < rating ? "fill-current" : "text-gray-300"
        }`}
      />
    );
  });

  return <div className="flex items-center">{stars}</div>;
}
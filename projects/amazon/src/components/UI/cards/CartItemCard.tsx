import AddToCartButton from "../buttons/AddToCartButton";
import RemoveFromCartButton from "../buttons/RemoveFromCartButton";

export default function CartItemCard({ product }: { product: any }) {
  return (
    <div className="px-5 py-5 mt-5 shadow md:flex rounded-lg max-w-[280px] md:max-w-[1200px] md:gap-10 ">
      <div className="p-2 bg-gray-300 rounded-lg flex justify-center items-center">
        <img className="max-w-40" src={product.image_url} alt="" />
      </div>
      <div className="w-full">
        <div className="flex md:justify-between  ">
          <h2 className="text-lg md:text-2xl font-semibold md:font-bold mt-2">
            {product.title}
          </h2>
          <p className="text-xl font-bold mt-2 md:text-2xl">${product.price}</p>
        </div>
        <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 md:flex md:justify-between ">
          <div className="md:max-w-50">
            <AddToCartButton product={product} />
          </div>
          <RemoveFromCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

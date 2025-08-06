import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function PriceFilterCard() {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");

    if (urlMinPrice) setMinPrice(Number(urlMinPrice));
    if (urlMaxPrice) setMaxPrice(Number(urlMaxPrice));
  }, [searchParams]);

  const updateURL = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("minPrice", String(minPrice));
      params.set("maxPrice", String(maxPrice));

      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
      updateURL();
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
      updateURL();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Salary Filter</h2>

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Min: {formatPrice(minPrice)}</span>
        <span>Max: {formatPrice(maxPrice)}</span>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <label htmlFor="minPrice" className="text-sm text-foreground">
            Minimum Salary
          </label>
          <input
            type="range"
            min="0"
            value={minPrice}
            max="200000"
            step="5000"
            id="minPrice"
            name="minPrice"
            onChange={handleMinPriceChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxPrice" className="text-sm text-foreground">
            Maximum Salary
          </label>
          <input
            type="range"
            min="5000"
            value={maxPrice}
            max="200000"
            step="5000"
            id="maxPrice"
            name="maxPrice"
            onChange={handleMaxPriceChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function PriceFilterCard() {
  const [minSalary, setminSalary] = useState<number>(0);
  const [maxSalary, setmaxSalary] = useState<number>(200000);
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const urlminSalary = searchParams.get("minSalary");
    const urlmaxSalary = searchParams.get("maxSalary");

    if (urlminSalary) setminSalary(Number(urlminSalary));
    if (urlmaxSalary) setmaxSalary(Number(urlmaxSalary));
  }, [searchParams]);

  const updateURL = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("minSalary", String(minSalary));
      params.set("maxSalary", String(maxSalary));

      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);
  };

  const handleminSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (value <= maxSalary) {
      setminSalary(value);
      updateURL();
    }
  };

  const handlemaxSalaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (value >= minSalary) {
      setmaxSalary(value);
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
        <span>Min: {formatPrice(minSalary)}</span>
        <span>Max: {formatPrice(maxSalary)}</span>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <label htmlFor="minSalary" className="text-sm text-foreground">
            Minimum Salary
          </label>
          <input
            type="range"
            min="0"
            value={minSalary}
            max="200000"
            step="5000"
            id="minSalary"
            name="minSalary"
            onChange={handleminSalaryChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxSalary" className="text-sm text-foreground">
            Maximum Salary
          </label>
          <input
            type="range"
            min="5000"
            value={maxSalary}
            max="200000"
            step="5000"
            id="maxSalary"
            name="maxSalary"
            onChange={handlemaxSalaryChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

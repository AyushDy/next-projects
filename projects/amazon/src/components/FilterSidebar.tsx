"use client"
import { categoryList } from "@/data/data";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



export default function FilterSidebar() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const router = useRouter();
    async function applyFilters(formData: FormData) {
        
        const category = formData.get("category") as string;
        const minPrice = formData.get("minPrice") as string;
        const maxPrice = formData.get("maxPrice") as string;
        const queryParams: string[] = [];
        if (query) {
            queryParams.push(`q=${encodeURIComponent(query)}`);
        }
        if (category && category !== "all") {
            queryParams.push(`category=${category}`);
        }
        if (minPrice) {
            queryParams.push(`minPrice=${minPrice}`);
        }
        if (maxPrice) {
            queryParams.push(`maxPrice=${maxPrice}`);
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
        const url = `/search${queryString}`;
        router.push(url);
    }





  return (
    <div className="">
        <form action={applyFilters} className="">
            <h2 className="">Filters</h2>
            <div className="">
                <label className="">Category</label>
                <select name="category" className="">
                    <option value="all">All</option>
                    {categoryList.map((category: string) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className=" flex flex-col">
                <label className="">Price Range</label>
                <input type="number" name="minPrice" placeholder="Min Price" className="border p-2 rounded  mb-2" />
                <input type="number" name="maxPrice" placeholder="Max Price" className="border p-2 rounded " />
            </div>


            <button type="submit" className=" p-2 rounded">Apply Filters</button>
        </form>
    </div>
  );
}
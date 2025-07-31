import { categoryList } from "@/data/data";

export default function Caregories() {

    return (
        <div className="flex items-center justify-evenly  gap-4 py-1 px-2 bg-[#232f3e] overflow-scroll scrollbar-hidden">
            {categoryList.map(category=>(
                <h4
                    key={category}
                    className="text-white font-light border border-[#232f3e] hover:border-white hover:cursor-pointer rounded py-0.5 px-1 flex items-center w-fit whitespace-nowrap"
                    style={{ backgroundColor: category }}
                >
                    {category}
                </h4>
            ))}
        </div>
    )
}
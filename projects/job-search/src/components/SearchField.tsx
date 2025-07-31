import { Search } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchField(){
    const [query,setQuery] = useState<string>("");
    const router = useRouter();

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        params.set("q",query);
        
    }

    return(
        <form className="flex mx-5 lg:w-1/4 ml-auto bg-white/10 p-3 rounded-full text-md" onSubmit={handleSubmit}>
            <input className="w-full px-2 outline-none" type="text" placeholder="Search..." value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <button type="submit">
                <Search />
            </button>
        </form>
    )
}
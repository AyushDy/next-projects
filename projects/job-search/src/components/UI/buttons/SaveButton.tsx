import { Bookmark } from "lucide-react"

export default function SaveButton(){

    return(
        <button className=" px-3 py-2 bg-primary/40 text-primary-foreground rounded border border-white/20 cursor-pointer hover:bg-primary">
            <Bookmark size={18}/>
        </button>
    )
}
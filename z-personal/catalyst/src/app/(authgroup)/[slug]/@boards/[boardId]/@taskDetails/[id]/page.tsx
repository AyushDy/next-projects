import Link from "next/link";

export default async function page({params}:{params : Promise<{id:string, boardId:string, slug:string}>}) {
    const { id, boardId, slug } = await params;
    return (
        <Link href={`/${slug}/${boardId}/${id}`} className="h-screen w-screen md:p-20 p-5 z-50 flex items-center justify-center inset-0 fixed bg-black/20">
            <div className="text-white p-20 bg-background">Task Details for Task ID: {id}</div>
        </Link>
    )
}

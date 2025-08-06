import Link from "next/link";

export default function ProfileLink({text, url}: {text: string; url: string}) {
    return(
        <Link
          href={url}
          className="block p-2 w-fit hover:bg-gray-50 dark:hover:bg-white/10 rounded text-gray-900 dark:text-white"
        >
          {text}
        </Link>
    ) 
}
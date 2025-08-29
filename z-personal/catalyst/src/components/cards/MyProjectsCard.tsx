import Link from "next/dist/client/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MyProjectsCard({ projectName, slug, ownerImg }: { projectName: string; slug: string; ownerImg: string }) {
  return (
    <div className="ml-10 flex gap-2 items-center">
      <Avatar className="h-5 w-5 flex items-center">
        <AvatarImage src={ownerImg} alt="Profile Picture" />
        <AvatarFallback>
          {projectName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>{" "}
      <Link href={`/${slug}`} className="font-light hover:underline">{projectName}</Link>
    </div>
  );
}

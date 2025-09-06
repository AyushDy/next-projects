import Link from "next/dist/client/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { memo } from "react";

interface MyProjectsCardProps {
  projectName: string;
  slug: string;
  ownerImg: string;
}

const MyProjectsCard = memo(function MyProjectsCard({
  projectName,
  slug,
  ownerImg,
}: MyProjectsCardProps) {
  return (
    <div className="ml-10 flex gap-2 items-center">
      <Avatar className="h-5 w-5 flex items-center">
        <AvatarImage src={ownerImg} alt="Profile Picture" />
        <AvatarFallback>{projectName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>{" "}
      <Link href={`/${slug}`} className="font-light hover:underline">
        {projectName}
      </Link>
    </div>
  );
});

export default MyProjectsCard;

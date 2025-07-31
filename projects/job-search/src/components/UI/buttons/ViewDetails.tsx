import Link from "next/link";

export default function ViewDetails({ job_id }: { job_id: string }) {
  return <Link className="px-5 py-2 bg-primary/40 text-primary-foreground rounded border border-white/20 cursor-pointer hover:bg-primary"
   href={`/jobs/${job_id}`}>
    <button className="cursor-pointer">Details</button>
   </Link>;
}

import Link from "next/link";
import SaveButton from "../UI/buttons/SaveButton";

export default function ProfileJobCard({ type, job }: { type: string; job: any }) {

    return (
        <div className="flex justify-between p-4 border rounded">
            <div>
                <img src={job.company.logo} alt={job.company.name} className="w-12 h-12 mr-4" />
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company.name}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
            </div>
            <div className="flex items-center">
                <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:text-blue-700 mr-4">
                    View Job
                </Link>
                {type === "saved" && (
                    <SaveButton job={job} />
                )}
            </div>
        </div>
    );
  }

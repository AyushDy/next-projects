import { Edit, Trash2, Eye, Calendar, DollarSign, MapPin } from "lucide-react";
import { JobWithTime } from "@/lib/types";
import Button from "@/components/UI/Button";
import { useParams, useRouter } from "next/navigation";
import DeleteButton from "./buttons/DeleteButton";
import ApplicantList from "./ApplicantList";
import { useState } from "react";
import ShowApplicantsButton from "./buttons/ShowApplicants";

export default function JobCard({
  job,
  handleDelete,
}: {
  job: JobWithTime;
  handleDelete: (jobId: string) => Promise<void>;
}) {
  const params = useParams();
  const companyId = params.id;

  const router = useRouter();
  const formatSalary = () => {
    if (!job.minSalary && !job.maxSalary) return null;
    const currency = "USD";
    if (job.minSalary && job.maxSalary) {
      return `${currency} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}`;
    }
    return `${currency} ${(job.minSalary || job.maxSalary)?.toLocaleString()}`;
  };

  return (
    <div className="bg-background/10 backdrop-blur-sm border border-border rounded-lg p-4 hover:bg-background/40 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">{job.title}</h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.city}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {job.postedAt}
            </div>
            {formatSalary() && (
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {formatSalary()}
              </div>
            )}
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
              {job.employmentType}
            </span>
          </div>

          <p
            className="text-muted-foreground text-sm overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {job.description.slice(0, 150)}...
          </p>
        </div>

        <div className="flex flex-col space-y-5">
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              title="view job details"
              icon={Eye}
              onClick={() => {
                router.push(`/company/${companyId}/${job.id}`);
              }}
              className="p-2"
            />
            <Button
              variant="ghost"
              size="sm"
              title="edit job details"
              onClick={() => {
                router.push(`/company/${companyId}/${job.id}/edit`);
              }}
              icon={Edit}
              className="p-2"
            />
            <DeleteButton jobId={job.id} handleDelete={handleDelete} />
          </div>
          <ShowApplicantsButton id={job.id} title={job.title} />
        </div>
      </div>
    </div>
  );
}

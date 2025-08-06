import { getJobById } from "@/lib/utils";
import JobDetailsClient from "./JobDetailsPage";
import JobNotFound from "@/components/cards/JobNotFound";
import { JobWithTime } from "@/lib/types";
import JobDetailsPage from "./JobDetailsPage";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getJobById(id);

  return <JobDetailsPage job={response?.data?.data as JobWithTime} />;
}

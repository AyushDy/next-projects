
type CompanyInformationProps = {
    employer_name: string;
    employer_logo: string | null;
    job_location: string;
}



export default function CompanyInformation({
  employer_name,
  employer_logo,
  job_location,
}: CompanyInformationProps) {
  return (
    <>
      <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold text-foreground mb-4">
          Company Information
        </h3>
        <div className="flex items-center gap-4">
          {employer_logo && (
            <img
              src={employer_logo}
              alt={`${employer_name} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div>
            <h4 className="font-medium text-foreground">{employer_name}</h4>
            <p className="text-sm text-muted-foreground">{job_location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

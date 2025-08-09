interface JobSummaryProps {
  employmentType: string;
  location: string;
  city: string;
  isRemote: boolean;
  postedAt: string;
  salary?: number;
  minSalary?: number;
  maxSalary?: number;
}

export default function JobSummary({
  employmentType,
  location,
  city,
  isRemote,
  postedAt,
  salary,
  minSalary,
  maxSalary,
}: JobSummaryProps) {
  const getSalaryDisplay = () => {
    if (salary) return `$${salary.toLocaleString()}`;
    if (minSalary && maxSalary) {
      return `$${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`;
    }
    if (minSalary) {
      return `$${minSalary.toLocaleString()}+`;
    }
    return "Competitive";
  };

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
        Job Summary
      </h3>
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Job Type:</span>
          <span className="text-foreground font-medium">{employmentType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Location:</span>
          <span className="text-foreground font-medium truncate ml-2">{city}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Remote:</span>
          <span className="text-foreground font-medium">
            {isRemote ? "Yes" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Posted:</span>
          <span className="text-foreground font-medium">{postedAt}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Salary:</span>
          <span className="text-foreground font-medium truncate ml-2">
            {getSalaryDisplay()}
          </span>
        </div>
      </div>
    </div>
  );
}

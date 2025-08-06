interface JobSalaryProps {
  salary?: number;
  minSalary?: number;
  maxSalary?: number;
  salaryPeriod?: string;
}

export default function JobSalary({
  salary,
  minSalary,
  maxSalary,
  salaryPeriod,
}: JobSalaryProps) {
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
    <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-lg font-semibold whitespace-nowrap">
      {getSalaryDisplay()}
      {salaryPeriod && (
        <span className="text-sm font-normal">/{salaryPeriod}</span>
      )}
    </div>
  );
}

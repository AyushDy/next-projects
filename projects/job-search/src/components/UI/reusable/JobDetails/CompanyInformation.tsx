type CompanyInformationProps = {
  employerName: string;
  employerLogo: string | null;
  location: string;
};

export default function CompanyInformation({
  employerName,
  employerLogo,
  location,
}: CompanyInformationProps) {
  return (
    <>
      <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold text-foreground mb-4">
          Company Information
        </h3>
        <div className="flex items-center gap-4">
          {employerLogo && (
            <img
              src={employerLogo}
              alt={`${employerName} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div>
            <h4 className="font-medium text-foreground">{employerName}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

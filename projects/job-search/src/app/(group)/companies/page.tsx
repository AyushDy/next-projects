import CompaniesListContainer from "@/components/companies/CompaniesListContainer";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Browse Companies
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover companies and explore career opportunities
          </p>
        </div>
        <CompaniesListContainer />
      </div>
    </div>
  );
}

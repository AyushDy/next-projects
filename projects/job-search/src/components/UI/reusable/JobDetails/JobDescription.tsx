interface JobDescriptionProps {
  description: string;
}

export default function JobDescription({ description }: JobDescriptionProps) {
  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
        Job Description
      </h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}

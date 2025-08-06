
import AnimatedSection from '@/components/animations/AnimatedSection';
import StaggeredGrid from '@/components/animations/StaggeredGrid';

export default function Home() {

  
  return (
    <div className="bg-gradient-to-br from-background to-primary/5 dark:to-primary/10 min-h-screen">
      
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl space-y-8">
          <AnimatedSection direction="fade" delay={200}>
            <h1 className="text-6xl md:text-8xl font-extrabold text-foreground">
              SEARCH FOR YOUR{" "}
              <span className="text-muted-foreground hover:text-foreground/80 transition-colors duration-300">
                DREAMJOB
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={400}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with opportunities that match your passion. 
              Your next career breakthrough is just one search away.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Stats Section */}
      <AnimatedSection direction="up">
        <div className="bg-card/20 backdrop-blur-lg py-20 border-y border-border/20">
          <div className="max-w-4xl mx-auto px-6">
            <StaggeredGrid 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              itemDelay={150}
            >
              {[
                { value: "50K+", label: "Active Job Listings" },
                { value: "10K+", label: "Companies Hiring" },
                { value: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-5xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </StaggeredGrid>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">
              FIND JOBS THAT{" "}
              <span className="text-muted-foreground">
                INSPIRE YOU
              </span>
            </h2>
          </AnimatedSection>
          
          <StaggeredGrid 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            itemDelay={120}
          >
            {[
              { 
                title: "Smart Matching", 
                description: "Our AI-powered algorithm connects you with roles that truly fit your career goals."
              },
              { 
                title: "Instant Applications", 
                description: "Apply to multiple positions with one click. Save time and maximize opportunities."
              },
              { 
                title: "Real-Time Updates", 
                description: "Get notified instantly when companies view your profile or new positions match your criteria."
              },
              { 
                title: "Career Growth", 
                description: "Access exclusive career resources and salary insights to accelerate your development."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-card/20 backdrop-blur-lg p-6 rounded-xl border border-border/20 hover:bg-card/30 transition-colors duration-300">
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </StaggeredGrid>
        </div>
      </div>

      {/* Footer */}
      <AnimatedSection direction="up">
        <div className="py-12 px-6 border-t border-border/20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold text-foreground">
              DREAMJOB
            </div>
            <div className="flex gap-6 text-muted-foreground">
              {['About', 'Jobs', 'Companies', 'Contact'].map((item, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
});

export default function Home() {
  return (
    <div className={`font-sans bg-gradient-to-br from-gray-900 to-primary ${inter.variable}`}>
      {/* Hero Section */}
      <div className="min-h-screen flex justify-center items-center w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-6xl space-y-8">
          <div className="inline-flex relative group">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-tight tracking-tight">
              SEARCH FOR YOUR{" "}
              <span className="relative">
                <span className="text-white/20 transition-all duration-700 group-hover:text-white/60">
                  DREAMJOB
                </span>
                <span className="absolute inset-0 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000"></span>
              </span>
            </h1>
          </div>
          
          <p className="text-xl sm:text-2xl text-white/80 mt-8 max-w-3xl mx-auto leading-relaxed">
            Connect with opportunities that match your passion. 
            Your next career breakthrough is just one search away.
          </p>
          
          <div className="mt-12">
            <button className="relative overflow-hidden bg-white text-primary px-10 py-4 sm:px-12 sm:py-5 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
              <span className="relative z-10">Start Your Search</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
            {[
              { value: "50K+", label: "Active Job Listings" },
              { value: "10K+", label: "Companies Hiring" },
              { value: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative p-6 hover:scale-[1.03] transition-all duration-300"
              >
                <div className="text-5xl sm:text-6xl font-extrabold text-white mb-4 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-cyan-400 to-purple-500">
                  {stat.value}
                </div>
                <p className="text-white/70 text-lg relative">
                  {stat.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 group-hover:w-4/5 group-hover:left-[10%]"></span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center mb-16 md:mb-24">
            FIND JOBS THAT{" "}
            <span className="text-white/20 hover:text-white/60 transition-all duration-500">
              INSPIRE YOU
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: "Smart Matching", 
                description: "Our AI-powered algorithm analyzes your skills, experience, and preferences to connect you with roles that truly fit your career goals.",
                color: "from-cyan-400 to-blue-500"
              },
              { 
                title: "Instant Applications", 
                description: "Apply to multiple positions with one click. Your profile syncs across all applications, saving you time and maximizing opportunities.",
                color: "from-purple-400 to-pink-500"
              },
              { 
                title: "Real-Time Updates", 
                description: "Get notified instantly when companies view your profile or when new positions matching your criteria become available.",
                color: "from-green-400 to-teal-500"
              },
              { 
                title: "Career Growth", 
                description: "Access exclusive career resources, salary insights, and interview preparation tools to accelerate your professional development.",
                color: "from-yellow-400 to-orange-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-500 hover:border-white/30 hover:bg-gradient-to-br hover:from-white/5 hover:to-white/[0.02] overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute -inset-6 bg-gradient-to-br opacity-10 blur-xl transition-all duration-1000 group-hover:opacity-20"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 bg-gradient-to-br ${feature.color}`}>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-black/20 rounded-full"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8">
              READY TO{" "}
              <span className="relative">
                <span className="text-white/20 hover:text-white/60 transition-all duration-500">
                  TRANSFORM
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></span>
              </span>{" "}
              YOUR CAREER?
            </h2>
          </div>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have found their dream jobs. 
            Your perfect role is waiting for you.
          </p>
          
          <button className="relative overflow-hidden bg-white text-primary px-12 py-5 text-xl font-bold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
            <span className="relative z-10">Get Started Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 -translate-x-full hover:translate-x-full transition-all duration-1000"></span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold text-white">
            DREAMJOB
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-white/70">
            {['About', 'Jobs', 'Companies', 'Contact'].map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className="relative transition-colors hover:text-white group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
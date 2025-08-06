export interface job {
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_publisher: string;
  job_description: string;
  job_employment_type: string;
  job_is_remote: string;
  job_posted_at: string;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
}

export interface JobWithTime extends job {
  job_posted_at: string;
}

export interface JobType extends job {
  job_id: string;
}

export interface JobWithIdType extends job {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const jobEntries = [
  {
    job_title: "Software Engineer",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description: "Develop and maintain software applications.",
    job_employment_type: "Full-time",
    job_is_remote: "true",
    job_city: "San Francisco",
    job_location: "Remote",
    job_benefits: ["Health Insurance", "401k"],
    job_salary: 120000,
    job_min_salary: 100000,
    job_max_salary: 140000,
    job_salary_period: "yearly",
    job_qualifications: ["Bachelor's Degree", "3+ years experience"],
    job_responsibilities: ["Write code", "Fix bugs"],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "Frontend Developer",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Build responsive and interactive user interfaces using modern web technologies.",
    job_employment_type: "Full-time",
    job_is_remote: "true",
    job_city: "New York",
    job_location: "Remote",
    job_benefits: ["Health Insurance", "401k", "Flexible Hours"],
    job_salary: 95000,
    job_min_salary: 80000,
    job_max_salary: 110000,
    job_salary_period: "yearly",
    job_qualifications: [
      "Bachelor's Degree",
      "React experience",
      "JavaScript proficiency",
    ],
    job_responsibilities: [
      "Develop UI components",
      "Optimize performance",
      "Collaborate with designers",
    ],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "Backend Developer",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Design and implement server-side logic, databases, and APIs.",
    job_employment_type: "Part-time",
    job_is_remote: "false",
    job_city: "Austin",
    job_location: "Austin, TX",
    job_benefits: ["Health Insurance", "Remote Work Options"],
    job_salary: 85000,
    job_min_salary: 70000,
    job_max_salary: 100000,
    job_salary_period: "yearly",
    job_qualifications: [
      "Bachelor's Degree",
      "Node.js experience",
      "Database knowledge",
    ],
    job_responsibilities: [
      "Build APIs",
      "Database design",
      "Server maintenance",
    ],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "Data Analyst",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Analyze data to provide business insights and support decision-making processes.",
    job_employment_type: "Contract",
    job_is_remote: "true",
    job_city: "Chicago",
    job_location: "Remote",
    job_benefits: ["Flexible Schedule", "Learning Budget"],
    job_salary: 75000,
    job_min_salary: 60000,
    job_max_salary: 90000,
    job_salary_period: "yearly",
    job_qualifications: [
      "Bachelor's Degree",
      "SQL knowledge",
      "Excel expertise",
    ],
    job_responsibilities: [
      "Data analysis",
      "Report generation",
      "Dashboard creation",
    ],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "UI/UX Designer",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Create intuitive and visually appealing user interfaces and experiences.",
    job_employment_type: "Internship",
    job_is_remote: "false",
    job_city: "Seattle",
    job_location: "Seattle, WA",
    job_benefits: ["Mentorship Program", "Health Insurance"],
    job_salary: 45000,
    job_min_salary: 40000,
    job_max_salary: 50000,
    job_salary_period: "yearly",
    job_qualifications: [
      "Design portfolio",
      "Figma proficiency",
      "User research knowledge",
    ],
    job_responsibilities: [
      "Design mockups",
      "User research",
      "Prototype creation",
    ],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "DevOps Engineer",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Manage CI/CD pipelines and cloud infrastructure for scalable applications.",
    job_employment_type: "Freelance",
    job_is_remote: "true",
    job_city: "Denver",
    job_location: "Remote",
    job_benefits: ["Flexible Hours", "Project Bonuses"],
    job_salary: 110000,
    job_min_salary: 95000,
    job_max_salary: 125000,
    job_salary_period: "yearly",
    job_qualifications: [
      "AWS certification",
      "Docker experience",
      "Kubernetes knowledge",
    ],
    job_responsibilities: [
      "Deploy applications",
      "Monitor systems",
      "Automate processes",
    ],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "QA Engineer",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Ensure software quality through comprehensive testing and automation.",
    job_employment_type: "Full-time",
    job_is_remote: "false",
    job_city: "Boston",
    job_location: "Boston, MA",
    job_benefits: ["Health Insurance", "401k", "Training Budget"],
    job_salary: 80000,
    job_min_salary: 70000,
    job_max_salary: 90000,
    job_salary_period: "yearly",
    job_qualifications: [
      "Testing experience",
      "Automation tools",
      "Bug tracking systems",
    ],
    job_responsibilities: ["Write test cases", "Execute tests", "Report bugs"],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
  {
    job_title: "Product Manager",
    employer_name: "Admin Company",
    employer_logo: "https://image.pngaaa.com/392/5315392-middle.png",
    job_description:
      "Lead product development and strategy to deliver exceptional user experiences.",
    job_employment_type: "Full-time",
    job_is_remote: "true",
    job_city: "Miami",
    job_location: "Remote",
    job_benefits: ["Health Insurance", "Stock Options", "Unlimited PTO"],
    job_salary: 130000,
    job_min_salary: 115000,
    job_max_salary: 145000,
    job_salary_period: "yearly",
    job_qualifications: [
      "MBA preferred",
      "Product management experience",
      "Agile methodology",
    ],
    job_responsibilities: [
      "Define product roadmap",
      "Coordinate teams",
      "Analyze metrics",
    ],
    company_id: "688f1920de6e0cd1aa4c1ca1",
  },
];

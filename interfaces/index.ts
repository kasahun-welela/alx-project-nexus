export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  country: string;
  region: string;
  jobType: string;
  salary: number;
  category: string;
  createdAt: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  experience: string;
  education: string;
  companyDescription: string;
  companySize: string;
  companyWebsite: string;
  companyEmail: string;
  companyPhone: string;
}

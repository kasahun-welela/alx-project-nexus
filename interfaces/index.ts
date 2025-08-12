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
  updatedAt: string;
  
}

export interface Application {
  _id: string;
  user: string;
  job: Job;
  coverLetter?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
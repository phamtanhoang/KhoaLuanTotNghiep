interface JobModel {
  id: string;
  created: Date;
  updated: Date;
  toDate: string;
  name: string;
  description: string;
  experience: string;
  fromSalary: string;
  toSalary: string;
  location: string;
  status: string;
  categoryId: string;
  categoryName: string;
  hrId:string;
  hrName: string;
  employerName: string;
  employerId: string;
  employerEmail: string;
  processId: string;
  processName: string;
  steps: StepModel[];
  tags: TagModel[];
}

interface JobModel {
  id?: string;
  created?: Date;
  updated?: Date;
  toDate?: string;
  name?: string;
  description?: string;
  experience?: string;
  fromSalary?: string;
  toSalary?: string;
  location?: string;
  status?: string;
  categoryId: string;
  hrId?: string;
  employerId?: string;
  isVip?: boolean;
  isTimeUp?: boolean;
  isApplied?: boolean;
  isSaved?: boolean;
  processId?: string;
}

interface ApplicationModel {
  id: string;
  applyDate?: Date;
  cV?: string;
  title?: string;
  candidate?: CandidateModel;
  currentStep?: number;
  email?: string;
  fullName?: string;
  job?: JobModel;
  letter?: string;
  phoneNumber?: string;
  status?: string;
}

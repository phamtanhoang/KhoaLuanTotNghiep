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
  isSave?: boolean;
  isTimeUp?: boolean;
  isApply?: boolean;
  category?: CategoryModel;
  employer?: EmployerModel;
  humanResource?: HumanResourceModel;
  process?: ProcedureModel;
  tags?: TagModel;
}

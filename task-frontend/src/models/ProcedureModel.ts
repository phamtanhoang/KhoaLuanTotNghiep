interface ProcedureModel {
  id?: string;
  name?: string;
  description?: string;
  employer_id?: string;
  created?: string;
  updated?: string;
  totalStep?: number;
  steps?: StepModel;
}

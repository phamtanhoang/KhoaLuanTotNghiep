import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SingleDataReducerState {
  candidate: CandidateModel | null;
  category: CategoryModel | null;
  education: EducationlModel | null;
  employer: EmployerModel | null;
  experience: ExperienceModel | null;
  humanResource: HumanResourceModel | null;
  job: JobModel | null;
  procedure: ProcedureModel | null;
  skill: SkillModel | null;
  step: StepModel | null;
  tag: TagModel | null;
}

const initialState: SingleDataReducerState = {
  candidate: null,
  category: null,
  education: null,
  employer: null,
  experience: null,
  humanResource: null,
  job: null,
  procedure: null,
  skill: null,
  step: null,
  tag: null,
};
export const listDataReducer = createSlice({
  name: "listDataReducer",

  initialState,

  reducers: {
    ONCHANGE_JOB_SINGLE: (state, action: PayloadAction<JobModel | null>) => {
      state.job = action.payload;
    },
    ONCHANGE_EMPLOYER_SINGLE: (
      state,
      action: PayloadAction<EmployerModel | null>
    ) => {
      state.employer = action.payload;
    },
    ONCHANGE_CANDIDATE_SINGLE: (
      state,
      action: PayloadAction<CandidateModel | null>
    ) => {
      state.candidate = action.payload;
    },
    ONCHANGE_CATEGORY_SINGLE: (
      state,
      action: PayloadAction<CategoryModel | null>
    ) => {
      state.category = action.payload;
    },
    ONCHANGE_EDUCATION_SINGLE: (
      state,
      action: PayloadAction<EducationlModel | null>
    ) => {
      state.education = action.payload;
    },
    ONCHANGE_HUMAN_RESOURCE_SINGLE: (
      state,
      action: PayloadAction<HumanResourceModel | null>
    ) => {
      state.humanResource = action.payload;
    },
    ONCHANGE_EXPERIENCE_SINGLE: (
      state,
      action: PayloadAction<ExperienceModel | null>
    ) => {
      state.experience = action.payload;
    },
    ONCHANGE_PROCEDURE_SINGLE: (
      state,
      action: PayloadAction<ProcedureModel | null>
    ) => {
      state.procedure = action.payload;
    },
    ONCHANGE_SKILL_SINGLE: (
      state,
      action: PayloadAction<SkillModel | null>
    ) => {
      state.skill = action.payload;
    },
    ONCHANGE_STEP_SINGLE: (state, action: PayloadAction<StepModel | null>) => {
      state.step = action.payload;
    },
    ONCHANGE_TAG_SINGLE: (state, action: PayloadAction<TagModel | null>) => {
      state.tag = action.payload;
    },
  },
});

export const {
  ONCHANGE_JOB_SINGLE,
  ONCHANGE_EMPLOYER_SINGLE,
  ONCHANGE_CANDIDATE_SINGLE,
  ONCHANGE_CATEGORY_SINGLE,
  ONCHANGE_EDUCATION_SINGLE,
  ONCHANGE_HUMAN_RESOURCE_SINGLE,
  ONCHANGE_EXPERIENCE_SINGLE,
  ONCHANGE_PROCEDURE_SINGLE,
  ONCHANGE_SKILL_SINGLE,
  ONCHANGE_STEP_SINGLE,
  ONCHANGE_TAG_SINGLE,
} = listDataReducer.actions;

export default listDataReducer.reducer;

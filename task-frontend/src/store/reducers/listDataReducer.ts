import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ListDataReducerState {
  candidates: CandidateModel[];
  categories: CategoryModel[];
  educations: EducationlModel[];
  employers: EmployerModel[];
  experiences: ExperienceModel[];
  humanResources: HumanResourceModel[];
  jobs: JobModel[];
  procedures: ProcedureModel[];
  skills: SkillModel[];
  steps: StepModel[];
  tags: TagModel[];
  applications: ApplicationModel[];
  messages: MessageModel[];
  vips: VipModel[];
  trasaction: TrasactionModel[];
}

const initialState: ListDataReducerState = {
  candidates: [],
  categories: [],
  educations: [],
  employers: [],
  experiences: [],
  humanResources: [],
  jobs: [],
  procedures: [],
  skills: [],
  steps: [],
  tags: [],
  applications: [],
  messages: [],
  vips: [],
  trasaction: [],
};
export const listDataReducer = createSlice({
  name: "listDataReducer",

  initialState,

  reducers: {
    ONCHANGE_JOB_LIST: (state, action: PayloadAction<JobModel[]>) => {
      state.jobs = action.payload;
    },
    ONCHANGE_EMPLOYER_LIST: (state, action: PayloadAction<EmployerModel[]>) => {
      state.employers = action.payload;
    },
    ONCHANGE_CANDIDATE_LIST: (
      state,
      action: PayloadAction<CandidateModel[]>
    ) => {
      state.candidates = action.payload;
    },
    ONCHANGE_CATEGORY_LIST: (state, action: PayloadAction<CategoryModel[]>) => {
      state.categories = action.payload;
    },
    ONCHANGE_EDUCATION_LIST: (
      state,
      action: PayloadAction<EducationlModel[]>
    ) => {
      state.educations = action.payload;
    },
    ONCHANGE_HUMAN_RESOURCE_LIST: (
      state,
      action: PayloadAction<HumanResourceModel[]>
    ) => {
      state.humanResources = action.payload;
    },
    ONCHANGE_EXPERIENCE_LIST: (
      state,
      action: PayloadAction<ExperienceModel[]>
    ) => {
      state.experiences = action.payload;
    },
    ONCHANGE_PROCEDURE_LIST: (
      state,
      action: PayloadAction<ProcedureModel[]>
    ) => {
      state.procedures = action.payload;
    },
    ONCHANGE_VIP_LIST: (state, action: PayloadAction<VipModel[]>) => {
      state.vips = action.payload;
    },
    ONCHANGE_SKILL_LIST: (state, action: PayloadAction<SkillModel[]>) => {
      state.skills = action.payload;
    },
    ONCHANGE_STEP_LIST: (state, action: PayloadAction<StepModel[]>) => {
      state.steps = action.payload;
    },
    ONCHANGE_TAG_LIST: (state, action: PayloadAction<TagModel[]>) => {
      state.tags = action.payload;
    },
    ONCHANGE_TRASACTION_LIST: (
      state,
      action: PayloadAction<TrasactionModel[]>
    ) => {
      state.trasaction = action.payload;
    },
    ONCHANGE_MESSAGE_LIST: (state, action: PayloadAction<MessageModel[]>) => {
      state.messages = action.payload;
    },
    ONCHANGE_APPLICATION_LIST: (
      state,
      action: PayloadAction<ApplicationModel[]>
    ) => {
      state.applications = action.payload;
    },
    ONCHANGE_SKILL_EXPERIENCE_EDUCATION_LIST: (
      state,
      action: PayloadAction<any>
    ) => {
      if (action.payload) {
        state.skills = action.payload.skills;
        state.experiences = action.payload.experiences;
        state.educations = action.payload.educations;
      } else {
        state.skills = [];
        state.experiences = [];
        state.educations = [];
      }
    },
  },
});

export const {
  ONCHANGE_JOB_LIST,
  ONCHANGE_EMPLOYER_LIST,
  ONCHANGE_CANDIDATE_LIST,
  ONCHANGE_CATEGORY_LIST,
  ONCHANGE_EDUCATION_LIST,
  ONCHANGE_HUMAN_RESOURCE_LIST,
  ONCHANGE_EXPERIENCE_LIST,
  ONCHANGE_PROCEDURE_LIST,
  ONCHANGE_SKILL_LIST,
  ONCHANGE_STEP_LIST,
  ONCHANGE_TAG_LIST,
  ONCHANGE_TRASACTION_LIST,
  ONCHANGE_SKILL_EXPERIENCE_EDUCATION_LIST,
  ONCHANGE_APPLICATION_LIST,
  ONCHANGE_MESSAGE_LIST,
  ONCHANGE_VIP_LIST,
} = listDataReducer.actions;

export default listDataReducer.reducer;

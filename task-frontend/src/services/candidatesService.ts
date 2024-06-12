import axiosConfig from "@/configs/axiosConfig";
import { CandidateAPI } from "@/Apis";

const candidatesService = {
  async profile() {
    return await axiosConfig.get(CandidateAPI.profile);
  },
  async extraProfile() {
    return await axiosConfig.get(CandidateAPI.extraProfile);
  },
  async getSkills() {
    return await axiosConfig.get(CandidateAPI.getSkills);
  },
  async getEducations() {
    return await axiosConfig.get(CandidateAPI.getEducations);
  },
  async getExperiences() {
    return await axiosConfig.get(CandidateAPI.getExperiences);
  },
  async saveSkills(items: SkillModel[]) {
    const body = { skills: items };
    return await axiosConfig.post(CandidateAPI.saveSkills, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async saveEducations(items: EducationlModel[]) {
    const body = { educations: items };
    return await axiosConfig.post(CandidateAPI.saveEducations, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async saveExperiences(items: ExperienceModel[]) {
    const body = { experiences: items };
    return await axiosConfig.post(CandidateAPI.saveExperiences, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getList(
    name?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      CandidateAPI.getList(name, status, currentPage, itemPerPage)
    );
  },
  async update(id: string, status: string) {
    const body = {
      status: status,
    };
    return await axiosConfig.patch(CandidateAPI.candidateById(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async delete(id: string) {
    return await axiosConfig.delete(CandidateAPI.candidateById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getbyId(id: string) {
    return await axiosConfig.get(CandidateAPI.candidateById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getDetail_Employer(id: string) {
    return await axiosConfig.get(CandidateAPI.getDetail_Employer(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getDetail_Candidate() {
    return await axiosConfig.get(CandidateAPI.getDetail_Candidate, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async changeImage(image: File | null) {
    const formData = new FormData();
    if (image) formData.append("avatar", image);
    return await axiosConfig.patch(CandidateAPI.changeImage, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async updateIsFindJob() {
    return await axiosConfig.patch(CandidateAPI.updateIsFindJob, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async clearCV() {
    return await axiosConfig.patch(CandidateAPI.clearCV, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async uploadCV(file: File | null) {
    const formData = new FormData();
    if (file) formData.append("cVFile", file);
    return await axiosConfig.patch(CandidateAPI.uploadCV, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async updateProfile(
    firstName?: string,
    lastName?: string,
    address?: string,
    phoneNumber?: string,
    dateOfBirth?: string,
    link?: string,
    job?: string,
    introduction?: string,
    sex?: string
  ) {
    const body = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      address: address?.trim(),
      phoneNumber: phoneNumber?.trim(),
      dateOfBirth: new Date(dateOfBirth!),
      link: link?.trim(),
      job: job?.trim(),
      introduction: introduction?.trim(),
      sex: sex,
    };
    return await axiosConfig.patch(CandidateAPI.updateProfile, body, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getFollower(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      CandidateAPI.getFollower(currentPage, itemPerPage)
    );
  },
  async getCandidatesFindJob(
    job?: string,
    location?: string,
    skill?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      CandidateAPI.getCandidatesFindJob(
        job,
        location,
        skill,
        currentPage,
        itemPerPage
      )
    );
  },

  async followCandidate_Employer(id: string) {
    return await axiosConfig.post(CandidateAPI.followCandidate_Employer(id));
  },
  async unfollowCandidate_employer(id: string) {
    return await axiosConfig.delete(
      CandidateAPI.unfollowCandidate_employer(id)
    );
  },
  async getSavedEmployer_Employer(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      CandidateAPI.getSavedCandidate_Employer(currentPage, itemPerPage)
    );
  },

  async followCandidate_HR(id: string) {
    return await axiosConfig.post(CandidateAPI.followCandidate_HR(id));
  },
  async unfollowCandidate_HR(id: string) {
    return await axiosConfig.delete(CandidateAPI.unfollowCandidate_HR(id));
  },
  async getSavedEmployer_HR(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      CandidateAPI.getSavedCandidate_HR(currentPage, itemPerPage)
    );
  },
};
export default candidatesService;

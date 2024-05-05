const convertCategoriesToOptions = (categories: CategoryModel[]) => {
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
};

const findOptionByCategoryId = (id: string, categories: CategoryModel[]) => {
  return (
    convertCategoriesToOptions(categories).find(
      (option) => option.value === id
    ) || null
  );
};

const convertProceduresToOptions = (procedures: ProcedureModel[]) => {
  return procedures.map((procedure) => ({
    value: procedure.id,
    label: procedure.name,
  }));
};

const findOptionByProcedureId = (id: string, procedures: ProcedureModel[]) => {
  return (
    convertProceduresToOptions(procedures).find(
      (option) => option.value === id
    ) || null
  );
};

const convertTagsToOptions = (tags: TagModel[]) => {
  return tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
    color: tag.color,
  }));
};

const convertHrsToOptions = (hrs: HumanResourceModel[]) => {
  return hrs.map((procedure) => ({
    value: procedure.id,
    label: `${procedure.firstName} ${procedure.lastName}`,
  }));
};

const findOptionByHrId = (id: string, hrs: HumanResourceModel[]) => {
  return convertHrsToOptions(hrs).find((option) => option.value === id) || null;
};
const findOptionByTagId = (id: string, tags: TagModel[]) => {
  return (
    convertTagsToOptions(tags).find((option) => option.value === id) || null
  );
};



export const SelectHelper = {
  convertCategoriesToOptions,
  findOptionByCategoryId,
  convertProceduresToOptions,
  findOptionByProcedureId,
  convertTagsToOptions,
  convertHrsToOptions,
  findOptionByHrId,
  findOptionByTagId,
};

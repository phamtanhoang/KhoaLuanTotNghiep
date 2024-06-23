interface ScheduleModel {
  id?: string;
  created?: string;
  updated?: string;
  name?: string;
  description?: string;
  color?: string;
  startDate?: string;
  endDate?: string;
  result?: string;
  application?: ApplicationModel;
}

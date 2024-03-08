import { GreatJobs, ListJob, SearchJob } from "./components";

import "react-tooltip/dist/react-tooltip.css";

const JobsPage: React.FC = () => {
  return (
    <>
      <SearchJob />
      <ListJob />
      <GreatJobs />
    </>
  );
};

export default JobsPage;

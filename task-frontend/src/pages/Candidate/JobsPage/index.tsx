import { GreatJobs, ListJob, Search } from "./components";

import "react-tooltip/dist/react-tooltip.css";

const JobsPage: React.FC = () => {
  return (
    <>
      <Search />
      <ListJob />
      <GreatJobs />
    </>
  );
};

export default JobsPage;

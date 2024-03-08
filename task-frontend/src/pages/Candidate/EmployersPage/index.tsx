import "react-tooltip/dist/react-tooltip.css";
import { GreatEmployers, SearchEmployer, ListEmployer } from "./components";

const EmployersPage: React.FC = () => {
  return (
    <>
      <SearchEmployer />
      <ListEmployer />
      <GreatEmployers />
    </>
  );
};

export default EmployersPage;

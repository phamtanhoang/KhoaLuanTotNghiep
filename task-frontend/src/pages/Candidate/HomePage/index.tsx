import {
  Hero,
  PopularJobs,
  PopularCategories,
  PopularEmployers,
  RecentJobs,
  QuestionsAndAnswer,
} from "./components";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PopularEmployers />
      <RecentJobs />
      <PopularJobs />
      <PopularCategories />
      <QuestionsAndAnswer />
    </>
  );
};

export default HomePage;

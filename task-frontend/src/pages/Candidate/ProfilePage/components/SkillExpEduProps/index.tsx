interface SkillExpEduPropsProps {
  name?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
}

const SkillExpEduProps: React.FC<SkillExpEduPropsProps> = ({
  name,
  fromDate,
  toDate,
  description,
}) => {
  return (
    <>
      <div className="flex justify-between gap-3">
        <p className="font-medium">{name}</p>
        {fromDate && toDate && (
          <p className="text-gray-500 text-xs my-auto">
            {fromDate} - {toDate}
          </p>
        )}
      </div>
      <p className="text-gray-500 text-xs mt-1">&nbsp;&nbsp;{description}</p>
    </>
  );
};
export default SkillExpEduProps;

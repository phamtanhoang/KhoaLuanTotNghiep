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
      <div className="lg:flex justify-between gap-3">
        <p className="font-medium">{name}</p>
        {fromDate && toDate && (
          <p className="text-gray-500 text-xs my-auto max-lg:mt-1 max-lg:text-end">
            {fromDate} - {toDate}
          </p>
        )}
      </div>
      <p
        className="text-gray-500 text-xs mt-2 lg:mt-1"
        dangerouslySetInnerHTML={{
          __html: description || "",
        }}
      />
    </>
  );
};
export default SkillExpEduProps;

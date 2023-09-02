const ProgressBar = ({ progress }) => {
  const roundedProgress = Math.round(progress);

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            Progress
          </span>
        </div>
        <div className="flex text-right">
          <span className="text-xs font-semibold inline-block text-teal-600 ml-2">
            {roundedProgress}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
        <div
          style={{ width: `${roundedProgress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

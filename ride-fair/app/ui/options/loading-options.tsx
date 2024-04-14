const LoadingOptions = () => {
  const renderedList = new Array(4).fill(0).map((item, i) => (
    <li className="flex h-9 gap-3 items-center" key={i}>
      <div className="w-9 h-9 rounded-full bg-neutrals-800"></div>
      <div className="bg-neutrals-800 basis-[55%] h-5/6 rounded-lg"></div>
      <div className="bg-neutrals-800 basis-1/5 h-5/6 rounded-lg ml-auto"></div>
    </li>
  ));

  return (
    <>
      <h1 className="text-xl mb-4 ml-6 font-semibold text-neutrals-50">
        Finding your ride options
      </h1>

      <ul className="flex flex-col border-t border-neutrals-800 mb-4 px-6 pt-4 gap-8">
        {renderedList}
      </ul>
    </>
  );
};

export default LoadingOptions;

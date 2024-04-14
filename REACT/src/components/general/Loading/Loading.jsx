const Loading = () => {
  const renderedList = new Array(4).fill(0).map((item, i) => (
    <li className="flex-1 flex gap-3" key={i}>
      <div className="w-9 h-9 rounded-full bg-blue-800"></div>
      <div className="bg-blue-800 w-1/2 rounded-md"></div>
      <div className="bg-blue-800 w-1/5 rounded-md ml-auto"></div>
    </li>
  ));

  return (
    <>
      <h1 className="self-center text-xl mb-8 font-bold">
        Finding you options
      </h1>

      <ul className="flex flex-col mb-auto gap-8">{renderedList}</ul>
    </>
  );
};

export default Loading;

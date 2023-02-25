const AutoLoginLoading = () => {
  return (
    <div className="w-full min-h-screen absolute inset-0 top-[80px] bg-white dark:bg-black dark:text-white text-black bg-opacity-10 backdrop-blur-lg grid place-items-center">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="font-medium text-center">
          Checking for Autologin, <br /> Wait a moment....
        </h1>
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default AutoLoginLoading;

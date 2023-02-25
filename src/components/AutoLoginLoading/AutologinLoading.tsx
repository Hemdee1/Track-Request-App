const AutoLoginLoading = () => {
  return (
    <div className="w-full min-h-[90vh] pt-[80px] grid place-items-center px-6">
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

const HeaderComponent = () => {
  return (
    <>
      <div className="fixed top-0 z-9999 left-0 w-full h-[10px] bg-white" />
      <header className="bg-primary fixed z-9999 top-0 left-0 w-full flex items-center justify-between px-6 py-4 shadow-md z-5 mt-[8px]">
        <div className="triangle-up" />
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-white text-xl font-bold text-center">
            F1 Race Results
          </h1>
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;

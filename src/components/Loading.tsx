export const Loading = () => {
  return (
    <div className="fixed top-0 bg-black/50 w-screen h-screen flex justify-center items-center left-0 z-[5]">
      <div className="flex gap-[10px]">
        <div className="h-5 w-5 bg-brand-1 rounded-full animate-bounce"></div>
        <div className="animation-delay-1 h-5 w-5 bg-brand-1 rounded-full animate-bounce"></div>
        <div className="animation-delay-2 h-5 w-5 bg-brand-1 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

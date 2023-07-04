export const Banner = () => {
  return (
    <div className="mt-[10vh] h-[90vh] text-white-fixed banner-background w-screen sm:w-full sm:mt-[10vh] sm:h-[33.5rem]">
      <div
        className={`h-full w-full flex flex-col items-center banner-gradient justify-around sm:justify-center sm:pt-0 sm:gap-0`}>
        <h1 className="font-lexend text-shadow text-heading-3-500 sm:text-heading-1-700">
          Motors Shop
        </h1>
        <h2 className="font-lexend text-shadow text-heading-5-500 text-center sm:text-heading-2-600">
          A melhor plataforma de anúncios de carros do país
        </h2>
      </div>
    </div>
  );
};

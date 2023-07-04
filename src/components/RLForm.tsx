import { ReactNode, FormEventHandler } from "react";

interface RLFormComponent {
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const RLForm = ({ onSubmit, children }: RLFormComponent) => {
  return (
    <main className="bg-grey-7 mt-14 w-full min-h-screen py-[46px] flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="bg-white-fixed sm:w-[412px] h-fit w-[93%] sm:py-11 py-7 sm:px-12 px-7 rounded">
        {children}
      </form>
    </main>
  );
};

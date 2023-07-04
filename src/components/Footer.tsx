import logo from "../assets/images/Logo.png";
import { Button } from "./Button";
import { RiArrowUpSLine } from "react-icons/ri";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full h-[20vh] sm:h-[15vh] bg-grey-0 sm:py-11 flex-column-center sm:flex-row-center space-y-[1rem]">
      <div className="flex flex-col h-full sm:flex-row sm:justify-between justify-evenly items-center container">
        <img src={logo} alt="logo" className="w-36 h-7" />
        <small className="text-white-fixed">© 2023 - Todos os direitos reservados.</small>
        <Button
          btnSize="w-10 sm:w-14 h-8 sm:h-12"
          btnColor="bg-grey-1"
          attributes="p-2 sm:p-4 rounded border-none"
          handleClick={scrollToTop}
        >
          <RiArrowUpSLine className="fill-white-fixed w-full h-full" />
        </Button>
      </div>
    </footer>
  );
};

import logo from "../assets/images/logo.svg";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { UserInitials } from "./UserInitials";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";
import { FilterAuth } from "../hooks/filterHook";

interface menuProps {
  blockClosing?: boolean;
}

export const Header = ({ blockClosing }: menuProps) => {
  const [openMenu, setOpenMenu] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMenu = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("mousedown", handleMenu);

    return () => {
      window.removeEventListener("mousedown", handleMenu);
    };
  }, [openMenu]);

  const {
    logged,
    logout,
    user,
    isMobile,
    setReload,
    reload,
    toggleEditProfileModal,
    toggleEditAddressModal,
  } = useAuth();

  const { handleClick } = FilterAuth();

  const navigate = useNavigate();

  return (
    <header className="h-[10vh] w-screen px-4 bg-grey-9 border border-b-2 border-grey-6 flex items-center justify-center fixed z-[3] sm:h-[10vh] sm:px-15 ">
      <div className="container h-full flex items-center justify-between">
        <Link to={"/?brand=&model=&color=&year=&fuel=&mileage="}>
          <img src={logo} alt="logotipo" onClick={() => handleClick()} />
        </Link>
        <nav className="h-full flex items-center gap-11 pl-11 sm:relative sm:border-grey-6 sm:border-l-2">
          {isMobile ? (
            <>
              <button
                className="flex items-center justify-center bg-white-fixed rounded-lg h-11 w-11 border-none"
                onClick={() => setOpenMenu(!openMenu)}
                aria-label={!openMenu ? "Abrir Menu" : "Fechar Menu"}>
                {!openMenu ? <FaBars size={20} /> : <IoClose size={25} />}
              </button>
              {openMenu && (
                <>
                  {!logged && (
                    <div className="flex flex-col gap-11 w-screen h-[184px] p-4 bg-white-fixed absolute left-0 top-16 shadow-menu-profile">
                      <Link
                        to={"/login"}
                        className="text-body-1-600 text-grey-2 cursor-pointer pt-4">
                        Fazer Login
                      </Link>
                      <Button
                        handleClick={() => navigate("/register")}
                        btnSize="btn-big"
                        btnColor="btn-Outline-2">
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {logged ? (
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => setOpenMenu(!openMenu)}>
                  <UserInitials name={user.name} color={user.color} />
                  <h4 className="text-grey-2">{user.name}</h4>
                </div>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="text-body-1-600 text-grey-2 cursor-pointer">
                    Fazer Login
                  </Link>
                  <Button
                    handleClick={() => navigate("/register")}
                    btnColor="btn-outline-2"
                    btnSize="btn-big">
                    Cadastrar
                  </Button>
                </>
              )}
            </>
          )}
          {openMenu && logged && (
            <div
              ref={blockClosing ? null : ref}
              className="p-5 gap-4 flex bg-grey-9 rounded flex-col shadow-menu-profile absolute top-16 animate-menu -left-[1px] sm:left-6 w-screen sm:w-50">
              <ul className="gap-4 flex flex-col">
                <li
                  onClick={() => toggleEditProfileModal()}
                  className="text-grey-2 cursor-pointer">
                  Editar Perfil
                </li>
                <li
                  onClick={() => toggleEditAddressModal()}
                  className="text-grey-2 cursor-pointer">
                  Editar Endereço
                </li>
                {user.seller && (
                  <Link to={`/profile/${user.id}`}>
                    <li
                      onClick={() => setReload(!reload)}
                      className="text-grey-2 cursor-pointer">
                      Meus Anúncios
                    </li>
                  </Link>
                )}
                <li onClick={logout} className="text-grey-2 cursor-pointer">
                  Sair
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Cards } from "../components/Cards";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { UserInitials } from "../components/UserInitials";
import { Modal } from "../components/Modal";
import { NewAdvert } from "../components/Modals/NewAdvert";
import { useAuth } from "../hooks/userAuth";
import { useParams } from "react-router-dom";
import { EditProfile } from "../components/Modals/EditProfile";
import { EditAddress } from "../components/Modals/EditAddress";
import { iUser } from "../contexts/UserContext";
import { EditAndDeleteAdvert } from "../components/Modals/EditAndDeleteAdvert";

export const Profile = () => {
  const {
    user,
    advertIsOpen,
    setAdvertIsOpen,
    setLogged,
    getParamInfo,
    currentUser,
    isCreateAdvertSuccessModalOpen,
    toggleCreateAdvertSuccessModal,
    reload,
    isEditProfileModalOpen,
    toggleEditProfileModal,
    isEditAddressModalOpen,
    toggleEditAddressModal,
    setEditAdvertIsOpen,
    editAdvertIsOpen,
    isDeleteAdvertConfirmModalOpen,
    toggleDeleteConfirmAdvertModal,
    deleteAdverts,
    deleteUser,
    isDeleteProfileConfirmModalOpen,
    toggleDeleteConfirmProfileModal,
    pageProfile,
    nextProfilePage,
    prevProfilePage,
    checkNextProfilePage,
    checkPrevProfilePage,
    getAdvertsUserInfo,
    currentUserAdvertsActually,
  } = useAuth();

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userString = localStorage.getItem("@USER");
    const userLocal: iUser = userString ? JSON.parse(userString) : null;
    getParamInfo(id!);

    setLogged(true);

    if (!token) {
      setLogged(false);
    }
    if (userLocal !== null) {
      if (userLocal.id === Number(id)) {
        setIsOwner(true);
      }
    }
  }, [reload, pageProfile]);

  useEffect(() => {
    getAdvertsUserInfo(id!);
  }, [pageProfile, reload]);

  return (
    <>
      {advertIsOpen && (
        <Modal
          title="Criar Anuncio"
          toggleModal={() => setAdvertIsOpen(!advertIsOpen)}
          attributes="animate-modal max-h-screen max-w-[520px] no-scrollbar overflow-y-auto w-auto y-[55vh] "
          widthFull
        >
          <NewAdvert />
        </Modal>
      )}
      {editAdvertIsOpen && (
        <Modal
          title="Editar anúncio"
          toggleModal={() => setEditAdvertIsOpen(!editAdvertIsOpen)}
          attributes="animate-modal max-h-screen max-w-[520px] no-scrollbar overflow-y-auto w-auto y-[55vh] "
          widthFull
        >
          <EditAndDeleteAdvert />
        </Modal>
      )}
      {isCreateAdvertSuccessModalOpen && (
        <Modal title="Sucesso!" toggleModal={toggleCreateAdvertSuccessModal}>
          <div className="flex flex-col gap-5">
            <h2 className="heading-7-500 text-grey-1">
              Seu anúncio foi criado com sucesso
            </h2>
            <p className="body-1-400 text-grey-2">
              Agora você poderá ver seus negócios crescendo em grande escala!
            </p>
          </div>
        </Modal>
      )}
      {isDeleteAdvertConfirmModalOpen && (
        <Modal
          title="Excluir anúncio"
          toggleModal={toggleDeleteConfirmAdvertModal}
        >
          <form className="flex flex-col gap-5">
            <h2 className="heading-7-500 text-grey-1">
              Tem certeza que deseja remover este anúncio?
            </h2>
            <p className="body-1-400 text-grey-2">
              Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e removerá seus dados de nossos servidores.
            </p>
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                btnSize="btn-big"
                btnColor="btn-negative"
                handleClick={toggleDeleteConfirmAdvertModal}
                attributes="px-[5%] max-sm:w-[48%]"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                btnSize="btn-big"
                btnColor={"btn-alert"}
                handleClick={() => {
                  deleteAdverts();
                }}
                attributes="px-[5%] max-sm:w-[48%] ml-4"
              >
                Sim, excluir anúncio
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {isDeleteProfileConfirmModalOpen && (
        <Modal
          title="Excluir perfil"
          toggleModal={toggleDeleteConfirmProfileModal}
        >
          <form className="flex flex-col gap-5">
            <h2 className="heading-7-500 text-grey-1">
              Tem certeza que deseja remover este perfil?
            </h2>
            <p className="body-1-400 text-grey-2">
              Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
              conta e removerá seus dados de nossos servidores.
            </p>
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                btnSize="btn-big"
                btnColor="btn-negative"
                handleClick={toggleDeleteConfirmProfileModal}
                attributes="px-[5%] max-sm:w-[48%]"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                btnSize="btn-big"
                btnColor={"btn-alert"}
                handleClick={() => {
                  deleteUser(user.id);
                }}
                attributes="px-[5%] max-sm:w-[48%] ml-4"
              >
                Sim, excluir perfil
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {isEditProfileModalOpen && (
        <Modal
          title="Editar Perfil"
          toggleModal={() => toggleEditProfileModal()}
          attributes="max-h-screen max-w-[520px] no-scrollbar overflow-y-auto w-auto"
          widthFull
        >
          <EditProfile />
        </Modal>
      )}
      {isEditAddressModalOpen && (
        <Modal
          title="Editar Endereço"
          toggleModal={() => toggleEditAddressModal()}
          attributes="max-h-screen max-w-[520px] no-scrollbar overflow-y-auto w-auto"
          widthFull
        >
          <EditAddress />
        </Modal>
      )}
      <Header />
      <div className="bg-brand-1 w-full h-[357px] absolute top-0 z-[1]"></div>
      <main className="flex flex-col items-center gap-14 w-full min-h-[90vh] bg-grey-8 ">
        <section className="flex h-fit flex-col container w-[93%] gap-6 z-[2] relative bg-white-fixed mt-40 px-7 py-10 sm:p-11 rounded sm:w-[1240px] ">
          <UserInitials
            name={isOwner ? user.name : currentUser.name}
            color={isOwner ? user.color : currentUser.color}
            bigSize
          />
          <div className="flex items-center gap-2">
            <h2 className="text-heading-6-600">
              {isOwner ? user.name : currentUser.name}
            </h2>
            <span className="flex items-center justify-center bg-brand-4 rounded text-brand-1 text-body-2-500 w-23 h-8">
              Anunciante
            </span>
          </div>
          <p className="text-body-1-400 text-grey-2 mb-4">
            {isOwner ? user.description : currentUser.description}
          </p>
          {isOwner && (
            <Button
              btnSize="btn-big"
              btnColor="btn-outline-brand-1"
              handleClick={() => setAdvertIsOpen(!advertIsOpen)}
            >
              Criar anuncio
            </Button>
          )}
        </section>
        <section className="flex flex-col justify-start max-w-[1392px] mt-4 w-screen sm:items-start">
          {!user.seller && (
            <h3 className="text-heading-5-600 mb-16 ml-5 sm:ml-0 sm:-translate-x-16 ">
              Anúncios
            </h3>
          )}
          <ul className="sm:grid sm:grid-cols-4 flex gap-4 overflow-auto px-6 sm:px-0 sm:gap-12">
            {currentUserAdvertsActually.length ? (
              currentUserAdvertsActually.map((car) => (
                <Cards key={car.id} car={car} isOwner={isOwner} />
              ))
            ) : (
              <li className="bg-grey-7 text-grey-2 font-semibold p-2 w-[385px] sm:w-[1400px] h-20 sm:h-[200px] sm:text-heading-4-600 mb-9 rounded flex justify-center items-center">
                Sem anúncios ativos
              </li>
            )}
          </ul>
        </section>
        <div className="flex mb-16 items-center gap-8">
          {prevProfilePage && (
            <button
              onClick={() => checkPrevProfilePage()}
              className="flex items-center justify-center font-lexend text-brand-2 sm:text-heading-5-600 border-none bg-transparent"
            >
              Anterior
            </button>
          )}
          <span className="flex h-full gap-2 font-lexend text-grey-3 sm:text-heading-5-600">
            {pageProfile}
          </span>
          {nextProfilePage && (
            <button
              onClick={() => checkNextProfilePage()}
              className="flex items-center justify-center font-lexend text-brand-2 sm:text-heading-5-600 border-none bg-transparent"
            >
              Seguinte
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

import { useEffect, useState } from "react";
import { AdvertInfo } from "../components/AdvertInfo";
import { CommentCard } from "../components/Comments";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { NewComment } from "../components/NewComment";
import { UserCard } from "../components/UserCard";
import { CardObj, UserObj, CarImgObj } from "../components/Cards";
import { CommentsAuth } from "../hooks/commentsHook";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { EditAndDeleteComment } from "../components/Modals/EditAndDeleteComment";
import { useAuth } from "../hooks/userAuth";
import { EditAddress } from "../components/Modals/EditAddress";
import { EditProfile } from "../components/Modals/EditProfile";

export const Product = () => {
  const [carInfo, setCarInfo] = useState({} as CardObj);
  const [userInfo, setUserInfo] = useState({} as UserObj);
  const [carImgsInfo, setCarImgsInfo] = useState([] as CarImgObj[]);
  const {
    getComments,
    currentComments,
    setModalIsOpen,
    modalIsOpen,
    setUserCurrentComment,
  } = CommentsAuth();
  const {
    isDeleteProfileConfirmModalOpen,
    isEditProfileModalOpen,
    isEditAddressModalOpen,
    toggleEditProfileModal,
    toggleEditAddressModal,
    toggleDeleteConfirmProfileModal,
    user,
    deleteUser,
  } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const userString = localStorage.getItem("@carInfo");
    setCarInfo(userString ? JSON.parse(userString) : null);
    const userCurrent = localStorage.getItem("@USER");
    setUserInfo(userCurrent ? JSON.parse(userCurrent) : null);
    const carImgsCurrent = localStorage.getItem("@carImgs");
    setCarImgsInfo(carImgsCurrent ? JSON.parse(carImgsCurrent) : null);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getComments(id!);
  }, []);

  const userData = localStorage.getItem("@USER");
  const parseUserInfo = userData ? JSON.parse(userData) : null;

  const carImgsData = localStorage.getItem("@carImgs");
  const parsecarImgsInfo: CarImgObj[] = carImgsData
    ? JSON.parse(carImgsData)
    : null;

  const values = Object.values(parsecarImgsInfo);
  return (
    <>
      {isDeleteProfileConfirmModalOpen && (
        <Modal
          title="Excluir perfil"
          toggleModal={toggleDeleteConfirmProfileModal}>
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
                attributes="px-[5%] max-sm:w-[48%]">
                Cancelar
              </Button>
              <Button
                type="button"
                btnSize="btn-big"
                btnColor={"btn-alert"}
                handleClick={() => {
                  deleteUser(user.id);
                }}
                attributes="px-[5%] max-sm:w-[48%] ml-4">
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
          widthFull>
          <EditProfile />
        </Modal>
      )}
      {isEditAddressModalOpen && (
        <Modal
          title="Editar Endereço"
          toggleModal={() => toggleEditAddressModal()}
          attributes="max-h-screen max-w-[520px] no-scrollbar overflow-y-auto w-auto"
          widthFull>
          <EditAddress />
        </Modal>
      )}
      {modalIsOpen && (
        <Modal
          title="Editar Comentário"
          toggleModal={() => setModalIsOpen(false)}
          attributes="w-[95%] h-max sm:w-[50%]"
          widthFull>
          <EditAndDeleteComment />
        </Modal>
      )}
      <Header />
      <div className="bg-brand-1 w-full h-[70vh] absolute top-0 -z[-1]"></div>
      <main className="bg-grey-8 flex justify-center w-full p-3">
        <div className="flex flex-col justify-center container sm:px-32">
          <div className=" flex mt-[7rem] justify-between max-sm:flex-col max-sm:w-[100%] z-0">
            <section className="flex flex-col w-[59%] max-sm:w-[100%]">
              <div className="flex justify-center items-center rounded bg-grey-10 py-7 px-7 xm:p-11  mb-4 max-sm:w-[100%] min-h-[300px]">
                <img
                  src={carInfo.cover_image}
                  alt="Imagem carro"
                  className="w-[450px] img-transition"
                />
              </div>
              <AdvertInfo />
              <div className="rounded bg-grey-10  py-7 px-7 sm:p-11 mt-5 mb-4 max-sm:w-[100%] min-h-[206px]">
                <h3 className="mb-6 text-heading-6-600">Descrição</h3>
                <p className="text-body-1-400 leading-7 text-grey-2">
                  {carInfo.description}
                </p>
              </div>
            </section>
            <section className="w-[38%] max-sm:w-[100%]">
              <div className="w-full rounded bg-grey-10 py-[5%] px-[8%] max-sm:w-[100%]">
                <h3 className="text-heading-6-600">Fotos</h3>
                <ul className="grid grid-cols-3 gap-4 gap-x-[5.5px] w-full my-8 sm:gap-x-0 sm:w-full">
                  {values.find((elt) => elt !== null) ? (
                    values.map((elem, index) => {
                      if (elem !== null) {
                        return (
                          <li
                            key={index}
                            className="w-[85px]  h-[85px] sm:w-[103px] sm:h-[103px] bg-grey-7 rounded flex justify-center items-center">
                            <img
                              src={String(elem)}
                              alt="Foto carro"
                              className="object-contain img-transition-1"
                            />
                          </li>
                        );
                      }
                    })
                  ) : (
                    <li className="relative left-[100%] text-center text-grey-2 font-semibold">
                      Galeria vazia :(
                    </li>
                  )}
                </ul>
              </div>
              <UserCard />
            </section>
          </div>
          <div className="h-fit min-h-20 rounded bg-grey-10 py-7 px-7 sm:p-11 w-[59%]  max-sm:w-[100%]">
            <h3 className="mb-6 text-heading-6-600">Comentários</h3>

            <ul className="w-full h-[90%] flex flex-col gap-11 no-scrollbar overflow-y-auto">
              {currentComments.length ? (
                currentComments.map((elem) => (
                  <CommentCard
                    key={elem.id}
                    userName={elem.user.name}
                    countMark={elem.createdAt}
                    comment={elem.content}
                    color={elem.user.color}>
                    {elem.user.name === parseUserInfo?.name ? (
                      <Button
                        key={elem.id}
                        btnColor="bg-transparent"
                        btnSize="w-max h-max"
                        attributes="text-grey-1 text-button-small border-none underline"
                        handleClick={() => {
                          setModalIsOpen(true), setUserCurrentComment(elem);
                        }}>
                        Editar
                      </Button>
                    ) : null}
                  </CommentCard>
                ))
              ) : (
                <li className="text-center text-grey-2 font-semibold p-2 w-full flex justify-center items-center sm:w-full h-20 sm:h-[200px] sm:text-heading-4-600 mb-9 rounded">
                  Seja o primeiro a deixar um comentário
                </li>
              )}
            </ul>
          </div>
          <NewComment
            name={
              userInfo
                ? userInfo.name
                : "Ops! Para fazer comentários você precisa estar logado! :("
            }
            color={userInfo ? userInfo.color : "#4a9d9d"}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

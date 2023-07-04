import axios from "axios";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/userAuth";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RLForm } from "../components/RLForm";
import { TextArea } from "../components/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../schemas/registerSchema";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Register = () => {
  const [cepLoading, setCepLoading] = useState(false);

  const {
    setLogged,
    createUser,
    setUserStatus,
    userStatus,
    isRegisterModalOpen,
    toggleRegisterModal,
  } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  const ViaCepBase = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 15000,
  });

  const getCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      setCepLoading(true);
      if (!e.target.value) {
        return;
      }
      const cep = e.target.value.replace(/\D/g, "");
      const res = await ViaCepBase.get(`/${cep}/json`);
      if (res.data.erro === true) {
        toast.error("CEP inválido");
      } else {
        setValue("city", res.data.localidade);
        setValue("street", res.data.logradouro);
        setValue("state", res.data.uf);
        setValue("complement", res.data.complemento);
      }
    } catch (error) {
      setCepLoading(false);
      console.error(error);
    } finally {
      setCepLoading(false);
    }
  };

  useEffect(() => {
    setLogged(false);
  }, [setLogged]);

  const navigate = useNavigate();

  const toggleAndNavigate = () => {
    toggleRegisterModal();
    navigate("/login");
  };

  return (
    <>
      <Header />
      {isRegisterModalOpen && (
        <Modal title="Sucesso!" toggleModal={toggleRegisterModal}>
          <div className="flex flex-col gap-5">
            <h2 className="heading-7-500 text-grey-1">
              Sua conta foi criada com sucesso
            </h2>
            <p className="body-1-400 text-grey-2">
              Agora você poderá ver seu negócios crescendo em grande escala
            </p>
            <Button
              handleClick={() => toggleAndNavigate()}
              type="button"
              btnSize="btn-medium sm:btn-big"
              btnColor="btn-brand-1">
              Ir para o login
            </Button>
          </div>
        </Modal>
      )}
      <RLForm onSubmit={handleSubmit(createUser)}>
        <h1 className="text-heading-5-500 mb-8">Cadastro</h1>
        <p className="body-2-500 mb-6">Informações pessoais</p>
        <Input
          label="Nome"
          placeholder="Ex: Nome Sobrenome"
          type="text"
          register={register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          placeholder="Ex: email@exemplo.com"
          type="email"
          register={register("email")}
          error={errors.email?.message}
        />
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          type="text"
          register={register("cpf")}
          error={errors.cpf?.message}
        />
        <Input
          label="Celular"
          placeholder="(DDD) 90000-0000"
          type="tel"
          register={register("phone")}
          error={errors.phone?.message}
        />
        <div>
          <p className="body-2-500 mb-6">Data de nascimento</p>
          <div className="flex w-full gap-3">
            <Input
              label="Dia"
              placeholder="00"
              type="text"
              register={register("day")}
              error={errors.day?.message}
            />
            <Input
              label="Mês"
              placeholder="00"
              type="text"
              register={register("month")}
              error={errors.month?.message}
            />
            <Input
              label="Ano"
              placeholder="0000"
              type="text"
              register={register("year")}
              error={errors.year?.message}
            />
          </div>
        </div>
        <TextArea
          label="Descrição"
          cols={2}
          rows={2}
          placeholder="Digitar descrição"
          register={register("description")}
          error={errors.description?.message}></TextArea>
        <p className="body-2-500 mb-6">Informações de endereço</p>
        <div className="flex relative">
          <Input
            label="CEP"
            placeholder="00000-000"
            type="text"
            register={register("zipCode")}
            error={errors.zipCode?.message}
            onBlur={getCep}
          />
          {cepLoading && (
            <div className="absolute right-4 top-11 h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-brand-1 motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          )}
        </div>

        <div className="flex w-full gap-3">
          <Input
            label="Estado"
            placeholder="Digitar Estado"
            type="text"
            register={register("state")}
            error={errors.state?.message}
          />
          <Input
            label="Cidade"
            placeholder="Digitar cidade"
            type="text"
            register={register("city")}
            error={errors.city?.message}
          />
        </div>
        <Input
          label="Rua"
          placeholder="Digitar Rua"
          type="text"
          register={register("street")}
          error={errors.street?.message}
        />
        <div className="flex w-full gap-3">
          <Input
            label="Número"
            placeholder="Digitar número"
            type="text"
            register={register("number")}
            error={errors.number?.message}
          />
          <Input
            label="Complemento"
            placeholder="Ex: apart 307"
            type="text"
            register={register("complement")}
            error={errors.complement?.message}
          />
        </div>
        <p className="body-2-500 mb-7">Tipo de conta</p>
        <div className="flex w-full gap-3 mb-7">
          {userStatus ? (
            <>
              <Button
                handleClick={() => setUserStatus(false)}
                type="button"
                btnColor="btn-outline-2"
                btnSize="btn-medium sm:btn-big"
                attributes="w-[50%] focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1">
                Comprador
              </Button>
              <Button
                handleClick={() => setUserStatus(true)}
                type="button"
                btnColor="btn-brand-1"
                btnSize="btn-medium sm:btn-big focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1"
                attributes="w-[50%]">
                Anunciante
              </Button>
            </>
          ) : (
            <>
              <Button
                handleClick={() => setUserStatus(false)}
                type="button"
                btnColor="btn-brand-1"
                btnSize="btn-medium sm:btn-big"
                attributes="w-[50%] focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1">
                Comprador
              </Button>
              <Button
                handleClick={() => setUserStatus(true)}
                type="button"
                btnColor="btn-outline-2"
                btnSize="btn-medium sm:btn-big focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1"
                attributes="w-[50%]">
                Anunciante
              </Button>
            </>
          )}
        </div>
        <Input
          label="Senha"
          placeholder="Digitar Senha"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirmar Senha"
          placeholder="Digitar Senha"
          type="password"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          hideIcon
        />
        <Button
          type="submit"
          btnColor="btn-brand-1"
          btnSize="btn-big"
          attributes="w-full">
          Finalizar cadastro
        </Button>
      </RLForm>
      <Footer />
    </>
  );
};

import axios from "axios";
import { Button } from "../Button";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/userAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditAddressData, editAddressSchema } from "../../schemas/editAddressSchema";
import { toast } from "react-toastify";
import { useState } from "react";

export const EditAddress = () => {
  const { toggleEditAddressModal, user, updateAddress } = useAuth();
  const [cepLoading, setCepLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAddressData>({
    mode: "all",
    resolver: zodResolver(editAddressSchema),
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
      setValue("city", res.data.localidade);
      setValue("street", res.data.logradouro);
      setValue("state", res.data.uf);
      setValue("complement", res.data.complemento);
    } catch (error) {
      setCepLoading(false);
      console.error(error);
    } finally {
      setCepLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        updateAddress(data, user.address.id);
      })}
    >
      <p className="body-2-500 mb-6">Informações de endereço</p>
      <div className="flex relative">
        <Input
          label="CEP"
          placeholder="00000-000"
          type="text"
          defaultValue={user.address.zipCode}
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
          defaultValue={user.address.state}
          register={register("state")}
          error={errors.state?.message}
        />
        <Input
          label="Cidade"
          placeholder="Digitar cidade"
          type="text"
          defaultValue={user.address.city}
          register={register("city")}
          error={errors.city?.message}
        />
      </div>
      <Input
        label="Rua"
        placeholder="Digitar Rua"
        type="text"
        defaultValue={user.address.street}
        register={register("street")}
        error={errors.street?.message}
      />
      <div className="flex w-full gap-3">
        <Input
          label="Número"
          placeholder="Digitar número"
          type="text"
          defaultValue={user.address.number === null ? "" : user.address.number + ""}
          register={register("number")}
          error={errors.number?.message}
        />
        <Input
          label="Complemento"
          placeholder="Ex: apart 307"
          type="text"
          defaultValue={user.address.complement + ""}
          register={register("complement")}
          error={errors.complement?.message}
        />
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <Button
          type="button"
          btnSize="btn-big"
          btnColor="btn-negative"
          handleClick={() => toggleEditAddressModal()}
          attributes="px-[5%] max-sm:w-[48%]"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          btnSize="btn-big"
          btnColor={"btn-brand-1"}
          attributes="px-[5%] max-sm:w-[48%]"
        >
          Salvar alterações
        </Button>
      </div>
    </form>
  );
};

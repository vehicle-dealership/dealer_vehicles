import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { Select } from "../Select";
import { useForm, useFieldArray } from "react-hook-form";
import { getBrands, getModelsByBrand } from "../../services/requests";
import { useAuth } from "../../hooks/userAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateAdvertData,
  updateAdvertSchema,
} from "../../schemas/editAdvertSchema";
import { CarImgObj } from "../Cards";

interface Model {
  id: string;
  brand: string;
  name: string;
  fuel: number;
  value: number;
  year: string;
}

export const EditAndDeleteAdvert = () => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const {
    setAdvertsStatus,
    advertsStatus,
    updateAdvertSubmit,
    toggleDeleteConfirmAdvertModal,
    setEditAdvertIsOpen,
    editAdvertIsOpen,
  } = useAuth();

  const carData = localStorage.getItem("@carInfo");
  const parseUserInfo = carData ? JSON.parse(carData) : null;

  const carImgsData = localStorage.getItem("@carImgs");
  const parsecarImgsInfo: CarImgObj[] = carImgsData
    ? JSON.parse(carImgsData)
    : null;

  const values = Object.values(parsecarImgsInfo);

  useEffect(() => {
    const loadCars = async () => {
      const cars = await getBrands();
      const carBrands = Object.keys(cars);
      setBrands(carBrands);
    };

    loadCars();
  }, []);

  useEffect(() => {
    setModels([]);
    setSelectedModel(null);
    setInputs([]);
  }, [selectedBrand]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateAdvertData>({
    resolver: zodResolver(updateAdvertSchema),
  });

  const { fields, append } = useFieldArray({
    name: "images",
    control,
  });

  const addInput = (): void => {
    values?.forEach((elem) => {
      if (elem !== null) {
        append({
          image_link_: String(elem),
        });
      }
    });
    if (inputs.length <= 5) {
      append({
        image_link_: "",
      });
      setInputs([...inputs, ""]);
    }

    //if (inputs.length <= 5) setInputs([...inputs, ""]);
  };

  const updateSelectedBrand = async (brand: string) => {
    setSelectedBrand(brand);
    const findModels = await getModelsByBrand(brand);
    setModels(findModels);
  };

  const updateSelectedModel = async (model: string) => {
    const findModel = models.find((car) => car.name == model);
    setSelectedModel(findModel || null);
    setValue("fipe_price", findModel?.value);
    setValue("year", findModel?.year);
    setValue(
      "fuel",
      findModel?.fuel === 1
        ? "flex"
        : findModel?.fuel === 2
        ? "híbrido"
        : "elétrico"
    );
  };

  return (
    <form onSubmit={handleSubmit(updateAdvertSubmit)} className="">
      <h3 className="text-body-2-500 mb-6">Informações do veículo</h3>
      <Select
        label="Marca"
        handleSelect={updateSelectedBrand}
        register={register("brand")}
        error={errors.brand?.message}
        defaultValues={parseUserInfo.brand}
      >
        {brands.map((brand, index) => {
          return (
            <option key={index} value={brand}>
              {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </option>
          );
        })}
      </Select>
      <Select
        label="Modelo"
        handleSelect={updateSelectedModel}
        disabled={!models.length}
        register={register("model")}
        error={errors.model?.message}
        defaultValues={"Escolha um modelo"}
      >
        {models &&
          models.map((model, index) => {
            return (
              <option key={index} value={model.name}>
                {model.name.charAt(0).toUpperCase() + model.name.slice(1)}
              </option>
            );
          })}
      </Select>
      <div className="flex gap-3.5">
        <Input
          label="Ano"
          type="text"
          value={selectedModel ? selectedModel.year : ""}
          disabled
          register={register("year")}
          error={errors.year?.message}
        />
        <Input
          label="Combustível"
          type="text"
          value={
            selectedModel
              ? selectedModel.fuel === 1
                ? "Flex"
                : selectedModel.fuel === 2
                ? "Híbrido"
                : "Elétrico"
              : ""
          }
          disabled
          register={register("fuel")}
          error={errors.fuel?.message}
        />
      </div>
      <div className="flex gap-3.5">
        <Input
          label="Quilometragem"
          placeholder="digite a quilometragem"
          type="text"
          register={register("mileage")}
          error={errors.mileage?.message}
          defaultValue={parseUserInfo.mileage}
        />
        <Input
          label="Cor"
          placeholder="digite a cor"
          type="text"
          register={register("color")}
          error={errors.color?.message}
        />
      </div>
      <div className="flex gap-3.5">
        <Input
          label="Preço tabela FIPE"
          type="text"
          value={
            selectedModel
              ? selectedModel.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : ""
          }
          disabled
          register={register("fipe_price")}
          error={errors.fipe_price?.message}
        />
        <Input
          label="Preço"
          placeholder="digite o preço"
          type="text"
          register={register("price")}
          error={errors.price?.message}
          defaultValue={parseUserInfo.price}
        />
      </div>
      <TextArea
        label="Descrição"
        placeholder="digite a descrição"
        cols={10}
        rows={3}
        register={register("description")}
        error={errors.description?.message}
        defaultValue={parseUserInfo.description}
      />
      <p className="body-2-500 mb-7">Publicado</p>
      <div className="flex w-full gap-3 mb-7">
        {advertsStatus ? (
          <>
            <Button
              handleClick={() => setAdvertsStatus(false)}
              type="button"
              btnColor="btn-outline-2"
              btnSize="btn-medium sm:btn-big"
              attributes="w-[50%] focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1"
            >
              Sim
            </Button>
            <Button
              handleClick={() => setAdvertsStatus(true)}
              type="button"
              btnColor="btn-brand-1"
              btnSize="btn-medium sm:btn-big focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1"
              attributes="w-[50%]"
            >
              Não
            </Button>
          </>
        ) : (
          <>
            <Button
              handleClick={() => setAdvertsStatus(false)}
              type="button"
              btnColor="btn-brand-1"
              btnSize="btn-medium sm:btn-big"
              attributes="w-[50%] focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1"
            >
              Sim
            </Button>
            <Button
              handleClick={() => setAdvertsStatus(true)}
              type="button"
              btnColor="btn-outline-2"
              btnSize="btn-medium sm:btn-big focus:btn-brand-1 hover:bg-brand-1 hover:border-brand-1"
              attributes="w-[50%]"
            >
              Não
            </Button>
          </>
        )}
      </div>
      <Input
        label="Imagem da capa"
        placeholder="digite o caminho para a imagem"
        type="text"
        register={register("cover_image")}
        error={errors.cover_image?.message}
        defaultValue={parseUserInfo.cover_image}
      />
      {fields.map((field, index) => (
        <Input
          key={field.id}
          label={`${index + 1}ª Imagem da galeria`}
          placeholder="digite o caminho para a imagem"
          register={register(`images.${index}.image_link_`)}
          type="text"
        />
      ))}
      {inputs.length <= 5 && (
        <Button
          btnSize="btn-medium"
          btnColor="btn-brand-opacity"
          handleClick={addInput}
          type="button"
        >
          Adicionar campo para imagem da galeria
        </Button>
      )}
      <div className="flex justify-between gap-3 mt-10">
        <Button
          type="button"
          btnSize="btn-big"
          btnColor="btn-negative"
          handleClick={() => {
            toggleDeleteConfirmAdvertModal(),
              setEditAdvertIsOpen(!editAdvertIsOpen);
          }}
          attributes="w-[52%]"
        >
          Excluir anúncio
        </Button>

        <Button
          btnSize="btn-big"
          type="submit"
          btnColor={"btn-brand-1"}
          attributes="w-[48%]"
        >
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
};

import { useEffect } from "react";
import { Button } from "./Button";
import { useAuth } from "../hooks/userAuth";
import { FilterAuth } from "../hooks/filterHook";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { iError } from "../contexts/UserContext";
import { api } from "../services/api";

export interface FilterProps {
  textButton: string;
}

export const FilterHome = ({ textButton }: FilterProps) => {
  const {
    brand,
    color,
    fuel,
    km,
    model,
    setBrand,
    setColor,
    setFuel,
    setKm,
    setModel,
    setYear,
    year,
    handleClick,
    setPrice,
    price,
  } = FilterAuth();

  const { fullAdverts, setFullAdverts, setGlobalLoading } = useAuth();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getAdverts = async () => {
      try {
        setGlobalLoading(true);
        const { data } = await api.get("/adverts", {
          params: {
            perPage: 1000,
          },
        });
        setFullAdverts(data.data);
        return data.data;
      } catch (error) {
        setGlobalLoading(false);
        const currentError = error as AxiosError<iError>;
        console.error(currentError.message);
      } finally {
        setGlobalLoading(false);
      }
    };
    getAdverts();
  }, []);

  useEffect(() => {
    setSearchParams({
      brand: brand || "",
      model: model || "",
      color: color || "",
      year: year || "",
      fuel: fuel || "",
      mileage: km || "",
      price: price || "",
    });
  }, [brand, model, color, year, fuel, km, price]);

  const allBrands = fullAdverts.map((brands) => brands.brand);
  const brands = allBrands.filter(function (este, i) {
    return allBrands.indexOf(este) === i;
  });

  const allModels = fullAdverts.map((model) => model.model);
  const modelsExpecific = allModels.filter(function (este, i) {
    return allModels.indexOf(este) === i;
  });

  const allColors = fullAdverts.map((model) => model.color);
  const colorsExpecific = allColors.filter(function (este, i) {
    return allColors.indexOf(este) === i;
  });

  const allYears = fullAdverts.map((model) => model.year);
  const yearExpecific = allYears.filter(function (este, i) {
    return allYears.indexOf(este) === i;
  });

  const allFuels = fullAdverts.map((model) => model.fuel);
  const fuelExpecific = allFuels.filter(function (este, i) {
    return allFuels.indexOf(este) === i;
  });

  const models = fullAdverts.filter((model) => model.brand === brand);
  const justModels = models.map((model) => model.model);
  const modelInc = justModels.filter(function (este, i) {
    return justModels.indexOf(este) === i;
  });

  const colors = models.filter((models) => models.model === model);
  const justColors = colors.map((model) => model.color);
  const colorInc = justColors.filter(function (este, i) {
    return justColors.indexOf(este) === i;
  });

  const years = colors.filter((models) => models.color === color);
  const justYears = years.map((model) => model.year);
  const yearInc = justYears.filter(function (este, i) {
    return justYears.indexOf(este) === i;
  });

  const combs = years.filter((models) => models.year === +year!);
  const justCombs = combs.map((model) => model.fuel);
  const combInc = justCombs.filter(function (este, i) {
    return justCombs.indexOf(este) === i;
  });

  return (
    <aside className="max-h-[1000px] overflow-y-auto filter-scroll">
      <div className="mb-10 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">Marca</h2>
        <ul className="ml-2">
          {brands.map((cars, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer text-heading-6-500 text-grey-3"
                onClick={() => {
                  setBrand(cars),
                    setModel(null),
                    setColor(null),
                    setFuel(null),
                    setYear(null),
                    setKm(null),
                    setPrice(null);
                }}>
                {cars}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mb-10 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">Modelo</h2>
        <ul className="ml-2">
          {models.length
            ? modelInc.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setModel(cars);
                    }}>
                    {cars}
                  </li>
                );
              })
            : modelsExpecific.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setModel(cars);
                    }}>
                    {cars}
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="mb-10 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">Cor</h2>
        <ul className="ml-2">
          {colorInc.length
            ? colorInc.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setColor(cars);
                    }}>
                    {cars}
                  </li>
                );
              })
            : colorsExpecific.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setColor(cars);
                    }}>
                    {cars}
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="mb-10 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">Ano</h2>
        <ul className="ml-2">
          {yearInc.length
            ? yearInc.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setYear(String(cars));
                    }}>
                    {cars}
                  </li>
                );
              })
            : yearExpecific.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setYear(String(cars));
                    }}>
                    {cars}
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="mb-10 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">Combustível</h2>
        <ul className="ml-2">
          {combInc.length
            ? combInc.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setFuel(cars);
                    }}>
                    {cars}
                  </li>
                );
              })
            : fuelExpecific.map((cars, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer text-heading-6-500 text-grey-3"
                    onClick={() => {
                      setFuel(cars);
                    }}>
                    {cars}
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="mb-10 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">KM</h2>
        <div className="ml-2">
          <Button
            btnSize="btn-filter"
            btnColor="btn-negative"
            type="button"
            handleClick={() => {
              setKm("asc"), setPrice(null);
            }}>
            Minimo
          </Button>

          <Button
            btnSize="btn-filter ml-6"
            btnColor="btn-negative"
            handleClick={() => {
              setKm("desc"), setPrice(null);
            }}>
            Maximo
          </Button>
        </div>
      </div>
      <div className="mb-14 invert-direction pl-3">
        <h2 className="text-heading-4-600 mb-4">Preço</h2>
        <div className="ml-2">
          <Button
            btnSize="btn-filter"
            btnColor="btn-negative"
            handleClick={() => {
              setPrice("asc"), setKm(null);
            }}>
            Minimo
          </Button>

          <Button
            btnSize="btn-filter ml-6"
            btnColor="btn-negative"
            handleClick={() => {
              setPrice("desc"), setKm(null);
            }}>
            Maximo
          </Button>
        </div>
      </div>
      {(brand || model || color || year || fuel) && (
        <div className="flex justify-center items-center">
          <Button
            btnSize="btn-big"
            btnColor="btn-brand-1"
            handleClick={() => handleClick()}>
            {textButton}
          </Button>
        </div>
      )}
    </aside>
  );
};

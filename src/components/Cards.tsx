import { Link } from "react-router-dom";
import { Button } from "./Button";
import { UserInitials } from "./UserInitials";
import { useAuth } from "../hooks/userAuth";
import { useNavigate } from "react-router-dom";

interface iAdverts {
  car: {
    id: number;
    brand: string;
    model: string;
    year: number;
    fuel: string;
    mileage: string;
    color: string;
    fipe_price: string | number;
    price: number | string;
    description?: string;
    cover_image: string;
    createdAt: string;
    updatedAt: string;
    is_active?: boolean;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      cpf: string;
      birthdate: Date | string;
      description: string | null;
      admin: boolean;
      seller: boolean;
      color: string;
      createdAt: Date;
      updatedAt: Date;
    };
    images: CarImgObj;
  };
}

export interface CarImgObj {
  image_link_one: string | null;
  image_link_two: string | null;
  image_link_three: string | null;
  image_link_four: string | null;
  image_link_five: string | null;
  image_link_six: string | null;
}
interface CardProps extends iAdverts {
  initialPage?: boolean;
  isOwner?: boolean;
}

export interface CardObj {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  price: number | string;
  description?: string;
  cover_image: string;
}

export interface UserObj {
  name: string;
  color: string;
  description: string;
  id: number;
}

export const Cards = ({ car, initialPage = false, isOwner }: CardProps) => {
  const navigate = useNavigate();
  let discount = false;
  const {
    user,
    setAdvert,
    logged,
    editAdvertIsOpen,
    setEditAdvertIsOpen,
    setIsCar,
  } = useAuth();
  const price = +car.price;
  const fipe_price = +car.fipe_price;
  if (price <= fipe_price - fipe_price * 0.05) discount = true;

  const formatObjectsAndSetCar = () => {
    const carObj = {
      id: car.id,
      model: car.model,
      brand: car.brand,
      mileage: car.mileage,
      year: car.year,
      cover_image: car.cover_image,
      price: car.price,
      description: car.description,
    };

    const userObj = {
      name: car.user.name,
      color: car.user.color,
      description: car.user.description,
      id: car.user.id,
    };

    const imagesCarObj = {
      image_link_1: car.images?.image_link_one || null,
      image_link_2: car.images?.image_link_two || null,
      image_link_3: car.images?.image_link_three || null,
      image_link_4: car.images?.image_link_four || null,
      image_link_5: car.images?.image_link_five || null,
      image_link_6: car.images?.image_link_six || null,
    };

    localStorage.setItem("@userInfo", JSON.stringify(userObj));
    localStorage.setItem("@carInfo", JSON.stringify(carObj));
    localStorage.setItem("@carImgs", JSON.stringify(imagesCarObj));
    setAdvert(car);
  };

  const setCarAndNavigate = () => {
    formatObjectsAndSetCar();
    navigate(`/product/${car.id}`);
  };

  return (
    <>
      {(initialPage || isOwner || car.is_active) && (
        <div>
          <li
            className="flex gap-4 flex-col justify-between items-start pt-0 w-[312px] group mb-9 cursor-pointer"
            onClick={() => formatObjectsAndSetCar()}
          >
            <Link to={`/product/${car.id}`}>
              <div className="flex justify-center items-center bg-grey-7 w-full h-[150px] relative border-2 border-transparent group-hover:border-brand-1 group-hover:border-solid ">
                <img
                  src={car.cover_image}
                  alt="carro"
                  className="object-cover w-full h-full min-w-[308px]"
                />
                {user && (
                  <>
                    {discount && initialPage && (
                      <span className="bg-random-7 w-4 h-7 text-white-fixed text-sm font-medium border-none flex items-center justify-center rounded-sm absolute top-0 right-0">
                        $
                      </span>
                    )}
                    {!initialPage && isOwner && (
                      <>
                        {car.is_active ? (
                          <span className="flex items-center top-3 left-4 h-6 px-2 bg-brand-1 text-body-2-500 text-white-fixed absolute">
                            Ativo
                          </span>
                        ) : (
                          <span className="flex items-center top-3 left-4 h-6 px-2 bg-grey-4 text-body-2-500 text-white-fixed absolute">
                            Inativo
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="h-3/6 w-full flex flex-col justify-between">
                <div className="flex mb-4">
                  <h2 className="h-6 overflow-hidden font-lexend text-base font-semibold">{`${car.brand} - ${car.model}`}</h2>
                </div>
                <p className="ellipsis-limiter text-grey-2 text-body-2-400">
                  {car.description}
                </p>
                <div className="flex items-center my-4">
                  {(initialPage || !logged || !isOwner) && (
                    <>
                      <UserInitials
                        name={car.user.name}
                        color={car.user.color}
                      />
                      <span className="ml-2 font-medium text-sm text-grey-2">
                        {car.user.name}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center ">
                    <span className="bg-brand-4 text-brand-1 font-medium text-sm px-2 py-1.5 rounded">
                      {`${car.mileage} KM`}
                    </span>
                    <span className="bg-brand-4 text-brand-1 font-medium text-sm px-2 py-1.5 rounded ml-3">
                      {car.year}
                    </span>
                  </div>
                  <span className="font-lexend text-grey-1 font-medium text-base">{`${price.toLocaleString(
                    "pt-br",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}`}</span>
                </div>
              </div>
            </Link>
            {isOwner && !initialPage && (
              <div className="flex gap-4 mt-4">
                <Button
                  btnSize="btn-medium"
                  btnColor="btn-outline-1"
                  type="submit"
                  handleClick={() => {
                    setEditAdvertIsOpen(!editAdvertIsOpen), setIsCar(car);
                  }}
                >
                  Editar
                </Button>
                <Button
                  handleClick={() => {
                    setCarAndNavigate();
                  }}
                  btnSize="btn-medium"
                  btnColor="btn-outline-1"
                >
                  Ver detalhes
                </Button>
              </div>
            )}
          </li>
        </div>
      )}
    </>
  );
};

import { UserInitials } from "./UserInitials";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserObj } from "./Cards";

export const UserCard = () => {
  const [userInfo, setUserInfo] = useState({} as UserObj);

  useEffect(() => {
    const userString = localStorage.getItem("@userInfo");

    setUserInfo(userString ? JSON.parse(userString) : null);
  }, []);

  return (
    <div className="bg-grey-10 mt-[1.25rem] rounded w-full h-96 sm:h-[26.625rem] flex-column-center px-7 sm:px-11 text-center gap-y-7 sm:gap-y-8">
      <UserInitials name={userInfo.name} color={userInfo.color} bigSize />
      <h3 className="text-heading-6-600 text-grey-1">{userInfo.name}</h3>
      <div className="w-full h-24 overflow-y-auto no-scrollbar">
        <p className="body-1-400 text-grey-2">{userInfo.description}</p>
      </div>
      <Link to={`/profile/${userInfo.id}`}>
        <Button btnSize="btn-big" btnColor="btn-grey-1">
          Ver todos os anúncios
        </Button>
      </Link>
    </div>
  );
};

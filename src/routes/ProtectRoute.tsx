// import { Outlet, useParams } from "react-router-dom";
// import { useAuth } from "../hooks/userAuth";
// import { iUser } from "../contexts/UserContext";

// export const ProtectedRoutes = () => {
//   const { setLogged, user, currentUserAdverts } = useAuth();

//   const token = localStorage.getItem("@TOKEN");
//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   if (!token) {
//     // user.seller(false);
//     //  setCarsProfile(false);
//     setLogged(false);
//   }

//   const { id } = useParams();
//   const userString = localStorage.getItem("@USER");
//   const userLocal: iUser = userString ? JSON.parse(userString) : null;
//   //console.log(userLocal, id);

//   if (user !== undefined && user !== null) {
//     if (userLocal.id !== Number(id)) {
//       // setCarsProfile(false);

//       //setCurrentUserAdverts(newAdverts);
//     }
//   }

//   return <Outlet />;
// };

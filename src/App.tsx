import { PageRoutes } from "./routes";
import { UserProvider } from "./contexts/UserContext";
import { FilterProvider } from "./contexts/FilterContext";
import { CommentsProvider } from "./contexts/CommentsContext";

export const App = () => {
  return (
    <>
      <UserProvider>
        <CommentsProvider>
          <FilterProvider>
            <PageRoutes />
          </FilterProvider>
        </CommentsProvider>
      </UserProvider>
    </>
  );
};

import { Outlet } from "react-router-dom";
import TopMenu from "../../navigation/top-menu";
import { useAuth } from "@/context/AuthContext";

const BaseLayout = () => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated, "isAuthed from base");
  return (
    <div className="flex w-full">
      <div className="w-full h-full flex flex-col">
        <TopMenu isAuth={isAuthenticated} />
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;

import { Outlet } from "react-router-dom";
import TopMenu from "../../navigation/top-menu";

const BaseLayout = () => {
  const isAuthenticated = (() => {
    try {
      const storedValue = localStorage.getItem("isAuthenticated");
      return storedValue ? JSON.parse(storedValue) : false;
    } catch (error) {
      console.error("Failed to parse isAuthenticated:", error);
      return false;
    }
  })();
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

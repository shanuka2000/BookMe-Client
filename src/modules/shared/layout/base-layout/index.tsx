import { Outlet } from "react-router-dom";
import TopMenu from "../../navigation/top-menu";

const BaseLayout = () => {
  return (
    <div className="flex w-full">
      <div className="w-full h-full flex flex-col">
        <TopMenu />
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;

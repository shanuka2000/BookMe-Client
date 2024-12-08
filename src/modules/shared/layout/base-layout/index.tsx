import { Outlet, useNavigate } from "react-router-dom";
import TopMenu from "../../navigation/top-menu";
import { useEffect, useState } from "react";
import { retriveUserProfile } from "@/api/api-services/authentication-service";
import { useToast } from "@/hooks/use-toast";

const BaseLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);

      try {
        const response = await retriveUserProfile();
        if (response) {
          toast({
            title: "Profile Loaded.",
            description: response.message,
          });
          localStorage.setItem("user", JSON.stringify(response.data));
          setTimeout(() => {
            if (response.data.role === "passenger") {
              navigate("/client/search");
            }
          });
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [isAuthenticated === "true"]);
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

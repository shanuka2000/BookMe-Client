import { logoutUser } from "@/api/api-services/authentication-service";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;
  const { setAuthStatus } = useAuth();

  useEffect(() => {
    const postLogoutUser = async () => {
      try {
        setLoading(true);
        if (!role) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Redirecting back to home page.",
            variant: "destructive",
          });
          if (role === "passenger") {
            navigate("/client/search");
          } else if (role === "driver") {
            navigate("/driver/dashboard");
          } else if (role === "admin") {
            navigate("/driver/dashboard");
          }
        }

        const response = await logoutUser(role);
        if (response) {
          localStorage.setItem("user", "");
          localStorage.setItem("isAuthenticated", "false");
          setAuthStatus(false);
          navigate("/");
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Redirecting back to home page.",
          variant: "destructive",
        });
        if (role === "passenger") {
          navigate("/client/search");
        } else if (role === "driver") {
          navigate("/driver/dashboard");
        } else if (role === "admin") {
          navigate("/driver/dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    postLogoutUser();
  }, []);

  return <div></div>;
};

export default Logout;

import {
  loginUser,
  retriveUserProfile,
} from "@/api/api-services/authentication-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userType = useAppSelector((state) => state.uiUpdates.authUserType);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);

    if (!userType) {
      return;
    }

    try {
      const { email, password } = data;
      const response = await loginUser(email, password, userType);
      if (response) {
        const profile = await retriveUserProfile();
        if (profile) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(profile.data));
          if (profile.data.role === "passenger") {
            toast({
              title: `Welcome back ${response.data.firstName}.`,
              description: response.message,
            });
            navigate("/client/search");
          } else if (profile.data.role === "driver") {
            toast({
              title: `Welcome back ${response.data.firstName}.`,
              description: response.message,
            });
            navigate("/driver/dashboard");
          } else if (profile.data.role === "admin") {
            toast({
              title: `Welcome back ${response.data.firstName}.`,
              description: response.message,
            });
            navigate("/driver/dashboard");
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "An unexpected error occurred. Please try again.",
              variant: "destructive",
            });
            navigate("/login");
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
      localStorage.setItem("isAuthenticated", "false");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[450px] p-5">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remember me</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <a href="/reset-password" className="text-sm font-medium">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin text-xl" />
                    Loging in
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="text-sm flex items-center justify-center space-x-1">
          <p>Don't have an account?</p>
          <a href="/signup" className="text-primary/90">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;

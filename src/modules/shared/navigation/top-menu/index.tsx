import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggle from "../../components/toggle/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setAuthUserType } from "@/redux/reducers/ui-updates-slice";
import { Button } from "@/components/ui/button";

type UserType = "passenger" | "driver" | "admin";

const TopMenu = () => {
  const isAuthenticated = JSON.parse(
    localStorage.getItem("isAuthenticated") || "false"
  );
  const dispatch = useAppDispatch();
  const currentUrl = window.location.href;
  const form = useForm<{ userType: UserType }>({
    defaultValues: { userType: "passenger" },
  });
  const { watch, control } = form;
  const selectedUserType = watch("userType");

  useEffect(() => {
    if (selectedUserType) {
      dispatch(setAuthUserType({ authUserType: selectedUserType }));
    }
  }, [selectedUserType]);

  return (
    <header className="fixed top-0 bg-background/95 backdrop-blur w-full border-b border-b-[#292524] px-4 py-5 flex items-center justify-between">
      {currentUrl.includes("login") || currentUrl.includes("signup") ? (
        <>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            Home
          </a>
          <div>
            <Form {...form}>
              <form>
                <FormField
                  name="userType"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        onValueChange={(value: UserType) => {
                          field.onChange(value);
                          console.log("Selected user type:", value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="passenger">
                            Passenger{" "}
                            {currentUrl.includes("login")
                              ? "login"
                              : "register"}
                          </SelectItem>
                          <SelectItem value="driver">
                            Driver{" "}
                            {currentUrl.includes("login")
                              ? "login"
                              : "register"}
                          </SelectItem>
                          <SelectItem value="admin">
                            Admin{" "}
                            {currentUrl.includes("login")
                              ? "login"
                              : "register"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </>
      ) : (
        <>
          <div className="flex space-x-3">
            <a href="/" className="flex text-lg font-medium gap-x-1">
              BookME <span>{currentUrl.includes("client") && "Passenger"}</span>
              <span>{currentUrl.includes("admin") && "Admin"}</span>
              <span>{currentUrl.includes("driver") && "Driver"}</span>
            </a>
            {currentUrl.includes("client") && (
              <>
                <a href="/track-booking">
                  <Button variant="outline">Track trip</Button>
                </a>
              </>
            )}
          </div>
          <div
            className={`flex ${
              isAuthenticated ? "flex-row-reverse gap-x-5" : "space-x-2"
            } items-center`}
          >
            {isAuthenticated ? (
              <>
                <a href="/client/profile">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </a>
              </>
            ) : (
              <>
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  Sign up
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  Log in
                </a>
              </>
            )}
            <ThemeToggle />
          </div>
        </>
      )}
    </header>
  );
};

export default TopMenu;

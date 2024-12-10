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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";

type UserType = "passenger" | "driver" | "admin";

type TopMenuProps = {
  isAuth: boolean;
};

const TopMenu = ({ isAuth }: TopMenuProps) => {
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
              isAuth ? "flex-row-reverse gap-x-5" : "space-x-2"
            } items-center`}
          >
            {isAuth ? (
              <>
                <Popover>
                  <PopoverTrigger
                    asChild
                    className="hidden md:flex hover:cursor-pointer"
                  >
                    <div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 max-md:mt-3 space-y-3 flex flex-col">
                    <a href="/client/profile" className="w-full">
                      <span className="w-full">Profile</span>
                    </a>
                    <a href="/logout" className="w-full">
                      <span className="w-full">Logout</span>
                    </a>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger
                    asChild
                    className="md:hidden hover:cursor-pointer"
                  >
                    <div className="md:hidden">
                      <Menu />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 max-md:mt-3  space-y-3">
                    <div>
                      <a href="/client/profile">Profile</a>
                    </div>
                    <div>
                      <a href="/logout">Logout</a>
                    </div>
                  </PopoverContent>
                </Popover>
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

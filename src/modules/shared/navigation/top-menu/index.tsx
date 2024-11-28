import ThemeToggle from "../../components/toggle/theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TopMenuProps = {
  isAuth?: boolean;
};

const TopMenu = ({ isAuth = true }: TopMenuProps) => {
  const currentUrl = window.location.href;

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
        </>
      ) : (
        <>
          <div>
            <a href="/" className="flex text-lg font-medium gap-x-1">
              BookME <span>{currentUrl.includes("client") && "Passenger"}</span>
              <span>{currentUrl.includes("admin") && "Admin"}</span>
              <span>{currentUrl.includes("driver") && "Driver"}</span>
            </a>
          </div>
          <div
            className={`flex ${
              isAuth ? "flex-row-reverse gap-x-5" : "space-x-2"
            } items-center`}
          >
            {isAuth ? (
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

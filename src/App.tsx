import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./modules/shared/layout/base-layout";
import Welcome from "./modules/client/base";
import Login from "./modules/auth/login";
import Register from "./modules/auth/register";
import Profile from "./modules/client/dashboard/profile";
import Search from "./modules/client/dashboard/search";
import Ride from "./modules/client/dashboard/ride";
import TrackBooking from "./modules/client/dashboard/track-booking";
import DriverWelcome from "./modules/driver/base";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Register />,
        },
        {
          path: "/client/profile",
          element: <Profile />,
        },
        {
          path: "/client/search",
          element: <Search />,
        },
        {
          path: "/client/ride/:id",
          element: <Ride />,
        },
        {
          path: "/track-booking",
          element: <TrackBooking />,
        },
        {
          path: "/driver/dashboard",
          element: <DriverWelcome />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

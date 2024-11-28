import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bell, Globe, History, KeyRound, UserPen } from "lucide-react";
import React, { useState } from "react";
import PersonalDetails from "./components/personal-details";
import LanguageAndRegion from "./components/language-and-region";
import Notification from "./components/notification";
import Security from "./components/security";
import Bookings from "./components/bookings";

const Profile = () => {
  const data = {
    nav: [
      {
        displayName: "Personal Details",
        name: "personalDetails",
        icon: UserPen,
      },
      {
        displayName: "Security",
        name: "security",
        icon: KeyRound,
      },
      {
        displayName: "Booking History",
        name: "bookingHistory",
        icon: History,
      },
      {
        displayName: "Language & region",
        name: "language&Region",
        icon: Globe,
      },
      { displayName: "Notifications", name: "notifications", icon: Bell },
    ],
  };
  const [isActive, setIsActive] = useState("personalDetails");

  return (
    <div className="pt-24 w-full md:w-[70%] flex px-4">
      <div className="flex h-fit flex-col border w-[15%] md:w-[30%] rounded-lg">
        {data.nav.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => setIsActive(item.name)}
              className={`w-full flex items-center justify-center md:items-start md:justify-start py-3 px-2 gap-x-2 first:rounded-t-lg last:rounded-b-lg ${
                isActive === item.name && "bg-sidebar-accent"
              }`}
            >
              <item.icon size={20} className="block md:hidden" />
              <item.icon size={20} className="hidden md:block" />
              <span className="max-md:hidden">{item.displayName}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="flex-1 px-4 space-y-4">
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {data.nav.find((item) => item.name === isActive)?.displayName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-full">
          {isActive === "personalDetails" && <PersonalDetails />}
          {isActive === "security" && <Security />}
          {isActive === "bookingHistory" && <Bookings />}
          {isActive === "language&Region" && <LanguageAndRegion />}
          {isActive === "notifications" && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

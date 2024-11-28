import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleAlert, Map, MoveRight } from "lucide-react";
import React, { useState } from "react";
import bus from "../../../../../assets/bus.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Timeline,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from "@/components/timeline/timeline";

const Bookings = () => {
  const loading = false;
  const [isHovered, setIsHovered] = useState("");
  const data = {
    oldBookings: [
      {
        passengers: {
          gender: "Male",
          firstName: "Shavindi",
          lastName: "Nimsara",
        },
        seatReservation: {
          totalSeats: 1,
          seatConfiguration: [
            {
              seatNumber: 4,
              seatType: "window",
              seatFloor: "1",
            },
          ],
          currency: "LKR",
          totalSeatPrice: 1000,
        },
        cotact: {
          email: "sample@mail.com",
          countryCode: "+94",
          phone: 111111111,
        },
        payment: {
          paymentType: "card",
          billingAddress: null,
        },
        tripSummary: {
          from: "colombo",
          to: "kandy",
          dateFrom: "2024-11-16T10:43:36+00:00",
          dateTo: "2024-11-16T10:43:36+00:00",
          startTime: "10:00",
          endTIme: "17:30",
          tripType: "direct",
          fromLocation:
            "https://www.google.com/maps/place/Colombo+Central+Bus+Stand/@6.9349911,79.8515757,17z/data=!4m14!1m7!3m6!1s0x3ae253cc0b347a99:0xaa180c9eadb18cc6!2sBus+Stop!8m2!3d6.8635912!4d80.0253039!16s%2Fg%2F11hz8rz77f!3m5!1s0x3ae25918b19d5035:0x4de4d357145b9a92!8m2!3d6.9349908!4d79.8529545!16s%2Fg%2F11fmddjvmd?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D",
          toLocation:
            "https://www.google.com/maps/place/Kandy+Bus+Stand/@7.289825,80.6288988,17z/data=!4m14!1m7!3m6!1s0x3ae36970c5a5a31f:0xd6e19563d79cbf59!2sKandy+Bus+Stand!8m2!3d7.2898141!4d80.6310986!16s%2Fg%2F11n0cy823d!3m5!1s0x3ae36970c5a5a31f:0xd6e19563d79cbf59!8m2!3d7.2898141!4d80.6310986!16s%2Fg%2F11n0cy823d?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D",
          currency: "LKR",
          serviceFee: 200,
          seatPrice: 1000,
          totalFare: 1200,
        },
        tripFinalStatus: {
          completionStatus: "completed",
          tripStartTime: "10:00",
          tripEndTime: "18:00",
        },
      },
    ],
  };
  return (
    <div className="space-y-5">
      {loading ? (
        <>
          <Card className="p-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-start justify-start gap-x-3">
                      <Skeleton className="h-12 w-12 rounded-full bg-gray-300/10" />
                      <div className="flex flex-col gap-y-1">
                        <div className="flex gap-x-2">
                          <Skeleton className="h-2 w-16 rounded-md bg-gray-300/10" />
                          <Skeleton className="h-2 w-16 rounded-md bg-gray-300/10" />
                        </div>
                        <Skeleton className="h-5 w-[300px] rounded-md bg-gray-300/10" />
                        <Skeleton className="h-4 w-16 rounded-md bg-gray-300/10" />
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-6 w-[60px] rounded-sm bg-gray-300/10" />
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </Card>
        </>
      ) : (
        <>
          {data.oldBookings && data.oldBookings.length > 0 ? (
            <>
              <ScrollArea className="h-72  rounded-md border [&>*]:p-3">
                {data.oldBookings.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="hidden xl:flex items-center justify-between p-2 py-4">
                      <div className="flex items-start justify-start gap-x-3">
                        <Avatar>
                          <AvatarImage src={bus} />
                          <AvatarFallback>
                            {item.tripSummary.tripType[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-y-1">
                          <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1 text-sm">
                              <p className="flex items-center gap-x-1">
                                From: {item.tripSummary.from}{" "}
                                <a
                                  target="_blank"
                                  href={item.tripSummary.fromLocation}
                                >
                                  <Map size={15} />
                                </a>
                              </p>
                              <MoveRight size={15} />
                              <p className="flex items-center gap-x-1">
                                To: {item.tripSummary.to}
                                <a
                                  target="_blank"
                                  href={item.tripSummary.toLocation}
                                >
                                  <Map size={15} />
                                </a>
                              </p>
                            </div>
                            <Badge>
                              {item.tripFinalStatus.completionStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-x-1">
                            <p className="text-sm">
                              Trip booked by{" "}
                              <b>
                                {item.passengers.firstName +
                                  " " +
                                  item.passengers.lastName}
                              </b>{" "}
                              and booked a total of{" "}
                              <b>{item.seatReservation.totalSeats} </b>
                              {item.seatReservation.totalSeats === 1
                                ? "seat."
                                : "seats."}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          onMouseEnter={() => setIsHovered(index.toString())}
                          onMouseLeave={() => setIsHovered("")}
                          className="transition-transform w-[130px]"
                        >
                          {isHovered === index.toString() ? (
                            <>View full details</>
                          ) : (
                            <>Rs.{item.tripSummary.totalFare}</>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="xl:hidden">
                      <div className="px-6 pb-3 flex items-center gap-x-2">
                        {item.tripFinalStatus.completionStatus && (
                          <Badge>
                            Trip {item.tripFinalStatus.completionStatus}
                          </Badge>
                        )}
                        {item.passengers.firstName && (
                          <Badge>
                            By{" "}
                            {item.passengers.firstName +
                              " " +
                              item.passengers.lastName}
                          </Badge>
                        )}
                        {item.seatReservation.totalSeats && (
                          <Badge>
                            Total seats {item.seatReservation.totalSeats}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Timeline>
                            <TimelineItem>
                              <TimelineConnector />
                              <TimelineHeader>
                                <TimelineIcon />
                                <TimelineTitle className="flex items-center gap-x-1">
                                  {item.tripSummary.from}
                                  <a
                                    target="_blank"
                                    href={item.tripSummary.fromLocation}
                                  >
                                    <Map size={15} />
                                  </a>
                                </TimelineTitle>
                              </TimelineHeader>
                            </TimelineItem>
                            <TimelineItem>
                              <TimelineHeader>
                                <TimelineIcon />
                                <TimelineTitle className="flex items-center gap-x-1">
                                  {item.tripSummary.to}
                                  <a
                                    target="_blank"
                                    href={item.tripSummary.toLocation}
                                  >
                                    <Map size={15} />
                                  </a>
                                </TimelineTitle>
                              </TimelineHeader>
                            </TimelineItem>
                          </Timeline>
                        </div>
                        <div>
                          <Button
                            onMouseEnter={() => setIsHovered(index.toString())}
                            onMouseLeave={() => setIsHovered("")}
                            className="transition-transform w-[130px]"
                          >
                            {isHovered === index.toString() ? (
                              <>View full details</>
                            ) : (
                              <>Rs.{item.tripSummary.totalFare}</>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </React.Fragment>
                ))}
              </ScrollArea>
            </>
          ) : (
            <>
              <Card className="p-4">
                <CardHeader className="flex items-center justify-start gap-x-3 flex-row">
                  <CircleAlert size={30} className="text-primary" />
                  <div className="space-y-2">
                    <CardTitle>Sorry, no bookings were found</CardTitle>
                    <CardDescription>
                      Could be a error from our end or you have no old bookings.
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Bookings;

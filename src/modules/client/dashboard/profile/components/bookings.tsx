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
import React, { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Booking, getBookings } from "@/api/api-services/booking-service";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isHovered, setIsHovered] = useState("");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        const id = user?.id;
        if (!id) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Please refresh the page and try again!",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const response = await getBookings(id);
        if (response && response.data.length > 0) {
          setBookings(response.data);
        } else {
          setBookings([]);
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserBookings();
  }, []);
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
          {bookings && bookings.length > 0 ? (
            <>
              <ScrollArea className="h-72 rounded-md border [&>*]:p-3">
                {bookings.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="hidden xl:flex items-center justify-between p-2 py-4">
                      <div className="flex items-start justify-start gap-x-3">
                        <Avatar>
                          <AvatarImage src={bus} />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-y-1">
                          <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1 text-sm">
                              <p className="flex items-center gap-x-1 line-clamp-1">
                                From: {item.bookingFrom.displayName}{" "}
                                <a
                                  target="_blank"
                                  href={item.bookingFrom.locationUrl}
                                >
                                  <Map size={15} />
                                </a>
                              </p>
                              <MoveRight size={15} />
                              <p className="flex items-center gap-x-1 line-clamp-1">
                                To: {item.bookingTo.displayName}
                                <a
                                  target="_blank"
                                  href={item.bookingTo.locationUrl}
                                >
                                  <Map size={15} />
                                </a>
                              </p>
                            </div>
                            <Badge>{item.bookingStatus}</Badge>
                          </div>
                          <div className="flex items-center gap-x-1">
                            <p className="text-sm">
                              Trip booked by{" "}
                              <b>
                                {item.bookedBy.firstName +
                                  " " +
                                  item.bookedBy.lastName}
                              </b>{" "}
                              and booked a total of <b>{item.seats} </b>
                              {item.seats === 1 ? "seat." : "seats."}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          onMouseEnter={() => setIsHovered(index.toString())}
                          onMouseLeave={() => setIsHovered("")}
                          className="transition-transform w-[130px]"
                          onClick={() =>
                            navigate(
                              `/track-booking?bookingId=${item._id}&tripId=${item.tripId}`
                            )
                          }
                        >
                          {isHovered === index.toString() ? (
                            <>View full details</>
                          ) : (
                            <>Rs.{item.bookingPrice}</>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="xl:hidden my-3">
                      <div className="px-6 pb-3 flex items-center gap-x-2">
                        {item.bookingStatus && (
                          <Badge className="text-xs">
                            Status: {item.bookingStatus}
                          </Badge>
                        )}
                        {item.seats && (
                          <Badge className="text-xs">
                            No seats: {item.seats}
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
                                  <span className="line-clamp-1 text-xs">
                                    {item.bookingFrom.displayName}
                                  </span>
                                  <a
                                    target="_blank"
                                    href={item.bookingFrom.locationUrl}
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
                                  <span className="line-clamp-1 text-xs">
                                    {item.bookingTo.displayName}
                                  </span>
                                  <a
                                    target="_blank"
                                    href={item.bookingTo.locationUrl}
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
                            className="transition-transform w-[90px] text-xs"
                            onClick={() =>
                              navigate(
                                `/track-booking?bookingId=${item._id}&tripId=${item.tripId}`
                              )
                            }
                            disabled={
                              item.bookingStatus === "completed" ||
                              item.bookingStatus === "cancelled" ||
                              item.bookingStatus === "abandoned"
                            }
                          >
                            {isHovered === index.toString() ? (
                              <>Track</>
                            ) : (
                              <>Rs.{item.bookingPrice}</>
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

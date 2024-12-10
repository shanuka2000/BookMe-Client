import {
  retriveSingleTrip,
  Trip,
  updateTripStatus,
} from "@/api/api-services/trip-service";
import { patchTripStopStatus } from "@/api/api-services/trip-stops-service";
import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
} from "@/components/timeline/timeline";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DriverTrip = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [isRefetchRequired, setIsRefetchRequired] = useState(false);
  const [action, setAction] = useState<
    "not_started" | "on_going" | "completed" | ""
  >("");
  const [actionId, setActionId] = useState<string | "">("");
  const [patchLoading, setPatchLoading] = useState(false);
  const [patchStopLoading, setPatchStopLoading] = useState(false);

  const updatedTripStatus = async (
    action: "not_started" | "on_going" | "completed",
    actionId: string,
    previousAction: "not_started" | "on_going" | "completed"
  ) => {
    console.log("Inside method");
    try {
      setPatchLoading(true);
      if (previousAction === "not_started" || previousAction === "on_going") {
        console.log("Inside try");
        if (!action || !actionId) {
          toast({
            title: "Uh oh! Something went wrong.",
            description:
              "An unexpected error occurred. Please refresh and try again.",
            variant: "destructive",
          });
          setPatchLoading(false);
          return;
        }
        const response = await updateTripStatus(actionId, action);
        if (response) {
          setIsRefetchRequired(true);
        }
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPatchLoading(false);
    }
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        if (!tripId) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Please provide a valid trip ID!",
            variant: "destructive",
          });
          return;
        }
        const response = await retriveSingleTrip(tripId);
        if (response) {
          setTrip(response.data);
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Seems we were not able to find the trip.",
            variant: "destructive",
          });
        }

        if (isRefetchRequired) {
          setIsRefetchRequired(false);
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
        setTrip(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [isRefetchRequired]);

  const updateTripStopStatus = async (
    id: string,
    tripID: string,
    isArrived: boolean
  ) => {
    try {
      setPatchStopLoading(true);
      const tripId = tripID;
      const response = await patchTripStopStatus(id, tripId, isArrived);
      if (response) {
        setIsRefetchRequired(true);
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
      setTrip(undefined);
    } finally {
      setPatchStopLoading(false);
    }
  };

  return (
    <div className="mt-24 flex flex-col p-1 space-y-5 items-center justify-center">
      {trip ? (
        <Card className="w-[90%] md:w-[40%] p-1">
          <CardHeader className="gap-y-1">
            <CardTitle>
              Search result for trip id{" "}
              <span className="text-primary">{trip._id}</span>
            </CardTitle>
            <CardDescription>
              Below timeline shows the exact location of the bus you booked
              right now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>
                    {trip.startLocation.displayName}
                  </TimelineTitle>
                  <TimelineDescription>
                    {trip.status === "on_going" && (
                      <Button className="text-xs" disabled variant="outline">
                        Completed
                      </Button>
                    )}
                    {trip.status === "not_started" && (
                      <Button
                        className="text-xs"
                        variant="default"
                        onClick={() => {
                          updatedTripStatus("on_going", trip._id, trip.status);
                        }}
                      >
                        {patchLoading && trip._id === actionId ? (
                          <>
                            <LoaderCircle className="animate-spin text-xl" />
                          </>
                        ) : (
                          <>Start trip</>
                        )}
                      </Button>
                    )}
                    {trip.status === "completed" && (
                      <Button className="text-xs" disabled variant="outline">
                        Completed
                      </Button>
                    )}
                  </TimelineDescription>
                </TimelineHeader>
              </TimelineItem>
              {/* {trip.stops &&
                trip.stops.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon />
                      <TimelineTitle>
                        {item.stopLocation.displayName}
                      </TimelineTitle>
                      <TimelineDescription>
                        <Button className="text-xs">Mark as completed</Button>
                      </TimelineDescription>
                    </TimelineHeader>
                  </TimelineItem>
                ))} */}
              {/* {trip.stops &&
                trip.stops.map((item, index) => {
                  // Determine if the button should be enabled
                  const isFirstStop = item.stopId === 1;
                  const isPreviousArrived =
                    index === 0 || trip.stops[index - 1].isArrived === true;

                  const isButtonEnabled =
                    (isFirstStop && trip.status === "on_going") ||
                    (!isFirstStop && isPreviousArrived);

                  return (
                    <TimelineItem key={index}>
                      <TimelineConnector />
                      <TimelineHeader>
                        <TimelineIcon />
                        <TimelineTitle>
                          {item.stopLocation.displayName}
                        </TimelineTitle>
                        <TimelineDescription>
                          <Button
                            className="text-xs"
                            variant={isButtonEnabled ? "default" : "outline"}
                            disabled={!isButtonEnabled}
                          >
                            Mark as completed
                          </Button>
                        </TimelineDescription>
                      </TimelineHeader>
                    </TimelineItem>
                  );
                })} */}
              {trip.stops &&
                trip.stops.map((item, index) => {
                  // Determine if the button should be enabled
                  const isFirstStop = item.stopId === 1;
                  const isPreviousArrived =
                    index === 0 || trip.stops[index - 1].isArrived === true;

                  // Button should be enabled only if the stop is not marked as isArrived
                  const isButtonEnabled =
                    !item.isArrived &&
                    ((isFirstStop && trip.status === "on_going") ||
                      (!isFirstStop && isPreviousArrived));

                  return (
                    <TimelineItem key={index}>
                      <TimelineConnector />
                      <TimelineHeader>
                        <TimelineIcon />
                        <TimelineTitle>
                          {item.stopLocation.displayName}
                        </TimelineTitle>
                        <TimelineDescription>
                          {item.isArrived ? (
                            <Button
                              className="text-xs"
                              variant="outline"
                              disabled
                            >
                              Completed
                            </Button>
                          ) : (
                            <Button
                              className="text-xs"
                              variant={isButtonEnabled ? "default" : "outline"}
                              disabled={!isButtonEnabled}
                              onClick={() =>
                                updateTripStopStatus(item._id, trip._id, true)
                              }
                            >
                              Mark as completed
                            </Button>
                          )}
                        </TimelineDescription>
                      </TimelineHeader>
                    </TimelineItem>
                  );
                })}
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>{trip.endLocation.displayName}</TimelineTitle>
                  <TimelineDescription>
                    {trip.status === "on_going" &&
                      trip.stops[trip.stops.length - 1].isArrived && (
                        <Button
                          variant="default"
                          className="text-xs"
                          onClick={() => {
                            updatedTripStatus(
                              "completed",
                              trip._id,
                              trip.status
                            );
                          }}
                        >
                          {patchLoading && trip._id === actionId ? (
                            <>
                              <LoaderCircle className="animate-spin text-xl" />
                            </>
                          ) : (
                            <>Mark as trip completed</>
                          )}
                        </Button>
                      )}
                    {!trip.stops[trip.stops.length - 1].isArrived && (
                      <Button variant="outline" disabled className="text-xs">
                        Mark as trip completed
                      </Button>
                    )}
                    {trip.status === "completed" && (
                      <Button variant="outline" disabled className="text-xs">
                        Completed
                      </Button>
                    )}
                  </TimelineDescription>
                </TimelineHeader>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[90%] md:w-[40%] p-4">
          <CardHeader className="flex items-center justify-start gap-x-3 flex-row">
            <CircleAlert size={30} className="text-primary" />
            <div className="space-y-2">
              <CardTitle>No data to show.</CardTitle>
              <CardDescription>
                Seems the trip is not found or something went wrong in our end.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default DriverTrip;

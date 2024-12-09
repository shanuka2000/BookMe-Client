import { retriveSingleTrip, Trip } from "@/api/api-services/trip-service";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TrackBooking = () => {
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [tripIdRetrived, setTripIdRetrived] = useState<string | null>(tripId);
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Input Required",
        description: "Please enter a valid trip ID.",
        variant: "destructive",
      });
      return;
    }
    setTripIdRetrived(inputValue.trim());
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        if (!tripIdRetrived) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Please provide a valid trip ID!",
            variant: "destructive",
          });
          return;
        }
        const response = await retriveSingleTrip(tripIdRetrived);
        if (response) {
          setTrip(response.data);
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Seems we were not able to find the trip.",
            variant: "destructive",
          });
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

    let interval: NodeJS.Timeout | undefined;
    if (tripIdRetrived) {
      interval = setInterval(fetchTripDetails, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tripIdRetrived]);

  return (
    <div className="mt-24 flex flex-col p-1 space-y-5 items-center justify-center">
      <Card className="w-[90%] md:w-[40%] px-3">
        <CardHeader className="flex flex-col items-center space-y-5">
          <CardTitle>Trip Progress Search</CardTitle>
          <CardDescription>
            Track your trip status by entering the tracking number below.
          </CardDescription>
          <CardContent>
            <div className="flex gap-x-3">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="md:w-[340px]"
                placeholder="example - 6754cd6cc2d1262d3ae92e14"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
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
                    {trip.status === "not_started" && "Trip is not started."}
                    {trip.status === "on_going" &&
                      !trip.stops[0].isArrived &&
                      `Left ${trip.startLocation.displayName}`}
                    {trip.status === "on_going" &&
                      trip.stops[0].isArrived &&
                      "Completed"}
                    {trip.status === "completed" && "Completed."}
                  </TimelineDescription>
                </TimelineHeader>
              </TimelineItem>
              {trip.stops &&
                trip.stops.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon />
                      <TimelineTitle>
                        {item.stopLocation.displayName}
                      </TimelineTitle>
                      <TimelineDescription>
                        {trip.status === "not_started" && "Pending..."}
                        {trip.status === "on_going" &&
                          !item.isArrived &&
                          "Pending..."}
                        {trip.status === "on_going" &&
                          item.isArrived &&
                          "Completed."}
                        {trip.status === "completed" && "Completed."}
                      </TimelineDescription>
                    </TimelineHeader>
                  </TimelineItem>
                ))}
              <TimelineItem>
                <TimelineHeader>
                  <TimelineIcon />
                  <TimelineTitle>{trip.endLocation.displayName}</TimelineTitle>
                  <TimelineDescription>
                    {trip.status === "not_started" && "Pending..."}
                    {trip.status === "completed" && "Trip is completed."}
                    {trip.status === "on_going" &&
                      `On the way to ${trip.endLocation.displayName}`}
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
                Seems the searched trip was not found or you have not searched
                yet!
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default TrackBooking;

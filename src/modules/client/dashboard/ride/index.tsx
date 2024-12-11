import { createBooking } from "@/api/api-services/booking-service";
import {
  Location,
  retriveSingleLocations,
} from "@/api/api-services/location-service";
import { retriveSingleTrip, Trip } from "@/api/api-services/trip-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CircleAlert, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type BookingPayload = {
  bookedBy: string;
  tripId: string;
  seats: number;
  bookingFrom: string;
  bookingTo: string;
};

const Ride = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(600);
  const [, setIsCountdownDone] = useState(false);
  const [, setTripLoading] = useState(false);
  const [, setLocationLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [trip, setTrip] = useState<Trip | undefined>(undefined);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [locations, setLocations] = useState<Location[]>([]);
  const [bookingPayload, setBookingPayload] = useState<
    BookingPayload | undefined
  >(undefined);
  const [, setBookingStatus] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const seats = searchParams.get("seats");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsCountdownDone(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const getSingleTrip = async () => {
      try {
        setTripLoading(true);

        if (!id) {
          setTripLoading(false);
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Please refresh the page and try again!",
            variant: "destructive",
          });
        }

        const response = await retriveSingleTrip(id as string);
        if (response && response.data) {
          setTrip(response.data);
        } else {
          setTrip(undefined);
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Seems we were not able find the trip.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setTripLoading(false);
      }
    };
    const getLocations = async () => {
      try {
        setLocationLoading(true);

        if (!from || !to) {
          toast({
            title: "Something went wrong! Please refresh the page.",
            variant: "destructive",
          });
        }

        const fromLocation = await retriveSingleLocations(from as string);
        const toLocation = await retriveSingleLocations(to as string);

        console.log(fromLocation, "From location");
        console.log(toLocation, "To location");

        const locationsArr: Location[] = [];
        locationsArr.push(fromLocation.data),
          locationsArr.push(toLocation.data);
        setLocations(locationsArr);

        const bookingPayload: BookingPayload = {
          bookedBy: user?.id,
          tripId: id as string,
          seats: parseInt(seats as string),
          bookingFrom: fromLocation.data._id,
          bookingTo: toLocation.data._id,
        };

        setBookingPayload(bookingPayload);
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLocationLoading(false);
      }
    };
    getSingleTrip();
    getLocations();
  }, [id]);

  const submitBooking = async () => {
    try {
      setBookingLoading(true);

      const response = await createBooking(
        bookingPayload?.bookedBy as string,
        bookingPayload?.tripId as string,
        bookingPayload?.seats as number,
        bookingPayload?.bookingFrom as string,
        bookingPayload?.bookingTo as string
      );
      if (response) {
        toast({
          title: "Success!",
          description: "Your booking was successful.",
        });
        setBookingStatus(true);
        setTimeout(() => {
          navigate("/client/search");
        }, 2000);
      } else {
        setBookingStatus(false);
      }
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="mt-24 flex flex-col p-1 space-y-5 md:items-center md:justify-center">
      <div className="w-[70%] mx-auto space-y-2 md:w-[40%]">
        <a href="/client/search">
          <Button variant="link" className="flex items-center text-sm gap-x-1">
            <Undo size={18} />
            Go back
          </Button>
        </a>
        {trip ? (
          <Card className="w-full py-3 px-3 ">
            <CardHeader className="flex flex-row justify-between">
              <div className="space-y-2">
                <CardTitle>Confirm Booking</CardTitle>
                <CardDescription>
                  Please review below details and confirm your booking.
                </CardDescription>
              </div>
              <div>
                <Button variant="outline" disabled>
                  <p>{formatTime(timeLeft)}</p>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 border-b py-2">
                <b>Trip Booked by:</b>
                <p>{user?.email}</p>
              </div>
              <div className="grid grid-cols-2 border-b py-2">
                <b>Booking from:</b>
                <p>{locations[0].displayName}</p>
              </div>
              <div className="grid grid-cols-2 border-b py-2">
                <b>Booking to:</b>
                <p>{locations[1].displayName}</p>
              </div>
              <div className="grid grid-cols-2">
                <b>Number of seats:</b>
                <p>{bookingPayload?.seats}</p>
              </div>
              <div className="flex items-center justify-end">
                <Button onClick={submitBooking} disabled={bookingLoading}>
                  {bookingLoading ? "Confirming..." : "Confirm Booking"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full py-3 px-3">
            <CardHeader className="flex flex-row items-center justify-start space-x-4">
              <div>
                <CircleAlert size={30} className="text-primary" />
              </div>
              <div className="space-y-2">
                <CardTitle>Opps!</CardTitle>
                <CardDescription>
                  Seems an error from our side or the trip is not available.
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Ride;

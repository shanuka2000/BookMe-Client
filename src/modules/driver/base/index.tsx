import {
  retriveTripByDriverId,
  Trip,
  updateTripStatus,
} from "@/api/api-services/trip-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DriverWelcome = () => {
  const [loading, setLoading] = useState(false);
  const [patchLoading, setPatchLoading] = useState(false);
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [trips, setTrips] = useState<Trip[] | []>([]);
  const [action, setAction] = useState<
    "not_started" | "on_going" | "completed" | ""
  >("");
  const [actionId, setActionId] = useState<string | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    const updatedTripStatus = async () => {
      try {
        setPatchLoading(true);
        if (action === "not_started") {
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
          const response = await updateTripStatus(actionId, "on_going");
          if (response) {
            navigate(`/driver/trip?tripId=${actionId}`);
          }
        } else if (action === "on_going" || action === "completed") {
          navigate(`/driver/trip?tripId=${actionId}`);
        } else {
          return;
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
        localStorage.setItem("isAuthenticated", "false");
      } finally {
        setPatchLoading(false);
      }
    };
    updatedTripStatus();
  }, [action]);

  useEffect(() => {
    const getTrips = async () => {
      try {
        setLoading(true);
        const id = user.id;
        if (!id) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Please refresh the page and try again!",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const response = await retriveTripByDriverId(id);
        if (response) {
          setTrips(response.data);
        } else {
          setTrips([]);
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
    getTrips();
  }, []);
  return (
    <div className="mt-24 flex flex-col p-1 space-y-5 items-center justify-center">
      <Card className="w-[90%] md:w-[40%] px-3">
        <CardHeader>
          <CardTitle className="text-2xl">Your trips</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <LoaderCircle className="animate-spin text-md" />
            </div>
          ) : (
            <>
              <ScrollArea className="w-full h-[400px]">
                <div className="space-y-4 mx-3">
                  {trips.map((item, index) => (
                    <Card
                      className="p-3 flex items-center justify-between"
                      key={index}
                    >
                      <CardHeader>
                        <CardTitle>Trip id: {item._id}</CardTitle>
                        <CardDescription>
                          Trip from {item.startLocation.displayName} to{" "}
                          {item.endLocation.displayName}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {item.status === "not_started" && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setAction("not_started");
                              setActionId(item._id);
                            }}
                          >
                            {patchLoading && item._id === actionId ? (
                              <>
                                <LoaderCircle className="animate-spin text-xl" />
                              </>
                            ) : (
                              <>Start trip</>
                            )}
                          </Button>
                        )}
                        {item.status === "on_going" && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setAction("on_going");
                              setActionId(item._id);
                            }}
                          >
                            Update progress
                          </Button>
                        )}
                        {item.status === "completed" && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              setAction("completed");
                              setActionId(item._id);
                            }}
                          >
                            View
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverWelcome;

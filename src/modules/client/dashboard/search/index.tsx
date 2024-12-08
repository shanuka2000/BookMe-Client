import {
  Location,
  retriveAllLocations,
} from "@/api/api-services/location-service";
import { retriveFilteredTrips, Trip } from "@/api/api-services/trip-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronRight,
  CircleAlert,
  Cookie,
  Plug,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SearchFormValues {
  from: string;
  to: string;
  depature: Date | null;
  noPassengers: number;
}

type FiltersFormValues = {
  filters: string;
};

const Search: React.FC = () => {
  const form = useForm<SearchFormValues>({
    defaultValues: {
      from: "",
      to: "",
      depature: null,
      noPassengers: 1,
    },
  });
  const filtersForm = useForm<FiltersFormValues>({
    defaultValues: {
      filters: "",
    },
  });

  const [, setIsLocationLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const { toast } = useToast();
  const [seats, setSeats] = useState(0);
  const [bookingFrom, setBookingFrom] = useState("");
  const [bookingTo, setBookingFTo] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SearchFormValues) => {
    try {
      setLoading(true);
      if (data.from === data.to) {
        toast({
          title: "Validation error.",
          description: "From location and To location cannot be the same.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setSeats(data.noPassengers);
      setBookingFrom(data.from);
      setBookingFTo(data.to);

      if (!data.depature) {
        return;
      }

      const response = await retriveFilteredTrips(
        "filtered",
        data.from,
        data.to,
        data.depature,
        data.noPassengers
      );
      if (response.data && response.data.length > 0) {
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

  const handleFilterChange = (newFilterValue: string) => {
    console.log("Filter changed to:", newFilterValue);
  };

  const filters = [
    { label: "Sort Ascending", value: "asc" },
    { label: "Sort Descending", value: "desc" },
  ] as const;

  useEffect(() => {
    const getLocations = async () => {
      setIsLocationLoading(true);

      try {
        const response = await retriveAllLocations();
        if (response.data && response.data.length > 0) {
          setLocations(response.data);
        } else {
          setLocations([]);
        }
      } catch (error: any) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLocationLoading(false);
      }
    };

    getLocations();
  }, []);

  return (
    <div className="mt-24 flex flex-col p-1 space-y-5 md:items-center md:justify-center">
      <Card className="w-full py-3 max-md:border-none md:w-[80%]">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start w-full max-md:space-y-3 md:flex-row md:items-center md:justify-center md:space-x-5"
            >
              <div className="flex flex-col w-full max-md:space-y-3 md:flex-row md:items-center md:space-x-2">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel>From</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "md:w-[240px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? locations.find(
                                    (location) => location._id === field.value
                                  )?.displayName
                                : "Colombo"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="md:w-[240px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search location..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No location found.</CommandEmpty>
                              <CommandGroup>
                                {locations.map((location) => (
                                  <CommandItem
                                    value={location.displayName}
                                    key={location._id}
                                    onSelect={() => {
                                      form.setValue("from", location._id);
                                    }}
                                  >
                                    {location.displayName}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        location._id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mt-2">
                      <FormLabel>To</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "md:w-[240px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? locations.find(
                                    (location) => location._id === field.value
                                  )?.displayName
                                : "Kandy"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="md:w-[240px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search location..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No location found.</CommandEmpty>
                              <CommandGroup>
                                {locations.map((location) => (
                                  <CommandItem
                                    value={location.displayName}
                                    key={location._id}
                                    onSelect={() => {
                                      form.setValue("to", location._id);
                                    }}
                                    className=""
                                  >
                                    {location.displayName}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        location._id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex mt-2 w-full">
                <FormField
                  control={form.control}
                  name="depature"
                  render={({ field }) => (
                    <FormItem className="flex flex-col max-md:w-full">
                      <FormLabel>Depature</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "md:w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "yyyy-MM-dd")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(format(date, "yyyy-MM-dd"));
                              }
                            }}
                            // disabled={(date) => date <= new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="noPassengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passengers</FormLabel>
                      <FormControl>
                        <Input
                          className="md:w-[240px]"
                          type="number"
                          placeholder="Passengers"
                          {...field}
                          min={1}
                          max={10}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex mt-2">
                <FormItem className="flex flex-col">
                  <FormLabel className="opacity-0">Passengers</FormLabel>
                  <Button type="submit" className="w-[150px]">
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </FormItem>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="w-full p-1 md:w-[80%]">
        <div className="py-2 flex items-center justify-between">
          <p>
            {loading ? (
              "Loading..."
            ) : (
              <>{trips.length > 0 ? trips.length : "No"} results found</>
            )}
          </p>
          <Form {...filtersForm}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={filtersForm.control}
                name="filters"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-fit justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SlidersHorizontal className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>No filter found.</CommandEmpty>
                            <CommandGroup>
                              {filters.map((filter) => (
                                <CommandItem
                                  value={filter.label}
                                  key={filter.value}
                                  onSelect={() => {
                                    filtersForm.setValue(
                                      "filters",
                                      filter.value
                                    );
                                    handleFilterChange(filter.value);
                                  }}
                                >
                                  {filter.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      filter.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div>
          {loading ? (
            <>
              <Card className="p-4">
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <React.Fragment key={index}>
                      <div className="py-5 first:pt-2 last:pb-2 border-b last:border-none space-y-2">
                        <div>
                          <Skeleton className="h-5 w-20 rounded-full bg-gray-300/10" />
                        </div>
                        <div className="w-full flex flex-row">
                          <div className="flex-1 flex items-center justify-between space-x-3">
                            <Skeleton className="h-5 w-20 md:h-8 md:w-[250px] bg-gray-300/10" />
                            <hr className="h-[0.5px] bg-gray-300/10 w-full" />
                            <Skeleton className="h-5 w-20 md:h-8 md:w-[250px] bg-gray-300/10" />
                            <hr className="h-[0.5px] bg-gray-300/10 w-full" />
                            <Skeleton className="h-5 w-20 md:h-8 md:w-[250px] bg-gray-300/10" />
                          </div>
                          <div className="w-[30%] flex items-center justify-end">
                            <Skeleton className="h-8 w-24 bg-gray-300/10" />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Skeleton className="w-5 h-5 bg-gray-300/10" />
                          <Skeleton className="w-5 h-5 bg-gray-300/10" />
                          <Skeleton className="w-5 h-5 bg-gray-300/10" />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
              </Card>
            </>
          ) : (
            <>
              {trips && trips.length > 0 ? (
                <>
                  <Card className="p-4">
                    {trips.map((item, index) => (
                      <React.Fragment key={index}>
                        <div
                          className={`py-5 first:pt-2 last:pb-2 border-b last:border-none space-y-2`}
                        >
                          <div className="flex items-center gap-x-1">
                            <Badge>#{item._id}</Badge>
                            <Badge>Direct</Badge>
                            <Badge>{item.busId.busNumber}</Badge>
                          </div>
                          <div className="w-full flex flex-row">
                            <div className="flex-1 flex items-center justify-between space-x-3">
                              <div>
                                <p className="flex flex-col items-start">
                                  <span>{item.startTime}</span>
                                  <span>{item.startLocation.displayName}</span>
                                </p>
                              </div>
                              {/* <div className="bg-red">
                              <hr className="h-[0.5px] bg-gray-300/10 w-full" />
                              </div> */}
                              <div>
                                <p className="space-x-1 text-gray-400">
                                  <span>{item.duration}</span>
                                </p>
                              </div>
                              {/* <div>
                                <hr className="h-[0.5px] bg-gray-300/10 w-full" />
                              </div> */}
                              <div>
                                <p className="flex flex-col items-start">
                                  <span>{item.endTime}</span>
                                  <span>{item.endLocation.displayName}</span>
                                </p>
                              </div>
                            </div>
                            <div className="w-[30%] flex items-center justify-end">
                              <a
                                href={`/client/ride/${item._id}?seats=${seats}&from=${bookingFrom}&to=${bookingTo}`}
                              >
                                <Button
                                  type="button"
                                  className="hidden md:block w-[150px]"
                                >
                                  <span>Rs {""}</span>
                                  <span>{item.fullTripSeatPrice}</span>
                                </Button>
                              </a>
                              <a
                                href={`/client/ride/${item._id}?seats=${seats}&from=${bookingFrom}&to=${bookingTo}`}
                              >
                                <Button
                                  type="button"
                                  className="md:hidden rounded-full h-12 w-12"
                                >
                                  <ChevronRight size={25} />
                                </Button>
                              </a>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <HoverCard>
                              <HoverCardTrigger className="flex">
                                <Wifi size={20} />
                                <Plug size={20} />
                                <Cookie size={20} />
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1">
                                    <Wifi size={15} />
                                    <span className="text-sm">Free Wifi</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Plug size={15} />
                                    <span className="text-sm">Outlets</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Cookie size={15} />
                                    <span className="text-sm">
                                      Snaks & beverages
                                    </span>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </Card>
                </>
              ) : (
                <>
                  <Card className="p-1">
                    <CardHeader className="flex items-center justify-start gap-x-3 flex-row">
                      <CircleAlert size={30} className="text-primary" />
                      <div className="space-y-2">
                        <CardTitle>Sorry, no rides were found</CardTitle>
                        <CardDescription>
                          Could be a error from our end or you have no rides on
                          the setting you picked.
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

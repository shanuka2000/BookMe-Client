import {
  Location,
  retriveAllLocations,
} from "@/api/api-services/location-service";
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
import { Input } from "@/components/ui/input";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Popover } from "@radix-ui/react-popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  MapPinCheck,
  ShieldCheck,
  Ticket,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SearchFormValues {
  from: string;
  to: string;
  depature: Date | null;
  noPassengers: number;
}

const Welcome = () => {
  const [, setIsLocationLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();
  const form = useForm<SearchFormValues>({
    defaultValues: {
      from: "",
      to: "",
      depature: null,
      noPassengers: 1,
    },
  });

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

  const onSubmit = async (data: SearchFormValues) => {
    navigate(
      `/client/search?from=${data.from}&to=${data.to}&depature=${data.depature}&noPassengers=${data.noPassengers}`
    );
  };

  return (
    <div className="mt-24">
      <section className="space-y-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center md:text-6xl font-medium">
          Ride Easy: Book Your Bus Tickets Hassle-Free!
        </h1>
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
                      Search
                    </Button>
                  </FormItem>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
      <div className="bg-gray-200 mx-auto my-14 h-16 w-1 rounded-full hidden sm:block dark:bg-opacity-20"></div>
      <section className="flex flex-col gap-y-5 items-center justify-center pb-5 px-2">
        <h2 className="text-3xl md:text-5xl">Why choose BookME</h2>
        <h3 className="text-sm md:text-base">
          Effortless, Secure, and Convenient Travel Planning at Your Fingertips
          Discover the features that make booking your next bus journey simple
          and stress-free.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full px-4 gap-x-10 gap-y-10">
          <Card className="flex-1 h-[300px] flex items-center justify-start flex-col p-5">
            <Ticket className="w-20 h-20" />
            <CardHeader className="flex-1 h-full flex items-center justify-center flex-col text-center">
              <CardTitle>Book Your Bus Tickets in Just a Few Clicks</CardTitle>
              <CardDescription>
                Easily search routes, select your preferred seat, and complete
                your booking from the comfort of your home, 24/7.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-1 h-[300px] flex items-center justify-start flex-col p-5">
            <MapPinCheck className="w-20 h-20" />
            <CardHeader className="flex-1 h-full flex items-center justify-center flex-col text-center">
              <CardTitle>Track Your Bus in Real-Time</CardTitle>
              <CardDescription>
                Get live updates on bus locations and estimated arrival times to
                ensure you never miss your ride.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-1 h-[300px] flex items-center justify-start flex-col p-5">
            <ShieldCheck className="w-20 h-20" />
            <CardHeader className="flex-1 h-full flex items-center justify-center flex-col text-center">
              <CardTitle>Secure and Flexible Payment Methods</CardTitle>
              <CardDescription>
                Choose from various payment options—credit/debit cards, wallets,
                or UPI—to complete your booking securely.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex-1 h-[300px] flex items-center justify-start flex-col p-5">
            <Zap className="w-20 h-20" />
            <CardHeader className="flex-1 h-full flex items-center justify-center flex-col text-center">
              <CardTitle>Receive Your Ticket Instantly</CardTitle>
              <CardDescription>
                No more waiting in line! Get your e-ticket delivered directly to
                your email or mobile app right after booking.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Welcome;

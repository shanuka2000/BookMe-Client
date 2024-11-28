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
import { HoverCardContent } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
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
import React from "react";
import { useForm } from "react-hook-form";

const Search = () => {
  const form = useForm();
  const filters = useForm();
  const loading = false;

  const onSubmit = () => {};

  const languages = [
    { label: "Sort Accending", value: "asc" },
    { label: "Sort Decending", value: "desc" },
  ] as const;

  const data = [
    {
      rideId: "001100",
      busOrg: "Private",
      busNumber: "17",
      rideFrom: "Colombo",
      rideTo: "Kandy",
      rideTotalHours: 5,
      rideStartTime: "08:00",
      rideEndTime: "13:00",
      rideType: "direct",
      rideTimeIn: "hrs",
      rideTotalPrice: 2500,
      ridePriceIn: "Rs",
    },
  ] as const;

  return (
    <div className="mt-24 flex flex-col p-1 space-y-5 md:items-center md:justify-center">
      <Card className="w-full py-3 max-md:border-none md:w-[80%]">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start w-full max-md:space-y-3 md:flex-row md:items-center md:justify-center md:space-x-5 "
            >
              <div className="flex flex-col w-full max-md:space-y-3 md:flex-row md:items-center md:space-x-2">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input
                          className="md:w-[240px]"
                          type="text"
                          placeholder="Colombo"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input
                          className="md:w-[240px]"
                          type="text"
                          placeholder="Kandy"
                          {...field}
                        />
                      </FormControl>
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
                                format(field.value, "PPP")
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
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  <a href="/client/search">
                    <Button type="button" className="w-[150px]">
                      Search
                    </Button>
                  </a>
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
              <>{data.length > 0 ? data.length : "No"} results found</>
            )}
          </p>
          <Form {...filters}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="language"
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
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue("language", language.value);
                                  }}
                                >
                                  {language.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      language.value === field.value
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
              {data && data.length > 0 ? (
                <>
                  <Card className="p-4">
                    {data.map((item, index) => (
                      <React.Fragment key={index}>
                        <div
                          className={`py-5 first:pt-2 last:pb-2 border-b last:border-none space-y-2`}
                        >
                          <div className="flex items-center gap-x-1">
                            <Badge>#{item.rideId}</Badge>
                            <Badge>{item.busOrg}</Badge>
                            <Badge>
                              {String(item.rideType).charAt(0).toUpperCase() +
                                String(item.rideType).slice(1)}
                            </Badge>
                            <Badge>{item.busNumber}</Badge>
                          </div>
                          <div className="w-full flex flex-row">
                            <div className="flex-1 flex items-center justify-between space-x-3">
                              <div>
                                <p className="flex flex-col items-start">
                                  <span>{item.rideStartTime}</span>
                                  <span>{item.rideFrom}</span>
                                </p>
                              </div>
                              <hr className="h-[0.5px] bg-gray-300/10 w-full" />
                              <div>
                                <p className="space-x-1 text-gray-400">
                                  <span>{item.rideTotalHours}</span>
                                  <span>{item.rideTimeIn}</span>
                                </p>
                              </div>
                              <hr className="h-[0.5px] bg-gray-300/10 w-full" />
                              <div>
                                <p className="flex flex-col items-start">
                                  <span>{item.rideEndTime}</span>
                                  <span>{item.rideTo}</span>
                                </p>
                              </div>
                            </div>
                            <div className="w-[30%] flex items-center justify-end">
                              <a href="/client/ride">
                                <Button
                                  type="button"
                                  className="hidden md:block w-[150px]"
                                >
                                  <span>{item.ridePriceIn}</span>
                                  <span>{item.rideTotalPrice}</span>
                                </Button>
                              </a>
                              <a href="/client/ride">
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

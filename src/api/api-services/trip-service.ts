import axiosInstance from "../axios-instance";
import { Bus } from "./bus-service";
import { Location } from "./location-service";
import { TripStops } from "./trip-stops-service";

export type Driver = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Trip = {
  _id: string;
  startLocation: Location;
  endLocation: Location;
  satrtDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  distance: string;
  duration: string;
  stops: TripStops[];
  busId: Bus;
  driver: Driver;
  status: "not_started" | "on_going" | "completed";
  tripCreationStatus: "0" | "1" | "2" | "3";
  createdAt: Date;
  updatedAt: Date;
  fullTripSeatPrice: number;
};

interface AllTripResponse {
  message: string;
  data: Trip[];
}

interface SingleTripResponse {
  message: string;
  data: Trip;
}

interface PatchStatsResponse {
  message: string;
}

const basePath = "/trip";

export const retriveFilteredTrips = async (
  requestType: "filtered" | "all",
  from?: string,
  to?: string,
  depature?: Date,
  noPassengers?: number
): Promise<AllTripResponse> => {
  try {
    if (requestType === "all") {
      const response = await axiosInstance.get<AllTripResponse>(`${basePath}`);
      return response.data;
    } else {
      const response = await axiosInstance.get<AllTripResponse>(`${basePath}`, {
        params: {
          startLocation: from,
          endLocation: to,
          startDate: depature,
          seats: noPassengers,
        },
      });
      return response.data;
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to retrive Trips."
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const retriveSingleTrip = async (
  id: string
): Promise<SingleTripResponse> => {
  try {
    const response = await axiosInstance.get<SingleTripResponse>(
      `${basePath}/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to retrive Trip.");
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const retriveTripByDriverId = async (
  id: string
): Promise<AllTripResponse> => {
  try {
    const response = await axiosInstance.get<AllTripResponse>(
      `${basePath}/byDriver/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to retrive trips for driver."
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const updateTripStatus = async (
  id: string,
  status: "not_started" | "on_going" | "completed"
): Promise<PatchStatsResponse> => {
  try {
    const response = await axiosInstance.patch<PatchStatsResponse>(
      `${basePath}/status/${id}`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to update trip status."
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

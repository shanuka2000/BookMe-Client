import axiosInstance from "../axios-instance";
import { Location } from "./location-service";

export type TripStops = {
  _id: string;
  stopId: number;
  isArrived: boolean;
  tripId: string;
  stopLocation: Location;
  createdAt: Date;
  updatedAt: Date;
};

interface TripStopPatchSatusRespons {
  message: string;
}

const basePath = "/trip-stops";

export const patchTripStopStatus = async (
  id: string,
  tripId: string,
  isArrived: boolean
): Promise<TripStopPatchSatusRespons> => {
  try {
    const response = await axiosInstance.patch<TripStopPatchSatusRespons>(
      `${basePath}/status/${id}`,
      { tripId, isArrived }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to update trip stop."
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

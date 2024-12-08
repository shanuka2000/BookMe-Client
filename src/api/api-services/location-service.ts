import axiosInstance from "../axios-instance";

export type Location = {
  _id: string;
  displayName: string;
  slug: string;
  locationUrl: string;
  locationLongitude: number;
  locationLatitude: number;
  locationPlaceId: string;
  registeredBy: string[];
  createdAt: Date;
  updatedAt: Date;
};

interface AllLocationsResponse {
  message: string;
  data: Location[];
}

interface SingleLocationsResponse {
  message: string;
  data: Location;
}

const basePath = "/location";

export const retriveAllLocations = async (): Promise<AllLocationsResponse> => {
  try {
    const response = await axiosInstance.get<AllLocationsResponse>(
      `${basePath}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to retrive locations"
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const retriveSingleLocations = async (
  id: string
): Promise<SingleLocationsResponse> => {
  try {
    const response = await axiosInstance.get<SingleLocationsResponse>(
      `${basePath}/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to retrive location"
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

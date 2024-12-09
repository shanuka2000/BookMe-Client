import axiosInstance from "../axios-instance";
import { User } from "./authentication-service";
import { Location } from "./location-service";

export type Booking = {
  bookedBy: User;
  bookingPrice: number;
  tripId: string;
  seats: number;
  bookingFrom: Location;
  bookingTo: Location;
  bookingStatus:
    | "reserved"
    | "confirmed"
    | "cancelled"
    | "abandoned"
    | "completed";
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

interface BookingResponse {
  message: string;
  data: {
    bookedBy: string;
    bookingPrice: number;
    tripId: string;
    seats: number;
    bookingFrom: Location;
    bookingTo: Location;
    bookingStatus: "reserved" | "confirmed" | "cancelled" | "abandoned";
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

interface AllBookingResponse {
  message: string;
  data: Booking[];
}

const basePath = "/booking";

export const createBooking = async (
  bookedBy: string,
  tripId: string,
  seats: number,
  bookingFrom: string,
  bookingTo: string
) => {
  try {
    const response = await axiosInstance.post<BookingResponse>(`${basePath}`, {
      bookedBy,
      tripId,
      seats,
      bookingFrom,
      bookingTo,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Booking creation failed."
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getBookings = async (id: string): Promise<AllBookingResponse> => {
  try {
    const response = await axiosInstance.get<AllBookingResponse>(
      `${basePath}/${id}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Failed to retrive bookings."
      );
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

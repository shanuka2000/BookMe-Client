import axiosInstance from "../axios-instance";

interface BookingResponse {
  message: string;
  data: {
    bookedBy: string;
    bookingPrice: number;
    tripId: string;
    seats: number;
    bookingFrom: string;
    bookingTo: string;
    bookingStatus: "reserved" | "confirmed" | "cancelled" | "abandoned";
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  };
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

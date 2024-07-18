import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AddressLink from "../AddressLink";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import { format } from "date-fns";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div>
      <div className="my-8">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <AddressLink children={booking.place.address}></AddressLink>
        <div className="bg-gray-200 rounded-3xl p-4 mb-4">
          <h2 className="text-xl">Your booking information: </h2>
          <div className="flex gap-1">
            <div className="flex gap-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {format(new Date(booking.checkIn), "dd-MM-yyyy")}
            </div>
            to
            <div className="flex gap-1 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              {format(new Date(booking.checkOut), "dd-MM-yyyy")}
            </div>
          </div>
          <div>Total Price: ${booking.price}</div>
        </div>
        <PlaceGallery place={booking.place}></PlaceGallery>
      </div>
    </div>
  );
}

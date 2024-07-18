import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfNights = 0;

  async function bookThisPlace() {
    const response = await axios.post("/bookings", { checkIn, checkOut, guests, phone, email, name, price: numberOfNights * place.price, place: place._id });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl">
        <div className="text-2xl text-center">Price: ${place.price} per night</div>
        <div className="flex">
          <div className="py-3 px-2">
            <label>Check in: </label>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div className="py-3 px-2">
            <label>Check out: </label>
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
        </div>
        <div className="flex">
          <div className="py-3 px-2">
            <label>Number of guests </label>
            <input type="number" value={guests} onChange={e => setGuests(e.target.value)} />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div>
            <div>
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div>
              <label>Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07836742622" />
            </div>
            <div>
              <label>Email</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="john.doe@email.com" />
            </div>
          </div>
        )}

        <button onClick={bookThisPlace} className="mt-2 primary">
          Book this place
        </button>

        {numberOfNights > 0 && <span>The total price for this booking is ${numberOfNights * place.price}</span>}
      </div>
    </div>
  );
}

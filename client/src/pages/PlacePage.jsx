import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then(response => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place}></PlaceGallery>

      <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div>
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <b>Check in: </b>
          {place.checkIn} <br />
          <b>Chec out: </b>
          {place.checkOut}
          <br />
          <b>Max guests: </b>
          {place.maxGuests}
          <br />
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="bg-white mt-2 -mx-8 px-8 py-8 border-t">
        <div className="mt-4 text-sm text-gray-800 leading-5">
          <h2 className="font-semibold text-2xl">Extra Info: </h2>
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}

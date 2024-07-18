import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      console.log(data);
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        <div className="text-center mt-5">
          <Link to={"/account/places/new"} className="inline-flex bg-primary rounded-full text-white py-2  px-6 text-white gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" className="" />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 &&
            places.map(place => (
              <Link to={place._id} className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-xl">
                <div className="flex w-40 h-40 bg-gray-300 shrink-0">
                  <PlaceImg place={place}></PlaceImg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{place.title}</h2>
                  <p className="text-sm">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map(place => (
          <Link to={"places/" + place._id} className="bg-gray-200 rounded-2xl mb-2">
            {place.photos?.[0] && <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/" + place.photos?.[0]}></img>}
            <div className="p-2">
              <h3 className="font-bold">{place.address}</h3>
              <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
              <span className="font-bold">${place.price} per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}

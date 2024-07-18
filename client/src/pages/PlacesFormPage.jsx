import PhotosUploader from "../PhotosUploader";
import Perks from "../components/Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("places/" + id).then(response => {
      console.log(response);
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckin(data.checkIn);
      setCheckout(data.checkOut);
      setGuests(data.maxGuests);
      setAddedPhotos(data.photos);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = { title, address, addedPhotos, description, perks, checkin, checkout, guests, price, extraInfo };
    if (id) {
      //update
      console.log({ id, ...placeData });
      await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"}></Navigate>;
  }
  return (
    <div>
      <AccountNav></AccountNav>
      <form onSubmit={savePlace}>
        {preInput("Title", "Provide a catchy title for your place")}
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title  For example: Cozy apartment" />
        {preInput("Address", "Address to this place ")}
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
        {preInput("Photos", "more = better ")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Add captivating description for your listing")}
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full h-50 border rounded-md resize-none" id=""></textarea>
        {preInput("Perks", "Check the boxes that apply")}
        <Perks selected={perks} onChange={setPerks}></Perks>

        {preInput("Check-in, Check-out, number of guests", "Provide extra info for your listing. House rule etc.,")}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="mt-2 mb-1">
            <h3>Check-in time</h3>
            <input type="text" placeholder="14:00" value={checkin} onChange={e => setCheckin(e.target.value)} />
          </div>
          <div className="mt-2 mb-1">
            <h3>Check-out time</h3>
            <input type="text" placeholder="23:00" value={checkout} onChange={e => setCheckout(e.target.value)} />
          </div>
          <div className="mt-2 mb-1">
            <h3>Number of guests</h3>
            <input type="number" value={guests} onChange={e => setGuests(e.target.value)} />
          </div>
          <div className="mt-2 mb-1">
            <h3>Price per night</h3>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
        </div>

        {preInput("Extra info", "Provide extra info for your listing. House rule etc.,")}
        <textarea className="w-full h-50 border rounded-md resize-none" value={extraInfo} onChange={e => setExtraInfo(e.target.value)}></textarea>
        <button className="primary">Submit</button>
      </form>
    </div>
  );
}

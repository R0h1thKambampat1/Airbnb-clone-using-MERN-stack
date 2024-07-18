import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage.jsx";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    console.log(user);
    return <Navigate to={"/login"} />;
  }

  async function Logout() {
    await axios.post("./logout");
    setRedirect("/");
    setUser(null);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav></AccountNav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={Logout}>
            Log Out
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

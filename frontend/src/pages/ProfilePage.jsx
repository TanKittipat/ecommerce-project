import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="hero bg-base-200 h-[61.5vh]">
      <div className="hero-content flex-col lg:flex-row">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            className="max-w-sm rounded-lg object-cover h-64 shadow-2xl"
          />
        ) : (
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
        )}

        <div>
          <h1 className="text-5xl font-bold">{user?.displayName}</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <a href="/settings" className="btn bg-red text-white">
            Edit profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

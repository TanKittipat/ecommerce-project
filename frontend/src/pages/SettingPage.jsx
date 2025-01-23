import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SettingPage = () => {
  const { updateUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    updateUser(data.displayName, data.photoURL)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Update profile",
          text: "update your profile successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setValue("displayName", "");
        setValue("photoURL", "");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-[61.5vh] flex items-center justify-center bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="card w-full max-w-md shadow-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="card-title">Update your profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              defaultValue={user?.displayName}
              {...register("displayName", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile picture</span>
            </label>
            <input
              type="text"
              placeholder="profile picture url"
              className="input input-bordered"
              defaultValue={user?.photoURL}
              {...register("photoURL", { required: true })}
            />
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-red text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingPage;
